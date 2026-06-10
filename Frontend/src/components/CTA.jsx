import "../styles/CTAStyles.css";
import "../styles/globalStyles.css";

function CTA() {
    return (
        <section className="cta-section">
            <div className="cta-container">
                <div className="cta-bg-decoration">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                </div>

                <div className="cta-content">
                    
                    <h2>
                        Ready to Build Your
                        <span className="highlight"> Professional Future?</span>
                    </h2>
                    
                    <p>
                        Join thousands of professionals who have successfully landed 
                        their dream jobs with DevProfile. Start creating your standout CV today!
                    </p>

                    <div className="cta-buttons">
                        <button className="cta-btn-primary">
                            <i className="fa-solid fa-rocket"></i>
                            Get Started Free
                        </button>
                        
                        <button className="cta-btn-secondary">
                            <i className="fa-regular fa-folder-open"></i>
                            Choose a template
                        </button>
                    </div>

                    <div className="cta-trust-badges">
                        <div className="trust-item">
                            <i className="fa-solid fa-check-circle"></i>
                            <span>Free 14-day trial</span>
                        </div>
                        <div className="trust-divider"></div>
                        <div className="trust-item">
                            <i className="fa-solid fa-check-circle"></i>
                            <span>Cancel anytime</span>
                        </div>
                        <div className="trust-divider"></div>
                        <div className="trust-item">
                            <i className="fa-solid fa-check-circle"></i>
                            <span>Secure payment</span>
                        </div>
                    </div>

                    <div className="cta-users">
                        <div className="user-avatars">
                            <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="User" />
                            <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="User" />
                            <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="User" />
                            <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="User" />
                            <div className="user-count">+5k</div>
                        </div>
                        <p>
                            <strong>5,000+ professionals</strong> already using DevProfile
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTA;