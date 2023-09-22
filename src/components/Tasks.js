import {useEffect, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import {
    Alert,
    Box,
    Card,
    CardContent,
    CardMedia,
    Checkbox,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Snackbar,
    Typography
} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Tasks() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:4000/tasks')
            .then(response => response.data)
            .then(tasks => {
                setTasks(tasks);
                setLoading(false);
            })
    }, []);


    function deleteTask(taskId) {
        axios.delete(`http://localhost:4000/tasks/${taskId}`)
            .then(response => {
                setTasks(tasks.filter(t => t.id !== taskId));
                setOpenSnackbar(true);
            })
            .catch(err => console.log(err));
    }

    function toggleCompleted(taskId) {
        let updatedTask = tasks.find(t => t.id === taskId);
        updatedTask.completed = !updatedTask.completed;

        axios.put(`http://localhost:4000/tasks/${taskId}`, updatedTask)
            .then(response => {
                setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));

            })
            .catch(err => console.log(err));
    }

    function editTask(id) {
        navigate(`/tasks/edit/${id}`)
    }

    return (
        <>
            <Container sx={{py: 4}}>

                <Typography align="center" component="h1" variant="h5">Tasks</Typography>

                {loading ? (
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh'}}>
                        <CircularProgress/>
                        <LinearProgress color="primary"/>
                    </Box>
                ) : (
                    <Grid container spacing={6} sx={{mt: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                        {tasks.map((task) => (
                            <Grid item key={task.id} xs={12} sm={6} md={3} lg={4}>

                                <Card sx={{display: 'flex'}}>
                                    <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                                        <CardContent sx={{flex: '1 0 auto'}}>
                                            <Checkbox
                                                checked={task.completed}
                                                onChange={() => toggleCompleted(task.id)}
                                                icon={<CheckCircleOutlineRoundedIcon sx={{height: 30, width: 30}}/>}
                                                checkedIcon={<CheckCircleRoundedIcon sx={{height: 30, width: 30}}
                                                                                     color="success"/>}/>
                                            <Typography component="div" variant="h5">
                                                Task {task.id}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                {task.name}
                                            </Typography>

                                        </CardContent>

                                        <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                            <IconButton aria-label="edit" onClick={() => editTask(task.id)}>
                                                <EditIcon sx={{height: 24, width: 24}} color="primary"/>
                                            </IconButton>
                                            <IconButton aria-label="next" onClick={() => deleteTask(task.id)}>
                                                <DeleteIcon sx={{height: 24, width: 24}} color="error"/>
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <CardMedia
                                        component="img"
                                        sx={{width: 151}}
                                        image={task.img}
                                        alt=""
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>)}

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    onClose={() => setOpenSnackbar(false)} // Gère la fermeture de la popup
                >
                    <Alert
                        onClose={() => setOpenSnackbar(false)}
                        severity="success"
                        sx={{width: '100%'}}
                    >
                        Élément supprimé avec succès
                    </Alert>
                </Snackbar>

            </Container>
        </>
    );
}
