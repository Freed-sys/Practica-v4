import React, { useState, useEffect } from "react";
import clienteAxios from "../../helpers/clienteAxios";
import jsPDF from "jspdf";

function OrdenPDF() {
  const [orden, setOrden] = useState();

  const handleGenerarPDF = () => {
    clienteAxios
      .get("/api/mostrarOrden")
      .then((response) => {
        setOrden(response.data);
        console.log(orden);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (orden) {
      const doc = new jsPDF();
      console.log(orden[0]);
  
      doc.setFontSize(26);
      doc.setFont('helvetica', 'bold');
  
      doc.text('Órdenes de Trabajo', 70, 20);
  
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
  
      let startY = 40;
  
      const ordenesText = orden.map((o, i) => {
        const cliente = o.nombre_cliente && o.apellidos_cliente ? `${o.nombre_cliente} ${o.apellidos_cliente}` : 'N/A';
        const variante = o.nombre_variante || 'N/A';
        const estado = o.name || 'N/A';
        const text = `Orden ${i+1}:`;
        const lines = doc.splitTextToSize(text, doc.internal.pageSize.width - 20);
        const height = lines.length * doc.internal.getFontSize();
        const pageHeight = doc.internal.pageSize.height;
        if (startY + height > pageHeight - 20) {
          doc.addPage();
          startY = 10;
        }
        doc.text(lines, 10, startY);
        startY += height + 5;
        doc.text(`Cliente: ${cliente}`, 30, startY);
        startY += 10;
        doc.text(`Variante: ${variante}`, 30, startY);
        startY += 10;
        doc.text(`Estado: ${estado}`, 30, startY);
        startY += 15;

          // Agregar línea separadora
          const lineY = startY - 10;
          doc.setLineWidth(0.5);
          doc.line(20, lineY, doc.internal.pageSize.width - 20, lineY);
      });
  
      doc.save('orden_trabajo.pdf');
    }
  }, [orden]);
  

  return (
    <div>
      <button onClick={handleGenerarPDF}>Generar PDF</button>
    </div>
  );
}

export default OrdenPDF;