import {Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import axios from "axios";

const schema = yup.object().shape({
    name: yup.string().required('Description is required'),
    picture: yup.string().url('Picture must be a valid URL').required('Picture URL is required'),
});

export default function AddTask() {
    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema), // Utilisez yupResolver avec le schéma de validation
    });

    const navigate = useNavigate();

    const onSubmit = (data) => {

        let newTask = {
            'name': data.name,
            'img': data.picture,
            'completed': false
        };

        axios.post('http://localhost:4000/tasks', newTask)
            .then(response => navigate('/'))

    }

    return (<>

        <Container sx={{py: 4}}>

            <Typography align="center" component="h1" variant="h5">Add Task</Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    id="txtName"
                                    label="Description"
                                    type="text"
                                    required
                                    fullWidth
                                    autoFocus
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="picture"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    id="txtPicture"
                                    placeholder="https://www.website.image.com/picture.jpg"
                                    label="Picture URL"
                                    type="text"
                                    required
                                    fullWidth
                                    autoFocus
                                    error={!!errors.picture}
                                    helperText={errors.picture?.message}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}>Add</Button>
            </Box>

        </Container>

    </>)
        ;
}
