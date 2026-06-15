import jsPDF from "jspdf";
import { API_BASE_URL, UPLOADS_URL } from "../utils/apiConfig.js";

const CV_API_URL = `${API_BASE_URL}/cvs`;

const getImageBase64 = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Unable to load image");
  const blob = await response.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) resolve(reader.result.toString());
      else reject(new Error("Failed to convert image to base64"));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const getImageDimensions = async (url) => {
  return await new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => resolve({ width: image.width, height: image.height });
    image.onerror = reject;
    image.src = url;
  });
};

const fetchCvById = async (cvId) => {
  const response = await fetch(`${CV_API_URL}/${cvId}`);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to load CV data");
  }
  return response.json();
};

// 1. Agregamos el parámetro templateId a la función exportadora
export const exportCvAsPdf = async (cvId, templateId = 1) => {
  const data = await fetchCvById(cvId);
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 36;
  const sidebarWidth = 170;
  const contentX = sidebarWidth + margin + 20;
  const contentWidth = pageWidth - contentX - margin;
  const lineHeight = 16;
  const subsectionGap = 12;

  const { cv, profile, skills, projects, education, languages } = data;
  const title = profile?.nombre_completo || cv.nombre_cv || `CV ${cv.id_cv}`;
  const subtitle = profile?.profesion || "";

  // ===================================================
  // 2. CONFIGURACIÓN DINÁMICA DE PALETAS DE COLOR (Mapeado a tus diseños)
  // ===================================================
  let config = {
    pageBg: [255, 255, 255],       // Fondo de la hoja blanca por defecto
    sidebarBg: [23, 28, 38],       // Gris oscuro original
    sidebarText: [242, 238, 233],  // Blanco crema
    goldColor: [166, 140, 96],     // Dorado original
    titleColor: [166, 140, 96],    // Apellido dorado
    contentTitle: [50, 55, 70],    // Títulos de secciones en gris oscuro
    fontStyle: "helvetica"
  };

  if (Number(templateId) === 2) {
    // DISEÑO 2: Minimalista Corporativo (Gris Claro y Azul Formal)
    config.pageBg = [229, 231, 235];       // Gris claro
    config.sidebarBg = [209, 213, 219];    // Gris un poco más marcado
    config.sidebarText = [17, 24, 39];     // Letras oscuras en sidebar
    config.goldColor = [31, 78, 121];      // Azul corporativo para títulos de sidebar
    config.titleColor = [31, 78, 121];     // Apellido en Azul
    config.contentTitle = [31, 78, 121];   // Títulos de sección en Azul
  } else if (Number(templateId) === 3) {
    // DISEÑO 3: Elegante Emocional (Crema y Café Orgánico)
    config.pageBg = [250, 246, 240];       // Fondo crema cálido
    config.sidebarBg = [62, 59, 51];       // Marrón oscuro elegante
    config.sidebarText = [245, 245, 245];  // Blanco suave
    config.goldColor = [212, 175, 55];     // Dorado brillante
    config.titleColor = [101, 83, 47];     // Café/Dorado viejo
    config.contentTitle = [101, 83, 47];   // Secciones en Café
    config.fontStyle = "times";            // Forzamos fuente clásica con patines (Serif)
  }

  const buildSidebarLines = async () => {
    const sidebarX = 0;
    const innerX = sidebarX + 14;
    const sidebarTextWidth = sidebarWidth - (innerX - sidebarX) - 10; 
    const lines = [];

    if (profile?.foto_perfil) {
      const imageUrl = UPLOADS_URL(profile.foto_perfil);
      lines.push({ type: "image", src: imageUrl, height: 170 });
      lines.push({ type: "spacer", height: 20 });
    } else {
      lines.push({ type: "spacer", height: 20 });
    }

    lines.push({ type: "heading", text: "CONTACT", height: 14, color: config.goldColor });

    // Alternar color de iconos según fondo del sidebar
    const iconTheme = Number(templateId) === 2 ? "000000" : "ffffff";
    const iconUrls = {
      phone: `https://img.icons8.com/ios-filled/64/${iconTheme}/phone.png`,
      email: `https://img.icons8.com/ios-filled/64/${iconTheme}/new-post.png`,
      location: `https://img.icons8.com/ios-filled/64/${iconTheme}/marker.png`,
      linkedin: `https://img.icons8.com/ios-filled/64/${iconTheme}/linkedin.png`,
      github: `https://img.icons8.com/ios-filled/64/${iconTheme}/github.png`,
      website: `https://img.icons8.com/ios-filled/64/${iconTheme}/domain.png`,
    };

    const wrapContactText = (text, width) => {
      doc.setFont(config.fontStyle, "normal");
      doc.setFontSize(8);
      const tokens = text.match(/[^./]+[./]?/g) || [text];
      const lines = [];
      let currentLine = "";

      const measure = (value) => doc.getTextWidth(value);

      for (const token of tokens) {
        const candidate = currentLine + token;
        if (measure(candidate) <= width) {
          currentLine = candidate;
          continue;
        }

        if (currentLine) {
          lines.push(currentLine.trim());
          currentLine = token;
          continue;
        }

        lines.push(token.trim());
        currentLine = "";
      }

      if (currentLine) lines.push(currentLine.trim());
      return lines;
    };

    const addContactField = (iconType, value) => {
      if (!value) return;
      const iconSize = 12;
      const textX = innerX + iconSize + 8;
      const contactTextWidth = sidebarWidth - (textX - sidebarX) - 8;
      const wrapped = wrapContactText(value, contactTextWidth);
      lines.push({ type: "contact", icon: iconUrls[iconType], wrapped });
    };

    addContactField("phone", profile?.telefono);
    addContactField("email", profile?.correo);
    addContactField("location", profile?.ciudad);
    addContactField("linkedin", profile?.linkedin);
    addContactField("github", profile?.github);
    addContactField("website", profile?.portafolio);

    lines.push({ type: "separator", height: 30 });

    const educationLines = (education || [])
      .filter((item) => item.institucion || item.programa || item.periodo)
      .map((item) => {
        const institution = item.institucion || "Education";
        const program = item.programa ? `${item.programa}` : "";
        const period = item.periodo ? `${item.periodo}` : "";
        return `${institution}${program ? ` — ${program}` : ""}${period ? ` (${period})` : ""}`;
      });

    if (educationLines.length) {
      lines.push({ type: "sectionHeading", text: "EDUCATION", height: 14 });
      educationLines.slice(0, 3).forEach((l) => {
        const wrapped = doc.splitTextToSize(l, sidebarTextWidth - 30);
        wrapped.forEach((w, idx) => lines.push({ type: idx === 0 ? "bullet" : "bulletCont", text: w }));
        lines.push({ type: "spacer", height: 6 });
      });
    }

    lines.push({ type: "separator", height: 30 });

    const skillLines = (skills || []).map((skill) => `${skill.nombre || skill.categoria || "Skill"}${skill.nivel ? ` — ${skill.nivel}` : ""}`);
    if (skillLines.length) {
      lines.push({ type: "sectionHeading", text: "SKILLS", height: 14 });
      skillLines.forEach((l) => {
        const wrapped = doc.splitTextToSize(l, sidebarTextWidth - 30);
        wrapped.forEach((w, idx) => lines.push({ type: idx === 0 ? "bullet" : "bulletCont", text: w }));
        lines.push({ type: "spacer", height: 6 });
      });
    }

    lines.push({ type: "separator", height: 30 });

    const languageLines = (languages || []).map((language) => `${language.idioma || "Language"}${language.nivel ? ` — ${language.nivel}` : ""}`);
    if (languageLines.length) {
      lines.push({ type: "sectionHeading", text: "LANGUAGES", height: 14 });
      languageLines.forEach((l) => {
        const wrapped = doc.splitTextToSize(l, sidebarTextWidth - 30);
        wrapped.forEach((w, idx) => lines.push({ type: idx === 0 ? "bullet" : "bulletCont", text: w }));
        lines.push({ type: "spacer", height: 6 });
      });
    }

    return lines;
  };

  let sidebarLines = [];
  let sidebarStartIndex = 0;

  const drawSidebarPage = async (startIndex = 0) => {
    const sidebarX = 0;
    const innerX = sidebarX + 14;

    // Pintar fondo general de la hoja blanca/crema/gris
    doc.setFillColor(...config.pageBg);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Pintar fondo del sidebar
    doc.setFillColor(...config.sidebarBg);
    doc.rect(sidebarX, 0, sidebarWidth, pageHeight, "F");

    let y = 18;
    for (let i = startIndex; i < sidebarLines.length; i++) {
      const el = sidebarLines[i];
      if (el.type === "image") {
        try {
          const imageData = await getImageBase64(el.src);
          const dimensions = await getImageDimensions(el.src);
          const aspectRatio = dimensions.width / dimensions.height;
          const imageWidth = sidebarWidth;
          const imageHeight = imageWidth / aspectRatio;
          doc.addImage(imageData, "JPEG", sidebarX, 0, imageWidth, imageHeight);
          
          // Efecto blanco y negro si es la plantilla 2 minimalista
          if (Number(templateId) === 2) {
            // Nota: jsPDF básico no soporta filtros nativos directo en addImage, 
            // pero el cambio visual de colores de interfaz ya cumple de forma excelente.
          }
          y = imageHeight + 20;
        } catch (e) {
          console.error("Failed to load sidebar image", e);
          y = (el.height || 170) + 20;
        }
        startIndex = i + 1;
        continue;
      }

      if (el.type === "spacer") {
        const h = el.height || 10;
        if (y + h > pageHeight - 12) return { nextIndex: i, finished: false };
        y += h;
        startIndex = i + 1;
        continue;
      }

      if (el.type === "heading" || el.type === "sectionHeading") {
        const h = el.height || 14;
        if (y + h > pageHeight - 12) return { nextIndex: i, finished: false };
        doc.setFont(config.fontStyle, "bold");
        doc.setFontSize( el.type === "heading" ? 12 : 10 );
        doc.setTextColor(...(el.color || config.goldColor));
        doc.text(el.text, innerX, y);
        y += h;
        startIndex = i + 1;
        continue;
      }

      if (el.type === "separator") {
        const h = el.height || 30;
        if (y + 6 + h > pageHeight - 12) return { nextIndex: i, finished: false };
        // Separador más tenue para el diseño minimalista gris
        if (Number(templateId) === 2) doc.setDrawColor(156, 163, 175);
        else doc.setDrawColor(160, 166, 175);
        doc.setLineWidth(0.6);
        doc.line(innerX, y + 6, innerX + sidebarWidth - 36, y + 6);
        y += h;
        startIndex = i + 1;
        continue;
      }

      if (el.type === "contact") {
        const iconSize = 12;
        const textX = innerX + iconSize + 8;
        for (let wi = 0; wi < el.wrapped.length; wi++) {
          const isFirst = wi === 0;
          const h = isFirst ? 8 + 10 : 10;
          if (y + h > pageHeight - 12) return { nextIndex: i, finished: false };
          if (isFirst) {
            try {
              if (el.icon) {
                const iconData = await getImageBase64(el.icon);
                doc.addImage(iconData, "PNG", innerX, y, iconSize, iconSize);
              } else {
                doc.setFillColor(...config.sidebarText);
                doc.circle(innerX + iconSize / 2, y + iconSize / 2, iconSize / 4, "F");
              }
            } catch (err) {
              doc.setFillColor(...config.sidebarText);
              doc.circle(innerX + iconSize / 2, y + iconSize / 2, iconSize / 4, "F");
            }
            doc.setFont(config.fontStyle, "normal");
            doc.setFontSize(8);
            doc.setTextColor(...config.sidebarText);
            doc.text(el.wrapped[wi], textX, y + 8);
            y += 8 + 10;
          } else {
            doc.setFont(config.fontStyle, "normal");
            doc.setFontSize(8);
            doc.setTextColor(...config.sidebarText);
            doc.text(el.wrapped[wi], textX, y + 8);
            y += 10;
          }
        }
        y += 6;
        startIndex = i + 1;
        continue;
      }

      if (el.type === "bullet" || el.type === "bulletCont") {
        const isBullet = el.type === "bullet";
        const h = 10;
        if (y + h > pageHeight - 12) return { nextIndex: i, finished: false };
        doc.setFont(config.fontStyle, "normal");
        doc.setFontSize(9);
        doc.setTextColor(...config.sidebarText);
        if (isBullet) doc.text(`• ${el.text}`, innerX, y);
        else doc.text(el.text, innerX + 10, y);
        y += 10;
        startIndex = i + 1;
        continue;
      }
    }

    return { nextIndex: sidebarLines.length, finished: true };
  };

  const addPageWithSidebar = async () => {
    doc.addPage();
    const res = await drawSidebarPage(sidebarStartIndex);
    sidebarStartIndex = res.nextIndex;
  };

  const drawProjectsPage = async (projects) => {
    let y = margin;
    const sectionTitle = "PROJECTS";
    const renderHeader = () => {
      doc.setFont(config.fontStyle, "bold");
      doc.setFontSize(12);
      doc.setTextColor(...config.contentTitle);
      doc.text(sectionTitle, contentX, y);
      doc.setDrawColor(210, 210, 210);
      doc.setLineWidth(0.5);
      doc.line(contentX, y + 4, contentX + contentWidth, y + 4);
      y += 18;
    };

    renderHeader();

    for (const project of projects) {
      if (y > pageHeight - margin - 180) {
        await addPageWithSidebar();
        y = margin;
        renderHeader();
      }

      const title = project.nombre || "Project";
      const subtitle = project.tecnologias ? ` — ${project.tecnologias}` : "";
      const description = project.descripcion || "";
      const links = [project.repositorio ? `Repo: ${project.repositorio}` : null, project.deploy ? `Live: ${project.deploy}` : null].filter(Boolean);

      doc.setFont(config.fontStyle, "bold");
      doc.setFontSize(11);
      doc.setTextColor(80, 85, 95);
      const projectTitle = `${title}${subtitle}`;
      const titleLines = doc.splitTextToSize(projectTitle, contentWidth);
      for (const line of titleLines) {
        if (y > pageHeight - margin) {
          await addPageWithSidebar();
          y = margin;
          renderHeader();
        }
        doc.text(line, contentX, y);
        y += 14;
      }

      if (project.imagen) {
        try {
          const imageUrl = UPLOADS_URL(project.imagen);
          const imageData = await getImageBase64(imageUrl);
          const imageWidth = Math.min(contentWidth, 220);
          const imageHeight = 120;
          const imageX = contentX + (contentWidth - imageWidth) / 2;
          y += 10;
          if (y + imageHeight > pageHeight - margin) {
            await addPageWithSidebar();
            y = margin;
            renderHeader();
          }
          doc.addImage(imageData, "JPEG", imageX, y, imageWidth, imageHeight);
          y += imageHeight + 18;
        } catch (error) {
          console.error("Failed to load project image", error);
        }
      }

      if (description || links.length)  y += 10;

      if (description) {
        doc.setFont(config.fontStyle, "normal");
        doc.setFontSize(10);
        doc.setTextColor(100, 105, 115);
        const descLines = doc.splitTextToSize(description, contentWidth);
        for (const line of descLines) {
          if (y > pageHeight - margin) {
            await addPageWithSidebar();
            y = margin;
            renderHeader();
          }
          doc.text(line, contentX, y);
          y += 12;
        }
        if (links.length) y += 10;
      }

      if (links.length) {
        doc.setFont(config.fontStyle, "normal");
        doc.setFontSize(10);
        doc.setTextColor(120, 125, 135);
        for (const link of links) {
          const wrapped = doc.splitTextToSize(link, contentWidth);
          for (const line of wrapped) {
            if (y > pageHeight - margin) {
              await addPageWithSidebar();
              y = margin;
              renderHeader();
            }
            doc.text(line, contentX, y);
            y += 12;
          }
        }
      }

      y += 18;
    }

    return y;
  };

  const drawSection = async (heading, text, topY) => {
    if (!text) return topY;
    const headingY = topY;
    doc.setFont(config.fontStyle, "bold");
    doc.setFontSize(12);
    doc.setTextColor(...config.contentTitle);
    doc.text(heading.toUpperCase(), contentX, headingY);
    doc.setDrawColor(210, 210, 210);
    doc.setLineWidth(0.5);
    doc.line(contentX, headingY + 4, contentX + contentWidth, headingY + 4);
    const bodyY = headingY + 22;
    doc.setFont(config.fontStyle, "normal");
    doc.setFontSize(10);
    doc.setTextColor(80, 85, 95);
    const wrapped = doc.splitTextToSize(text, contentWidth);
    let currentY = bodyY;
    for (const line of wrapped) {
      if (currentY > pageHeight - margin) {
        await addPageWithSidebar();
        currentY = margin;
      }
      doc.text(line, contentX, currentY);
      currentY += lineHeight;
    }
    doc.setTextColor(0, 0, 0);
    return currentY + subsectionGap;
  };

  const drawCombinedSection = async (topY) => {
    let y = topY;

    if (education && education.length) {
      doc.setFont(config.fontStyle, "bold");
      doc.setFontSize(12);
      doc.setTextColor(...config.contentTitle);
      doc.text("EDUCATION", contentX, y);
      doc.setDrawColor(210, 210, 210);
      doc.setLineWidth(0.5);
      doc.line(contentX, y + 4, contentX + contentWidth, y + 4);
      y += 18;

      for (const item of education) {
        if (y > pageHeight - margin) { await addPageWithSidebar(); y = margin; }
        doc.setFont(config.fontStyle, "bold");
        doc.setFontSize(10);
        doc.setTextColor(80, 85, 95);
        const title = item.institucion || "Education";
        const program = item.programa ? ` — ${item.programa}` : "";
        const period = item.periodo ? ` (${item.periodo})` : "";
        const titleFull = `${title}${program}${period}`;
        const titleWrapped = doc.splitTextToSize(titleFull, contentWidth);
        for (const line of titleWrapped) {
          if (y > pageHeight - margin) { await addPageWithSidebar(); y = margin; }
          doc.text(line, contentX, y);
          y += 14;
        }

        const details = [item.descripcion, item.evidencia].filter(Boolean).join("\n");
        if (details) {
          doc.setFont(config.fontStyle, "normal");
          doc.setFontSize(10);
          doc.setTextColor(80, 85, 95);
          const wrap = doc.splitTextToSize(details, contentWidth);
          for (const line of wrap) {
            if (y > pageHeight - margin) { await addPageWithSidebar(); y = margin; }
            doc.text(line, contentX, y);
            y += lineHeight;
          }
        }
        y += 10;
      }
      y += subsectionGap;
    }

    if (skills && skills.length) {
      doc.setFont(config.fontStyle, "bold");
      doc.setFontSize(12);
      doc.setTextColor(...config.contentTitle);
      doc.text("SKILLS", contentX, y);
      doc.setDrawColor(210, 210, 210);
      doc.setLineWidth(0.5);
      doc.line(contentX, y + 4, contentX + contentWidth, y + 4);
      y += 18;

      for (const skill of skills) {
        if (y > pageHeight - margin) { await addPageWithSidebar(); y = margin; }
        doc.setFont(config.fontStyle, "bold");
        doc.setFontSize(10);
        doc.setTextColor(80, 85, 95);
        const baseName = skill.nombre || skill.categoria || "Skill";
        const categoryPart = skill.nombre && skill.categoria ? ` — ${skill.categoria}` : "";
        const title = `${baseName}${categoryPart}${skill.nivel ? ` — ${skill.nivel}` : ""}`;
        const titleWrapped = doc.splitTextToSize(title, contentWidth);
        for (const line of titleWrapped) {
          if (y > pageHeight - margin) { await addPageWithSidebar(); y = margin; }
          doc.text(line, contentX, y);
          y += 14;
        }

        const details = [skill.descripcion, skill.evidencia].filter(Boolean).join("\n");
        if (details) {
          doc.setFont(config.fontStyle, "normal");
          doc.setFontSize(10);
          doc.setTextColor(80, 85, 95);
          const wrap = doc.splitTextToSize(details, contentWidth);
          for (const line of wrap) {
            if (y > pageHeight - margin) { await addPageWithSidebar(); y = margin; }
            doc.text(line, contentX, y);
            y += lineHeight;
          }
        }
        y += 10;
      }
      y += subsectionGap;
    }

    if (languages && languages.length) {
      doc.setFont(config.fontStyle, "bold");
      doc.setFontSize(12);
      doc.setTextColor(...config.contentTitle);
      doc.text("LANGUAGES", contentX, y);
      doc.setDrawColor(210, 210, 210);
      doc.setLineWidth(0.5);
      doc.line(contentX, y + 4, contentX + contentWidth, y + 4);
      y += 18;

      for (const language of languages) {
        if (y > pageHeight - margin) { await addPageWithSidebar(); y = margin; }
        doc.setFont(config.fontStyle, "bold");
        doc.setFontSize(10);
        doc.setTextColor(80, 85, 95);
        const title = `${language.idioma || "Language"}${language.nivel ? ` — ${language.nivel}` : ""}`;
        const titleWrapped = doc.splitTextToSize(title, contentWidth);
        for (const line of titleWrapped) {
          if (y > pageHeight - margin) { await addPageWithSidebar(); y = margin; }
          doc.text(line, contentX, y);
          y += 14;
        }

        const details = language.descripcion || "";
        if (details) {
          doc.setFont(config.fontStyle, "normal");
          doc.setFontSize(10);
          doc.setTextColor(80, 85, 95);
          const wrap = doc.splitTextToSize(details, contentWidth);
          for (const line of wrap) {
            if (y > pageHeight - margin) { await addPageWithSidebar(); y = margin; }
            doc.text(line, contentX, y);
            y += lineHeight;
          }
        }
        y += 10;
      }
      y += subsectionGap;
    }

    return y;
  };

  sidebarLines = await buildSidebarLines();
  const firstSidebarResult = await drawSidebarPage(0);
  sidebarStartIndex = firstSidebarResult.nextIndex;

  const headingY = margin + 24;

  const fullName = title || "";
  const nameParts = fullName.trim().split(/\s+/);
  const surname = nameParts.length > 1 ? nameParts.pop() : "";
  const firstNames = nameParts.join(" ") || surname;

  doc.setFont(config.fontStyle, "normal");
  doc.setFontSize(12);
  doc.setTextColor(100, 105, 115);
  doc.text(firstNames.toUpperCase(), contentX, headingY);

  doc.setFont(config.fontStyle, "bold");
  doc.setFontSize(32);
  doc.setTextColor(...config.titleColor);
  const surnameY = headingY + 28;
  doc.text(surname.toUpperCase() || firstNames.toUpperCase(), contentX, surnameY);

  if (subtitle) {
    doc.setFont(config.fontStyle, "normal");
    doc.setFontSize(11);
    doc.setTextColor(120, 125, 135);
    doc.text(subtitle.toUpperCase(), contentX, surnameY + 18);
  }

  let currentY = surnameY + 48;
  const summaryText = profile?.descripcion || "";
  if (summaryText) {
    currentY = await drawSection("Professional Summary", summaryText, currentY);
  }

  currentY = await drawCombinedSection(currentY);

  if (projects && projects.length) {
    await addPageWithSidebar();
    await drawProjectsPage(projects);
  }

  if (!summaryText && (!education || education.length === 0) && (!projects || projects.length === 0)) {
    doc.setFont(config.fontStyle, "normal");
    doc.setFontSize(10);
    doc.text("No additional content available.", contentX, currentY);
  }

  const fileName = `${title || `CV-${cv.id_cv}`}`.replace(/\s+/g, "-");
  doc.save(`${fileName}.pdf`);
};