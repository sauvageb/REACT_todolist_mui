import {useEffect, useState} from "react";
import {Box, Button, Container, TextField} from "@mui/material";
import {CheckBox} from "@mui/icons-material";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

function EditTask() {

    const navigate = useNavigate();

    const [task, setTask] = useState({
        name: '',
        completed: false,
        img: ''
    });
    const {taskId} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/tasks/${taskId}`)
            .then(response => response.data)
            .then(data => setTask(data));
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        let newTask = task;
        axios.put(`http://localhost:4000/tasks/${taskId}`, newTask)
            .then(response => response.status)
            .then(ok => navigate('/'));
    }

    function handleChange(event) {
        console.log(`${event.target.name} = ${event.target.value}`);
        // TODO : checkbox
        setTask(prevTask => ({
            ...prevTask, [event.target.name]: event.target.value
        }));
    }

    return (<>

        <Container>
            <Box component='form' onSubmit={handleSubmit}>
                <TextField
                    name="name"
                    onChange={handleChange}
                    value={task.name}></TextField>

                <CheckBox
                    name="completed"
                    onChange={handleChange}
                    checked={task.completed}></CheckBox>

                <TextField
                    name="img"
                    onChange={handleChange}
                    value={task.img}></TextField>

                <Button type='submit'>Update</Button>

            </Box>

        </Container>


    </>);
}

export default EditTask;
