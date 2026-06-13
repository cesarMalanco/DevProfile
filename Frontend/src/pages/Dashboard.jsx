import "../styles/DashboardStyles.css";
import Swal from "sweetalert2";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProfileStats } from "../services/dashboardService";
import { getUserCvs, updateCv, deleteCv } from "../services/cvService";
import SkillsChart from "../components/SkillsChart";
import { CVContext } from "../context/CVContext";

function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { fetchSkills, skills } = useContext(CVContext);
    const userName = user?.nombre || "guest";
    const [stats, setStats] = useState({ cvs: 0, skills: 0, projects: 0, education: 0, languages: 0 });
    const [cvs, setCvs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCvs = async () => {
        try {
            const cvsData = await getUserCvs(user.id_usuario);
            setCvs(cvsData);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchStats = async () => {
        try {
            const statsData = await getProfileStats(user.id_usuario);
            setStats(statsData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!user?.id_usuario) return;

        const fetchData = async () => {
            try {
                await Promise.all([fetchStats(), fetchCvs()]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleEditCv = async (cv) => {
        const currentName = cv.nombre_cv || `CV ${cv.id_cv}`;
        const result = await Swal.fire({
            title: "Edit CV name",
            input: "text",
            inputValue: currentName,
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
            inputPlaceholder: "Enter a new CV name"
        });

        const newName = result.value;
        if (!result.isConfirmed || !newName || newName.trim() === "") return;

        try {
            await updateCv(cv.id_cv, { nombre_cv: newName.trim() });
            await fetchCvs();
            await fetchStats();
        } catch (error) {
            console.error(error);
            await Swal.fire({
                icon: "error",
                title: "Update failed",
                text: "Error updating CV."
            });
        }
    };

    const handleDeleteCv = async (cv) => {
        const result = await Swal.fire({
            icon: "warning",
            title: "Delete CV?",
            text: `Delete CV '${cv.nombre_cv || `CV ${cv.id_cv}`}'?`,
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel"
        });

        if (!result.isConfirmed) return;

        try {
            await deleteCv(cv.id_cv);
            await fetchCvs();
            await fetchStats();
            try { fetchSkills && await fetchSkills(); } catch (e) { console.error(e); }
        } catch (error) {
            console.error(error);
            await Swal.fire({
                icon: "error",
                title: "Delete failed",
                text: "Error deleting CV."
            });
        }
    };

    return (
        <section className="dashboard-section">
            <div className="dashboard-container">

                {/* HEADER */}
                <div className="dashboard-header">
                    <div className="header-content">
                        <div className="header-title">
                            <h1>Welcome back <span className="highlight-title">{userName}!</span></h1>
                            <p>Manage your profiles and track your progress</p>
                        </div>
                    </div>
                    <div className="header-actions">
                        <button className="cta-btn-primary" onClick={() => navigate("/editor") }>
                            <i className="fa-solid fa-plus"></i>
                            Create New CV
                        </button>
                    </div>
                </div>

                {/* STATS CARDS */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon purple">
                            <i className="fa-solid fa-file-lines"></i>
                        </div>
                        <div className="stat-info">
                            <h2>{loading ? "..." : stats.cvs}</h2>
                            <p>CVs Created</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon blue">
                            <i className="fa-solid fa-code"></i>
                        </div>
                        <div className="stat-info">
                            <h2>{loading ? "..." : stats.skills}</h2>
                            <p>Skills</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon orange">
                            <i className="fa-solid fa-folder-open"></i>
                        </div>
                        <div className="stat-info">
                            <h2>{loading ? "..." : stats.projects}</h2>
                            <p>Projects</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon green">
                            <i className="fa-solid fa-graduation-cap"></i>
                        </div>
                        <div className="stat-info">
                            <h2>{loading ? "..." : stats.education}</h2>
                            <p>Education</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon teal">
                            <i className="fa-solid fa-language"></i>
                        </div>
                        <div className="stat-info">
                            <h2>{loading ? "..." : stats.languages}</h2>
                            <p>Languages</p>
                        </div>
                    </div>
                </div>

                {/* CONTENIDO PRINCIPAL */}
                <div className="dashboard-content">

                    {/* SELECTED CV*/}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <div className="card-header-left">
                                <i className="fa-solid fa-chart-pie"></i>
                                <h3>My Graph</h3>
                            </div>
                            <button className="card-link" onClick={() => navigate("/cvs")}>View all</button>
                        </div>

                        {(!loading && skills && skills.length > 0) ? (
                            <SkillsChart />
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon">
                                    <i className="fa-solid fa-user-astronaut"></i>
                                </div>
                                <h4>Select a CV</h4>
                                <p>Create your first professional profile to see your statistics</p>
                            </div>
                        )}
                    </div>

                    {/* QUICK ACTIONS */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <div className="card-header-left">
                                <i className="fa-solid fa-bolt"></i>
                                <h3>Quick Actions</h3>
                            </div>
                        </div>

                        <div className="actions-grid">
                            <button className="action-btn primary" onClick={() => navigate("/editor") }>
                                <i className="fa-solid fa-plus"></i>
                                New CV
                                <span className="btn-shortcut">⌘N</span>
                            </button>

                            <button className="action-btn secondary" onClick={() => navigate("/preview") }>
                                <i className="fa-solid fa-eye"></i>
                                Preview
                                <span className="btn-shortcut">⌘P</span>
                            </button>

                            <button className="action-btn secondary">
                                <i className="fa-solid fa-download"></i>
                                Export PDF
                                <span className="btn-shortcut">⌘E</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* SECCIÓN ADICIONAL*/}
                <div className="activity-section">
                    <div className="dashboard-card full-width">
                        <div className="card-header">
                            <div className="card-header-left">
                                <i className="fa-solid fa-chart-line"></i>
                                <h3>My CV's</h3>
                            </div>
                        </div>
                        {loading ? (
                            <div className="activity-empty">
                                <i className="fa-solid fa-spinner fa-spin"></i>
                                <p>Loading your CVs...</p>
                            </div>
                        ) : cvs.length > 0 ? (
                            <div className="cv-list">
                                {cvs.map((cv) => (
                                    <div key={cv.id_cv} className="cv-item">
                                        <div>
                                            <h4>{`${cv.nombre_cv || `CV ${cv.id_cv}`} · #${cv.id_cv}`}</h4>
                                            <p>{new Date(cv.fecha_creacion).toLocaleDateString()}</p>
                                        </div>
                                        <div className="cv-item-actions">
                                            <button
                                                type="button"
                                                className="cv-action-btn open"
                                                onClick={() => navigate(`/preview?cvId=${cv.id_cv}`)}
                                            >
                                                Open
                                            </button>
                                            <button
                                                type="button"
                                                className="cv-action-btn edit"
                                                onClick={() => navigate(`/editor?cvId=${cv.id_cv}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="cv-action-btn delete"
                                                onClick={() => handleDeleteCv(cv)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="activity-empty">
                                <i className="fa-solid fa-inbox"></i>
                                <p>You don't have cv's yet</p>
                                <span>Start creating your CV to see them here</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Dashboard;