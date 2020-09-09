//obtener las variables del html
let namefrom_e1=document.getElementById('name-e1')
let nameto_e1=document.getElementById('name-e2')
let users_e1=document.getElementById('user-lists-e1')
let entradaArchivo=document.getElementById('file-input');
let contenidoArchivo=document.getElementById('contenido-archivo');

var id_env = ''
entradaArchivo.addEventListener('change', leerArchivo, false)

function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    socket.emit('mensaje-cliente-e1', { archivo: archivo, id_to: id_env })
}

socket.on('mensaje-servidor-e1', (data) => {
    contenidoArchivo.innerHTML = `
    <p>HAS RECIBIDO UN MENSAJE NUEVO. El contenido del archivo es el siguiente:</p>
    <pre>${data}</pre>  `
})

socket.on('usernames', data => {
    let html = '';
    for (i = 0; i < data.length; i+=2) {
        html += `<label><input id="hola" type="radio" name="myRadios" value="${data[i+1]}" onchange = "functi(this.value)">${data[i]}</label><br>`;
        //html += `<p>${data[i]}</p>`;
    }
    users_e1.innerHTML = html;
});

function functi(value, nick){    
    id_env = value  
}

