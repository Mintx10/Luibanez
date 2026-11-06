import {currentUser,updateStudentProfile} from '../session.mjs';
import {el,button,field} from './dom.mjs';
export function editProfile(){
 const name=el('input',{value:currentUser()?.user_metadata?.apodo||'',required:true,maxlength:80}),file=el('input',{type:'file',accept:'image/png,image/jpeg,image/webp'}),status=el('p',{role:'status'});
 const form=el('form',{class:'campus-stack'},field('Nombre o apodo',name),field('Foto de perfil · opcional',file),el('p',{class:'campus-muted'},'Se guarda en tu perfil privado. No se incluye en las credenciales de acceso.'),el('button',{type:'submit',class:'campus-button'},'Guardar perfil'),status);
 const dialog=el('dialog',{class:'campus-dialog'},el('h2',{},'Tu perfil de alumno'),form,button('Cerrar',()=>{dialog.close();dialog.remove();},true));
 form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const submit=e.submitter;submit.disabled=true;try{
  let fotoDataUrl;const photo=file.files[0];if(photo){if(photo.size>5000000||!['image/png','image/jpeg','image/webp'].includes(photo.type))throw new Error('Elegí una imagen PNG, JPEG o WebP de hasta 5 MB.');const bitmap=await createImageBitmap(photo);if(bitmap.width*bitmap.height>40000000){bitmap.close();throw new Error('La imagen tiene demasiados píxeles.');}const canvas=document.createElement('canvas');canvas.width=canvas.height=192;const ctx=canvas.getContext('2d');const size=Math.min(bitmap.width,bitmap.height);ctx.drawImage(bitmap,(bitmap.width-size)/2,(bitmap.height-size)/2,size,size,0,0,192,192);bitmap.close();fotoDataUrl=canvas.toDataURL('image/jpeg',.8);}
  await updateStudentProfile({apodo:name.value,fotoDataUrl});await window.__campus.refreshProfile();status.textContent='Perfil guardado en la nube.';
 }catch(error){status.textContent=error.message;}finally{submit.disabled=false;}});document.body.append(dialog);dialog.showModal();name.focus();
}
