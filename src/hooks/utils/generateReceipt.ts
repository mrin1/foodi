import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ReceiptData {
  orderId: string;
  userName: string;
  items: any[];
  total: number;
  paymentId?: string; 
}

export const generateReceipt = (data: ReceiptData) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.setTextColor(228, 140, 70); 
  doc.text("FOODI", 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Delicious Food, Delivered Fast", 14, 28);

  // 2. Order Info
  doc.setTextColor(0);
  doc.setFontSize(12);
  doc.text(`Order ID: ${data.orderId}`, 14, 45);
  doc.text(`Customer: ${data.userName}`, 14, 52);
  doc.text(`Date: ${new Date().toLocaleString()}`, 14, 59);

  autoTable(doc, {
    startY: 70,
    head: [['Item', 'Price', 'Qty', 'Subtotal']],
    body: data.items.map(item => [
      item.title,
      `Rs.${item.price}`,
      item.qty,
      `Rs.${item.price * item.qty}`
    ]),
    headStyles: { fillColor: [228, 140, 70] },
  });

  const finalY = (doc as any).lastAutoTable.finalY || 70;
  doc.setFontSize(14);
  doc.text(`Total Amount: Rs.${data.total}`, 14, finalY + 15);

  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text("Thank you for ordering with Foodi!", 14, finalY + 30);

  doc.save(`Foodi_Order_${data.orderId}.pdf`);
};