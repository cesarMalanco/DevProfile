import { useState } from "react";
import "../styles/AccordionStyles.css";

function AccordionItem({ title, icon, children, defaultOpen = false }) {
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
        <i className={`fa-solid fa-chevron-down accordion-icon ${isOpen ? "open" : ""}`}></i>
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
