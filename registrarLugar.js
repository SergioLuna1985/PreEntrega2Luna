alert(MESSAGE.BIENVENIDO);

const confirma = confirm(MESSAGE.PELICULA);

if (confirma != true) {

  alert(MESSAGE.NOQUIERERESERVAR);

} else {

  let instruccion;

  const mapa = iniciar();

  do {

    if (!hayDisponibilidad(mapa)) break;

    mostrar(mapa);

    const rta = confirm(MESSAGE.MAPA);

    if (rta) {

      const eleccion = prompt(MESSAGE.ASIENTO);

      if (validarEleccion(eleccion)) {

        reservarAsiento(eleccion, mapa);
      }
    }

    instruccion = confirm(MESSAGE.CONTINUAR);

  } while (instruccion !== false);

  mostrar(mapa);
  const ticket = realizarTicket(mapa);

  alert(ticket);

  alert(MESSAGE.SALUDOS);

}


