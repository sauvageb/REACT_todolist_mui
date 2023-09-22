import {Route, Routes} from "react-router-dom";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import NavBar from "./components/NavBar";
import EditTask from "./components/EditTask";

const App = () => {


    return (
        <>
            <NavBar/>
            <Routes>
                <Route path='/tasks/add' element={<AddTask/>}/>
                <Route path='/tasks/edit/:taskId' element={<EditTask/>}/>
                <Route path='/' element={<Tasks/>}/>
            </Routes>
        </>
    );
}

export default App;
