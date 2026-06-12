import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CVs from "../pages/CVs";
import Editor from "../pages/Editor";
import Preview from "../pages/Preview";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import Login from "../pages/Login";
import ProtectedRoute from "../routes/ProtectedRoute";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cvs" element={<CVs />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route path="/editor" element={
                    <ProtectedRoute>
                        <Editor />
                    </ProtectedRoute>
                }
            />

            <Route path="/preview" element={
                <ProtectedRoute>
                    <Preview />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default AppRouter;