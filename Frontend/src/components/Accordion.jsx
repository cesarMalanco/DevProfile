import { useState } from "react";
import "../styles/AccordionStyles.css";

function AccordionItem({ title, icon, children, defaultOpen = false, onDelete }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <button
        type="button"
        className={`accordion-header ${isOpen ? "active" : ""}`}
        onClick={toggleAccordion}
      >
        <div className="accordion-title">
          <i className={`${icon}`}></i>
          <span>{title}</span>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          {onDelete && (
            <button
              type="button"
              className="accordion-delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              title="Delete"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          )}
          <i className={`fa-solid fa-chevron-down accordion-icon ${isOpen ? "open" : ""}`}></i>
        </div>
      </button>
      
      {isOpen && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  );
}

export default AccordionItem;
