let numero = document.getElementById('numuser-e5');

socket.on('conectados-e5',(contador)=>{
    numero.innerHTML = contador; 
})