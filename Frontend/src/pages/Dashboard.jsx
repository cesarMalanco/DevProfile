import "../styles/DashboardStyles.css";

function Dashboard() {
    return (
        <section className="dashboard-section">
            <div className="dashboard-container">

                {/* HEADER */}
                <div className="dashboard-header">
                    <div className="header-content">
                        <div className="header-title">
                            <h1>Welcome back <span className="highlight-title">username!</span></h1>
                            <p>Manage your profiles and track your progress</p>
                        </div>
                    </div>
                    <div className="header-actions">
                        <button className="cta-btn-primary">
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
                            <h2>0</h2>
                            <p>CVs Created</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon blue">
                            <i className="fa-solid fa-code"></i>
                        </div>
                        <div className="stat-info">
                            <h2>0</h2>
                            <p>Skills</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon orange">
                            <i className="fa-solid fa-folder-open"></i>
                        </div>
                        <div className="stat-info">
                            <h2>0</h2>
                            <p>Projects</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon green">
                            <i className="fa-solid fa-graduation-cap"></i>
                        </div>
                        <div className="stat-info">
                            <h2>0</h2>
                            <p>Education</p>
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
                            <button className="card-link">View all</button>
                        </div>

                        <div className="empty-state">
                            <div className="empty-icon">
                                <i className="fa-solid fa-user-astronaut"></i>
                            </div>
                            <h4>Select a CV</h4>
                            <p>Create your first professional profile to see your stadistics</p>
                        </div>
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
                            <button className="action-btn primary">
                                <i className="fa-solid fa-plus"></i>
                                New CV
                                <span className="btn-shortcut">⌘N</span>
                            </button>

                            <button className="action-btn secondary">
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
                        <div className="activity-empty">
                            <i className="fa-solid fa-inbox"></i>
                            <p>You don't have cv's yet</p>
                            <span>Start creating your CV to see them here</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Dashboard;