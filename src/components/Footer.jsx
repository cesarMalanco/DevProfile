import "../styles/FooterStyles.css";
import logo from "../assets/devProfile_logo.png";
import { useEffect } from 'react';

function Footer() {
    useEffect(() => {
        const handleScroll = () => {
            const scrollButton = document.querySelector('.scroll-to-top');
            if (scrollButton) {
                if (window.scrollY > 300) {
                    scrollButton.classList.add('show');
                } else {
                    scrollButton.classList.remove('show');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <footer className="footer">
            <div className="footer-bg-decoration">
                <div className="footer-blur footer-blur-1"></div>
                <div className="footer-blur footer-blur-2"></div>
            </div>

            <div className="footer-container">
                <div className="footer-info">
                    <div className="footer-logo">
                        <h2 className="footer-dev">Dev</h2>
                        <div className="logo-circle">
                            <img src={logo} alt="DevProfile Logo" />
                        </div>
                        <h2 className="footer-profile">Profile</h2>
                    </div>
                    <p>
                        Build professional resumes that showcase
                        your skills and help you stand out in every
                        opportunity. Create, customize, and download
                        ATS-friendly CVs in minutes.
                    </p>
                    <div className="footer-socials">
                        <a href="#" className="social-link">
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a href="#" className="social-link">
                            <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                        <a href="#" className="social-link">
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a href="#" className="social-link">
                            <i className="fa-solid fa-envelope"></i>
                        </a>
                    </div>
                </div>

                <div className="footer-navigation">
                    <h3>
                        <i className="fa-regular fa-compass"></i>
                        Quick Links
                    </h3>
                    <a href="/">
                        <i className="fa-solid fa-chevron-right"></i>
                        Home
                    </a>
                    <a href="/templates">
                        <i className="fa-solid fa-chevron-right"></i>
                        Templates
                    </a>
                    <a href="/editor">
                        <i className="fa-solid fa-chevron-right"></i>
                        Editor
                    </a>
                    <a href="/login">
                        <i className="fa-solid fa-chevron-right"></i>
                        Login
                    </a>
                    <a href="/about">
                        <i className="fa-solid fa-chevron-right"></i>
                        About Us
                    </a>
                </div>

                <div className="footer-newsletter">
                    <h3>
                        <i className="fa-regular fa-envelope"></i>
                        Newsletter
                    </h3>
                    <p>Subscribe to get updates on new templates and features.</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Your email address" />
                        <button>
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                    <div className="footer-badges">
                        <span>
                            Free tips
                        </span>
                        <span className="separator">|</span>
                        <span>
                            No spam
                        </span>
                        <span className="separator">|</span>
                        <span>
                            Unsubscribe anytime
                        </span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>© 2026 DevProfile. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="/privacy">Privacy Policy</a>
                        <span className="separator">|</span>
                        <a href="/terms">Terms of Service</a>
                        <span className="separator">|</span>
                        <a href="/cookies">Cookies</a>
                    </div>
                </div>
            </div>

            <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <i className="fa-solid fa-arrow-up"></i>
            </button>
        </footer>
    );
}

export default Footer;