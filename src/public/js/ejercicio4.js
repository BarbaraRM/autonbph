//obtener las variables del html
let btn_conectar1 = document.getElementById('start1')
//let btn_desconectar = document.getElementById('stop-e4')
let ventana1 = document.getElementById('vent-e41')
let m1 = document.getElementById('cliente-e41')

var mensaje4="Cliente A: TOKEN ENVIADO"
var mensaje2="Cliente B: EL TOKEN SI LLEGÓ"
var id_A = '', cant = 0;

btn_conectar1.addEventListener('click',()=>{    
    socket.emit('connect-e4')        
})

socket.on('enviar-e4',(contador, tk)=>{
    //console.log(contador)
    if(contador ==1 ){
        document.getElementById('cont-e4').innerHTML = 'No hay suficientes usuarios conectados... Por favor espera a que otro usuario se conecte e intentalo nuevamente';  
    }else{           
        if(btn_conectar1.textContent === 'Conectar Cliente A' ){   
            id_A = socket.id
            document.getElementById('cont-e4').innerHTML = ' ....enviando token ...';  
            socket.emit('mensaje-cliente',{mensaje: mensaje4, id_A: socket.id, tk:1});
            id_A = socket.id             
        }else{      
            if(document.getElementById('cont-e4').textContent == mensaje4){
                socket.emit('confirma',{mensaje: mensaje2, id_A: id_A, tk:0})                
            } 
        }
    }
});
socket.on('mensaje-servidor',(mensaje2)=>{ 
    id_A = mensaje2.id_A    
    document.getElementById('cont-e4').innerHTML = mensaje2.mensaje;  
    socket.emit('connect-e4') 
    
});

socket.on('mensaje-fusuario',(mensaje2)=>{  
    document.getElementById('cont-e4').innerHTML = mensaje2.mensaje;  
    //socket.emit('connect-e4');
    
});

socket.on('msg-server',(mensaje4)=>{
    //console.log('recibio', mensaje)
    document.getElementById('cont-e4').innerHTML = mensaje4.mensaje;

});
socket.on('conectados',(contador, id)=>{
    cant = contador;
    if (contador>1){
        document.getElementById('cliente-e41').innerHTML = 'CLIENTE B'; 
        document.getElementById('descipcion-e41').innerHTML = 'Encargado de confirmar el token.';
        //btn_conectar1.innerHTML = 'Conectar Cliente B';   //no borrar esta linea
        document.getElementById('cont-e4').innerHTML = 'Debe esperar que A envie un token';  
            
        btn_conectar1.hidden = true; 
    }else{
        document.getElementById('cliente-e41').innerHTML = 'CLIENTE A';
        document.getElementById('descipcion-e41').innerHTML = 'Encargado de enviar el token.';  
        btn_conectar1.innerHTML = 'Conectar Cliente A'; 
    }
});








