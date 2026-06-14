import "../styles/FooterStyles.css";
import logo from "../assets/devProfile_logo.png";
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import InfoModal from "./InfoModal";
import { useTheme } from "../context/ThemeContext";

function Footer() {
    const { user } = useAuth();
    const { darkMode } = useTheme();
    const [modal, setModal] = useState(null);
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        if (!email.trim()) {
            Swal.fire({
                icon: "error",
                title: "Email required",
                text: "Please enter your email address."
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: "error",
                iconColor: darkMode ? "var(--dm-gold)" : "var(--lm-accent)",
                title: "Invalid email",
                text: "Please enter a valid email address.",

                background: darkMode ? "var(--dm-blue)" : "var(--lm-white)",
                color: darkMode ? "var(--dm-lightbeige" : "var(--lm-text)",

                confirmButtonColor: darkMode
                    ? "var(--dm-navy)"
                    : "var(--lm-accent)",
            });
            return;
        }

        Swal.fire({
            icon: "success",
            iconColor: darkMode ? "var(--dm-gold)" : "var(--lm-accent)",
            title: "Subscribed!",
            text: "Thank you for subscribing to our newsletter.",

            background: darkMode ? "var(--dm-blue)" : "var(--lm-white)",
            color: darkMode ? "var(--dm-lightbeige" : "var(--lm-text)",

            confirmButtonColor: darkMode
                ? "var(--dm-navy)"
                : "var(--lm-accent)",
        });

        setEmail("");
    };

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
                        <a href="https://github.com/cesarMalanco/DevProfile" target="_blank" rel="noopener noreferrer" className="social-link">
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a href="linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                            <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-link">
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a href="https://workspace.google.com" target="_blank" rel="noopener noreferrer" className="social-link">
                            <i className="fa-solid fa-envelope"></i>
                        </a>
                    </div>
                </div>

                <div className="footer-navigation">
                    <h3>
                        <i className="fa-regular fa-compass"></i>
                        Quick Links
                    </h3>
                    <NavLink to="/"><i className="fa-solid fa-chevron-right"></i> Home</NavLink>
                    {user && (
                        <>
                            <NavLink to="/editor"><i className="fa-solid fa-chevron-right"></i> Editor</NavLink>
                            <NavLink to="/dashboard"><i className="fa-solid fa-chevron-right"></i> Dashboard</NavLink>
                        </>
                    )}
                    <NavLink to="/about"><i className="fa-solid fa-chevron-right"></i> About</NavLink>
                </div>

                <div className="footer-newsletter">
                    <h3>
                        <i className="fa-regular fa-envelope"></i>
                        Newsletter
                    </h3>
                    <p>Subscribe to get updates on new templates and features.</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <button type="button" onClick={handleSubscribe}>
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
                    <p>© 2026 DevProfile. Academic project developed with React and NodeJS</p>
                    <div className="footer-legal">
                        <button className="footer-link-btn" onClick={() => setModal("privacy")}>
                            Privacy Policy
                        </button>
                        <span className="separator">|</span>
                        <button className="footer-link-btn" onClick={() => setModal("terms")}>
                            Terms of Service
                        </button>
                        <span className="separator">|</span>
                        <button className="footer-link-btn" onClick={() => setModal("cookies")}>
                            Cookies
                        </button>
                    </div>
                </div>
            </div>

            <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <i className="fa-solid fa-arrow-up"></i>
            </button>
            <InfoModal type={modal} onClose={() => setModal(null)}/>
        </footer>
    );
}

export default Footer;