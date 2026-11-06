function studyPDF() {
  const text='Statistical study material. The mean is the sum of all observations divided by their count. Variance measures dispersion of the sample observations around their mean. Probability describes uncertainty in a controlled experiment.';
  const words=text.split(' ');const lines=[];let line='';for(const word of words){if((line+' '+word).length>75){lines.push(line);line=word}else line+=(line?' ':'')+word;}if(line)lines.push(line);
  const stream='BT /F1 12 Tf 30 750 Td '+lines.map((line,i)=>(i?'0 -16 Td ':'')+`(${line}) Tj`).join(' ')+' ET';
  const objects=['<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids [3 0 R] /Count 1 >>','<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`];
  let source='%PDF-1.4\n';const offsets=[0];
  for(const [i,obj] of objects.entries()){offsets.push(Buffer.byteLength(source));source+=`${i+1} 0 obj\n${obj}\nendobj\n`;}
  const xref=Buffer.byteLength(source);source+=`xref\n0 6\n0000000000 65535 f \n`+offsets.slice(1).map(n=>String(n).padStart(10,'0')+' 00000 n \n').join('')+`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(source);
}
module.exports={studyPDF};
