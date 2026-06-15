import React, { useContext } from 'react';
import { CVContext } from '../context/CVContext';

export const CVSelector = () => {
  const { cvData, updateTemplate } = useContext(CVContext);

  const templates = [
    { id: 'modern', name: 'Diseño Moderno', desc: 'Barra lateral oscura con diseño contemporáneo.' },
    { id: 'classic', name: 'Diseño Clásico', desc: 'Estructura tradicional, limpia y muy elegante.' }
  ];

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Selecciona una Plantilla para tu CV</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => updateTemplate(tpl.id)}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              cvData.template === tpl.id
                ? 'border-blue-500 bg-blue-50 dark:bg-gray-700'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
            }`}
          >
            <span className="block font-medium text-gray-950 dark:text-white">{tpl.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{tpl.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
};