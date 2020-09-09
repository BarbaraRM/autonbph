//obtener las variables del html
let mensaje3=document.getElementById('message-e3')
let user3 = document.getElementById('name-e3')
let btn_enviar3=document.getElementById('enviar-e3')
let conversacion3=document.getElementById('conversacion-e3')

btn_enviar3.addEventListener('click', ()=>{    
    var user_name = user3.value
    var texto = mensaje3.value
    if(user3.value == ''){
        user_name = 'Anónimo'
    }
    socket.emit('new-message-e3',{usuario: user_name, mensaje:mensaje3.value})
    if(texto.toLowerCase().includes('hola')){
        //socket.emit('new-answer-e3', {usuario: user_name, mensaje:mensaje3.value})
        socket.emit('new-answer-e3', {usuario: "Server", mensaje:'¿Qué tal?', id: socket.id})
    }   
    mensaje3.value=''
})

socket.on('client-message-e3',(data)=>{    
    conversacion3.innerHTML+=`<p id="usuario-m"><strong>${data.usuario}</strong>:  ${data.mensaje}</p>`
})

socket.on('server-message-e3',(data)=>{    
    console.log(data)
    conversacion3.innerHTML+=`<p id="respuesta-m"><strong>${data.usuario}</strong> ${data.mensaje}</p>`
})