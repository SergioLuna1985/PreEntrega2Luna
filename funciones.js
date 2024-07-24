const MESSAGE = {
    BIENVENIDO: "Bienvenido al gestor de asientos del cine CoderMovie",
    PELICULA: "¿Desea reservar un lugar para la película?",
    NOQUIERERESERVAR: "Nos veremos en otro momento. Saludos!!!",
    MAPA: "Por favor mirá el mapa de lugares presente en la CONSOLA. ¿Te gusta algún lugar y quiéres reservarlo?",
    ASIENTO: "¿Qué lugar te gustaría reservar?, debes ingresar el asiento. Por ejemplo: ASIENTO 6",
    ERRORINGRESO: "Debe ingresar solo texto, no puede ingresar números o caracteres especiales",
    CONTINUAR: "Desea continuar reservando?. Para continual toque 'Aceptar', para salir toque 'cancelar'",
    SALUDOS: "Muchas gracias por haber utilizado nuestros servicios."
  
};
  
function realizarTicket(mapa) {

const ticket = mapa.filter(el=>el.estado==false);

const fecha = new Date().toLocaleString();

let mensaje = "Se ha generado su reserva con exito.\n\nTICKET:\n\nfecha: "+fecha+"\n\n";

ticket.forEach(el => {
    mensaje += "Nombre: "+el.nombre+" "+el.apellido+"\nAsiento: "+el.asiento+" - "+"Fila: "+el.fila+" - "+"Columna: "+el.columna+" Costo: $"+el.precio+"\n\n";
});

mensaje += "COSTO TOTAL: $"+precioFinal(mapa);

return mensaje;
}

function lugaresDisponibles(mapa) {
return mapa.filter( el => el.estado == true).length;
}

function precioFinal(mapa) {

const valorInicial = 0;

const precioFinal = mapa.reduce(

    (acc, el) => { 

        let resultado= acc;

        if (el.estado==false) {
            resultado = acc + el.precio
        }

        return resultado;
        
    }, valorInicial
);

return precioFinal;
}

function hayDisponibilidad(mapa) {

return mapa.some(el=>el.estado == true);

}

function mostrar(mapa) {

console.clear();

const disposicion = {};

disposicion.Fila_1 = new Fila(
    mapa.slice(0, 10).map((el) => {
    return el.estado ? `${el.asiento} 🟢 💲${el.precio}` : `${el.asiento} 🔴`;
    })
);
disposicion.Fila_2 = new Fila(
    mapa.slice(10, 20).map((el) => {
    return el.estado ? `${el.asiento} 🟢 💲${el.precio}` : `${el.asiento} 🔴`;
    })
);
disposicion.Fila_3 = new Fila(
    mapa.slice(20, 30).map((el) => {
    return el.estado ? `${el.asiento} 🟢 💲${el.precio}` : `${el.asiento} 🔴`;
    })
);
disposicion.Fila_4 = new Fila(
    mapa.slice(30, 40).map((el) => {
    return el.estado ? `${el.asiento} 🟢 💲${el.precio}` : `${el.asiento} 🔴`;
    })
);
disposicion.Fila_5 = new Fila(
    mapa.slice(40, 50).map((el) => {
    return el.estado ? `${el.asiento} 🟢 💲${el.precio}` : `${el.asiento} 🔴`;
    })
);



const cantLugaresDisponibles = lugaresDisponibles(mapa);
const pFinal = precioFinal(mapa);

console.log("%c ⬆️!!!!!¡¡¡¡¡EN ESTA DIRECCIÓN ESTARÁ LA PANTALLA DEL CINE¡¡¡¡¡!!!!!⬆️", "background: blue; color: yellow");
console.table(disposicion);
console.log("Lugares disponibles: ", cantLugaresDisponibles);
console.log("Lugares reservados: ", (50 - cantLugaresDisponibles))
console.log("Total: 💲",pFinal)
}

function validarEleccion(eleccion) {

const re = new RegExp("[1-90-9]");

if (re.exec(eleccion.trim()) && parseInt(eleccion) <= 50) {

    return true;

} else {

    alert("Hubo un error al ingresar los datos.\n Debes ingresar el asiento. Por ejemplo: 6\n Por favor no exceder de 50 asientos");
}
}

function validarNombreYApellido(nombre, apellido) {

    const re = new RegExp("[a-zA-Z]+");
    let isCorrec = false;

    if (re.exec(nombre) && re.exec(apellido)) {

        isCorrec = true;

    }

    return isCorrec;

}

function reservarAsiento(eleccion, mapa) {

    if (mapa[eleccion - 1].estado == true) {

        let nombre = "";
        let apellido = "";
        let flag = false;

        do {

            nombre = prompt("Ingrese su nombre");
            apellido = prompt("Ingrese su apellido");

            let rta = validarNombreYApellido(nombre, apellido);

            if (rta) {
                flag = false;
            }else{
                flag = true;
                alert(MESSAGE.ERRORINGRESO)
            }

        } while (flag);

        mapa[eleccion - 1].estado = false;
        mapa[eleccion - 1].nombre = nombre;
        mapa[eleccion - 1].apellido = apellido;

    } else {
        alert("El lugar seleccionado no está disponible");
    }
}

function iniciar() {

const array = new Array(50).fill(0);

let columna = 1;

const asientos = array.map((_, i) => {

    const asiento = i + 1;
    let precio = 0;

    let fila = 1;

    if (i < 10) {
    precio = 3000;
    }
    if (i > 9) {
    fila = 2;
    precio = 4000;
    }
    if (i > 19) {
    fila = 3;
    precio = 5000;
    }
    if (i > 29) {
    fila = 4;
    precio = 4000;
    }
    if (i > 39) {
    fila = 5;
    precio = 3000;
    }

    if (i == 10) {
    columna = 1;
    }
    if (i == 20) {
    columna = 1;
    }
    if (i == 30) {
    columna = 1;
    }
    if (i == 40) {
    columna = 1;
    }

    return new Asiento(true, asiento, fila, columna++, precio);
});

return asientos;
}
  