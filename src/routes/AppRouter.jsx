import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CVs from "../pages/CVs";
import Editor from "../pages/Editor";
import Preview from "../pages/Preview";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import Login from "../pages/Login";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cvs" element={<CVs />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default AppRouter;