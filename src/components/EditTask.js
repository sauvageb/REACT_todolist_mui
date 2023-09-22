import {useEffect} from "react";
import {Box, Button, Container, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    name: yup.string().required("Description is required"),
    completed: yup.boolean().required("Completed status is required"),
    img: yup.string().url("Image URL must be a valid URL"),
});

function EditTask() {
    const navigate = useNavigate();
    const {taskId} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/tasks/${taskId}`)
            .then(response => response.data)
            .then(data => {
                setValue("name", data.name);
                setValue("completed", data.completed);
                setValue("img", data.img);
            });
    }, [taskId]);

    const {control, handleSubmit, setValue, watch, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            completed: false,
            img: '',
        },
    });

    const onSubmit = (data) => {
        axios
            .put(`http://localhost:4000/tasks/${taskId}`, data)
            .then((response) => response.status)
            .then((ok) => navigate("/"));
    };

    return (<>

        <Container sx={{py: 4}}>
            <Typography align="center" component="h1" variant="h5">Add Task</Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>

                        <Controller
                            name="name"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    type="text"
                                    required
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ToggleButtonGroup
                            value={watch("completed")}
                            exclusive
                            onChange={(e, newValue) => setValue("completed", newValue)}
                            aria-label="Completed"
                            fullWidth
                        >
                            <ToggleButton value={true} aria-label="Completed">
                                Completed
                            </ToggleButton>
                            <ToggleButton value={false} aria-label="Not Completed">
                                Not Completed
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>

                    {/*<Grid item xs={12}>*/}
                    {/*    <Controller*/}
                    {/*        name="completed"*/}
                    {/*        control={control}*/}
                    {/*        render={({field}) => (*/}
                    {/*            <Checkbox*/}
                    {/*                {...field}*/}
                    {/*                color="primary"*/}
                    {/*                checked={field.value}*/}
                    {/*                onChange={(e) => field.onChange(e.target.checked)}*/}
                    {/*                onBlur={field.onBlur}*/}
                    {/*            />*/}
                    {/*        )}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    <Grid item xs={12}>
                        <Controller
                            name="img"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label="Image URL"
                                    type="text"
                                    fullWidth
                                    error={!!errors.img}
                                    helperText={errors.img?.message}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}>Edit</Button>
            </Box>
        </Container>

    </>);
}

export default EditTask;
