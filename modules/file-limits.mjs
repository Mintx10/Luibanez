export function validateStudyFile(file) {
  if (!file || file.size <= 0) throw new Error('El archivo está vacío.');
  if (file.size > 20 * 1024 * 1024) throw new Error('El archivo supera el límite de 20 MB. Dividilo en partes más pequeñas.');
}
export function validateOfficeArchive(buffer) {
  const data=new DataView(buffer);let eocd=-1;
  for(let i=data.byteLength-22;i>=Math.max(0,data.byteLength-65557);i--)if(data.getUint32(i,true)===0x06054b50){eocd=i;break;}
  if(eocd<0)throw new Error('El documento Office no contiene un archivo ZIP válido.');
  const count=data.getUint16(eocd+10,true),size=data.getUint32(eocd+12,true),start=data.getUint32(eocd+16,true);
  if(count>2000||count===65535||start+size>eocd||size===0xffffffff)throw new Error('El documento tiene una estructura demasiado grande o no compatible.');
  let cursor=start,total=0;
  for(let i=0;i<count;i++){
    if(cursor+46>eocd||data.getUint32(cursor,true)!==0x02014b50)throw new Error('El índice del documento está dañado.');
    const expanded=data.getUint32(cursor+24,true);total+=expanded;
    if(expanded>32*1024*1024||total>64*1024*1024)throw new Error('El contenido descomprimido del documento supera el límite permitido.');
    if(data.getUint16(cursor+8,true)&1)throw new Error('Quitá la contraseña del documento antes de cargarlo.');
    cursor+=46+data.getUint16(cursor+28,true)+data.getUint16(cursor+30,true)+data.getUint16(cursor+32,true);
    if(cursor>eocd)throw new Error('El índice del documento está incompleto.');
  }
}
export function validateExtractedText(text) {
  if(new TextEncoder().encode(text).byteLength>4000000)throw new Error('El texto extraído supera los 4 MB. Dividí el documento para poder guardarlo.');
}
