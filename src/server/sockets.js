module.exports = io => {
    //funcion necesaria para el ejercicio2 
    async function botstr(findStr){
        //natural language processing for chatbot
        var { NlpManager } = require('node-nlp')
        const manager = new NlpManager({ languages: ['en'], nlu: { useNoneFeature: false }});
        //train the chatbot      
        console.log("1")
        manager.addDocument('en', "¿como te llamas?", 'name');
        manager.addDocument('en', "¿cómo te llamas?", 'name');       
        manager.addDocument('en', "¿cuántas líneas de código tienes?",'lines');
        manager.addDocument('en', "¿cuantas lineas de codigo tienes?",'lines');
        manager.addDocument('en', "¿cuántas lineas de codigo tienes?",'lines');
        manager.addDocument('en', "¿cuántas líneas de codigo tienes?",'lines');
        manager.addDocument('en', "¿cuantas líneas de código tienes?",'lines');
        manager.addDocument('en', "¿cuántas líneas de codigo tienes?",'lines');
        manager.addDocument('en', "¿cuantas lineas de código tienes?",'lines');
    
        manager.addAnswer('en', 'lines', 'Mi código tiene 78 líneas (u.u)');
        manager.addAnswer('en', 'name', 'Mi nombre es Ejercicio 2. (>.<)');
        
        await manager.train();
        manager.save();
        var response = await manager.process('en', findStr);
        return response.answer;
    }
    let usuarios_ejercicio1 = {};
    let nombres_us = {};

    io.on('connection', socket=>{
        console.log('Nueva conexion',socket.id)

        //EJERCICIO 1 ********************************
        socket.on('mensaje-cliente-e1', (data) => {            
            contenidoArchivo=data.archivo.toString()
            console.log(data.id_to)
            io.to(data.id_to).emit('mensaje-servidor-e1', contenidoArchivo)
        })

        socket.on('disconnect1', data => {
            console.log('conexion terminada')

            
        });

        socket.on('nuevo_usuario', (usuario, cb) => {
            if (usuario in usuarios_ejercicio1) {
                cb(false);
            } else {
                cb(true);
                socket.nickname = usuario.name;
                socket.id = usuario.id;
                usuarios_ejercicio1[socket.nickname] = socket;
                usuarios_ejercicio1[socket.id] = socket;
                nombres_us[socket.nickname] = usuario.name;
                console.log(Object.keys(usuarios_ejercicio1));
                console.log(Object.keys(nombres_us));
                io.sockets.emit('usernames', Object.keys(usuarios_ejercicio1));
            }
        });
        
        
        //EJERCICIO 2 ********************************
        socket.on('nuevo_mensaje',(data)=>{
            io.emit('mensaje_cliente',data)
        })

        socket.on('nueva_respuesta', (data)=>{
            var mensaje = "o he entendido la pregunta."
            var msg = data.mensaje.toLowerCase();
            if(msg.indexOf("?")!=-1){
                botstr(msg).then(result => {
                    if(result == null){
                        io.emit('mensaje_servidor', " No he entendido la pregunta :s"); 
                    }
                    else{
                        io.emit('mensaje_servidor', result); 
                    }
                });
            }else{
                io.emit('mensaje_servidor', "Usa los signos ¿? para saber que es pregunta :d"); 
            }      
        })
        //EJERCICIO 3 ********************************
        socket.on('new-message-e3', (data)=>{        
            io.to(socket.id).emit('client-message-e3',data)
        })

        socket.on('new-answer-e3', (data)=>{
            console.log("q"+data)
            io.to(socket.id).emit('server-message-e3',data)
            //io.emit('server-message-e3',data)
        })
        //EJERCICIO 4 ********************************
        var contador = io.engine.clientsCount;
        const users = {};
        var token = 0;
        socket.emit('conectados', io.engine.clientsCount, id);
        socket.on('new-user', name =>{
            
        socket.emit('conectados', io.engine.clientsCount, id);
        })
        socket.on('disconnect', (data) => {
            socket.broadcast.emit('user-disconnected', users[socket.id])
            delete users[socket.id]
            if (!socket.nickname) return;
            delete usuarios_ejercicio1[socket.nickname]; //Eliminamos el usuario que se desconecto del arreglo
            delete usuarios_ejercicio1[socket.id];
            //actualizarListaUsuarios();
            io.sockets.emit('usernames', Object.keys(usuarios_ejercicio1));
          })
        var id= ''
        socket.on('mensaje-cliente',(data)=>{
            console.log(data)
            token = data.tk;  
            if(io.engine.clientsCount==1){
                socket.emit('mensaje-servidor',data);
            }else{
                socket.broadcast.emit('mensaje-servidor',data);
                console.log(socket.id)
                id = socket.id
            }
            
            
        })
        socket.on('confirma',(data)=>{
            console.log(data)
            token = data.tk; 
            io.to(data.id_A).emit('msg-server',data);
            id =''
        });        
        
        socket.on('connect-e4', ()=>{ 
            console.log(token)  
            
            socket.emit('enviar-e4', io.engine.clientsCount, token);

        })
                
        //EJERCICIO 5 ********************************
        socket.emit('conectados-e5', contador)
    })    
  
};
