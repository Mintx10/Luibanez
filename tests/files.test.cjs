const {test}=require('node:test');const assert=require('node:assert/strict');
test('file reader rejects empty, oversized and expanding archives before decompression',async()=>{
 const {validateStudyFile,validateOfficeArchive,validateExtractedText}=await import('../modules/file-limits.mjs');
 assert.throws(()=>validateStudyFile({size:0}));assert.throws(()=>validateStudyFile({size:21*1024*1024}));
 assert.throws(()=>validateOfficeArchive(new ArrayBuffer(4)));
 const zip=new ArrayBuffer(68),data=new DataView(zip);data.setUint32(0,0x02014b50,true);data.setUint32(24,100*1024*1024,true);data.setUint32(46,0x06054b50,true);data.setUint16(56,1,true);data.setUint32(58,46,true);data.setUint32(62,0,true);
 assert.throws(()=>validateOfficeArchive(zip),/descomprimido/);
 assert.throws(()=>validateExtractedText('a'.repeat(4000001)));validateExtractedText('Material válido');
});
