import "../styles/ModalStyles.css";
import { useTheme } from "../context/ThemeContext";

function InfoModal({ type, onClose }) {
    if (!type) return null;

    const modalConfig = {
        privacy: {
            title: "Privacy Policy",
            content: "DevProfile stores user information only for CV creation purposes. Your data is never shared with third parties without your explicit consent."
        },
        terms: {
            title: "Terms of Service",
            content: "Users agree to use DevProfile responsibly and provide accurate information. We reserve the right to update these terms as needed."
        },
        cookies: {
            title: "Cookie Policy",
            content: "DevProfile uses localStorage and cookies to save preferences and session data. You can disable cookies in your browser settings at any time."
        }
    };

    const currentModal = modalConfig[type];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()} 
            >
                <button
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    ×
                </button>

                <h2 className="modal-title">{currentModal.title}</h2>

                <div className="modal-body">
                    <p>{currentModal.content}</p>
                </div>

                <div className="modal-footer">
                    <button
                        className="modal-btn modal-btn-primary"
                        onClick={onClose}
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InfoModal;