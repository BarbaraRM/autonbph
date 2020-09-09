//obtener las variables del html
let mensaje=document.getElementById('mensaje')
let btn_enviar=document.getElementById('enviar')
let conversacion=document.getElementById('conversacion')

btn_enviar.addEventListener('click', ()=>{    
    socket.emit('nuevo_mensaje',{mensaje:mensaje.value})
    socket.emit('nueva_respuesta', {mensaje:mensaje.value})
    mensaje.value=''
})

socket.on('mensaje_cliente',(data)=>{
    conversacion.innerHTML+=`<p id="usuario-m"><strong>User</strong>:  ${data.mensaje}</p>`
})

socket.on('mensaje_servidor',(mensaje)=>{    
    conversacion.innerHTML+=`<p id="respuesta-m"><strong> E2:</strong> ${mensaje}</p>`
})