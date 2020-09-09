/*let entradaArchivo=document.getElementById('file-input');
let contenidoArchivo=document.getElementById('contenido-archivo');


entradaArchivo.addEventListener('change', leerArchivo, false)

function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    socket.emit('mensaje-cliente-e1', { archivo: archivo, id_to: })
}

socket.on('mensaje-servidor-e1', (data) => {
    contenidoArchivo.innerHTML = `
    <p>CONTENIDO DEL ARCHIVO OBTENIDO DESDE EL SERVIDOR:</p>
    <pre>${data}</pre>
    `
})*/
