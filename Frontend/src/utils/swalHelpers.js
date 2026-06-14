import Swal from "sweetalert2";

export const getSwalConfig = (darkMode) => ({
    iconColor: darkMode ? "var(--dm-gold)" : "var(--lm-accent)",
    background: darkMode ? "var(--dm-blue)" : "var(--lm-white)",
    color: darkMode ? "var(--dm-lightbeige)" : "var(--lm-text)",
    customClass: {
        popup: "swal-popup",
        title: "swal-title",
        input: "swal-select",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel"
    }
});

export const showAlert = (
    darkMode,
    {
        icon = "info",
        title = "",
        text = "",
        confirmButtonText = "OK"
    }
) => {
    return Swal.fire({
        icon,
        title,
        text,
        confirmButtonText,
        ...getSwalConfig(darkMode)
    });
};