//const sockets = require("../../server/sockets")
const socket = io.connect();

const ejercicio1_div = document.getElementById('ejercicio1')
const ejercicio2_div = document.getElementById('ejercicio2')
const ejercicio3_div = document.getElementById('ejercicio3')
const ejercicio4_div = document.getElementById('ejercicio4')
const ejercicio5_div = document.getElementById('ejercicio5')

ejercicio1_div.hidden = true
ejercicio2_div.hidden = true
ejercicio3_div.hidden = true
ejercicio4_div.hidden = true
ejercicio5_div.hidden = true

const cb_ejercicios = document.getElementById('cb_ejercicios')

cb_ejercicios.onchange = function (e) {
    var option = cb_ejercicios.value;    
    console.log(option)
    if (option === '0') {
        ejercicio1_div.hidden = true
        ejercicio2_div.hidden = true
        ejercicio3_div.hidden = true
        ejercicio4_div.hidden = true
        ejercicio5_div.hidden = true
    }
    if (option === '1') {
        ejercicio1_div.hidden = false
        ejercicio2_div.hidden = true
        ejercicio3_div.hidden = true
        ejercicio4_div.hidden = true
        ejercicio5_div.hidden = true
        do{
            var person = prompt("Please enter your name");
        }while(person =='');
        document.getElementById('name-e1').value = person;
        socket.emit('nuevo_usuario', {name: person, id:socket.id}, data => {
        //socket.emit('nuevo_usuario', person, data => {
            if (!data) {
                console.log('entro aqui')
                alert('El usuario ya existe')
            }
        });
    }

    if (option === '2') {
        console.log(option)
        ejercicio1_div.hidden = true
        ejercicio2_div.hidden = false
        ejercicio3_div.hidden = true
        ejercicio4_div.hidden = true
        ejercicio5_div.hidden = true
    }

    if (option === '3') {
        ejercicio1_div.hidden = true
        ejercicio2_div.hidden = true
        ejercicio3_div.hidden = false
        ejercicio4_div.hidden = true
        ejercicio5_div.hidden = true
    }
    if (option === '4') {
        ejercicio1_div.hidden = true
        ejercicio2_div.hidden = true
        ejercicio3_div.hidden = true
        ejercicio4_div.hidden = false
        ejercicio5_div.hidden = true
    }

    if (option === '5') {
        ejercicio1_div.hidden = true
        ejercicio2_div.hidden = true
        ejercicio3_div.hidden = true
        ejercicio4_div.hidden = true
        ejercicio5_div.hidden = false
    }
    if (option === '6') {
        ejercicio1_div.hidden = true
        ejercicio2_div.hidden = true
        ejercicio3_div.hidden = true
        ejercicio4_div.hidden = true
        ejercicio5_div.hidden = true
    }
}

