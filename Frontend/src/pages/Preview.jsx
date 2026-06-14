import "../styles/PreviewStyles.css";
import "../styles/globalStyles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCvById } from "../services/cvService";
import { exportCvAsPdf } from "../services/pdfService";
import PageOne from "../components/PageOne";
import PageTwo from "../components/PageTwo";

    function Preview() {
        const navigate = useNavigate();
        const params = new URLSearchParams(window.location.search);
        const cvId = params.get("cvId");
        const [cvData, setCvData] = useState(null);
        const [currentPage, setCurrentPage] = useState(1);

        useEffect(() => {
            if (!cvId) return;

            const loadCv = async () => {
                const data = await getCvById(cvId);
                setCvData(data);
            };

            loadCv();
        }, [cvId]);

        if (!cvData) {
            return <h2>We couldn't find your file</h2>;
        }

        const handleExportPdf = async () => {
            try {
                await exportCvAsPdf(cvId);
            } catch (error) {
                console.error(error);
            }
        };


        return (
            <>
                <div className="preview-section"> 
                    <div className="preview-navigation">
                        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}><i className="fa-solid fa-arrow-left-long"></i></button>
                        <span>{currentPage} / 2</span>
                        <button onClick={() => setCurrentPage(2)} disabled={currentPage === 2}><i className="fa-solid fa-arrow-right-long"></i></button>
                    </div>

                    <div className="preview-actions">
                        <button className="btn-secondary" onClick={() => navigate(`/editor?cvId=${cvId}`)}>
                            <i className="fa-solid fa-pen"></i>
                            Edit
                        </button>

                        <button className="cta-btn-primary" onClick={handleExportPdf}>
                            <i className="fa-solid fa-file-pdf"></i>
                            Download
                        </button>

                    </div>
                    {currentPage === 1 && (
                        <div className="preview-page">
                            <PageOne cvData={cvData} />
                        </div>
                    )}

                    {currentPage === 2 && (
                        <div className="preview-page">
                            <PageTwo cvData={cvData} />
                        </div>
                    )}
                </div>
            </>
        );
    }

    export default Preview;