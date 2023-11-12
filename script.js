const ticket = 200;
const descEstudiante = 0.80;
const descTrainee = 0.50;
const descJunior = 0.15;

const cantidad = document.getElementById('cantidad');
const categoria = document.getElementById('categoria');
const totalPagar = document.getElementById('totalAPagar');
const btnResumen = document.getElementById('resumen');
const btnReset = document.getElementById('borrar');
const inputList = document.querySelectorAll('input');

const esNumero = (numero) => {
  return Number.isInteger(numero);
}

const esCorreo = (correo) => {
  return String(correo)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

const errorInput = (formError) => {
  alert(`${formError}`);
}

function calcularPago() {
    let total = cantidad.value * ticket;

    switch (categoria.value) {
        case "estudiante":
            total = total - (total * descEstudiante);
            break;
        case "trainee":
            total = total - (total * descTrainee);
            break;
        case "junior":
            total = total - (total * descJunior);
            break;
    }

    totalPagar.textContent = `Total a Pagar: $ ${total}`;
}

btnResumen.addEventListener('click', (e) => {
    e.preventDefault();
    let textError = '';
    inputList.forEach(element => {
      if(element.value === '') {
        textError === ''? textError = element.name+' no puede estar vacio' :
        textError += ('\n'+element.name+' no puede estar vacio');
        element.classList.add('errorInput');
      }
      else if(element.id === 'correo' && !esCorreo(element.value)) {
        textError === ''? textError = 'El correo no es valido' : textError += ('\nEl correo no es valido');
        element.classList.add('errorInput');
      }
      else if(element.id === 'cantidad' && !esNumero(Number.parseInt(element.value))) {
        textError === ''? textError = 'La cantidad no es valida' : textError += '\nLa cantidad debe ser un numero';
        element.classList.add('errorInput');
      }
    });
    if(textError !== '') {
      errorInput(textError);
      // btnReset.click();
      return;
    }
    calcularPago();
});

btnReset.addEventListener('click', (e) => {
    totalPagar.textContent = `Total a Pagar: $`;
})