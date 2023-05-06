document.addEventListener("DOMContentLoaded", agregarBloque);

const button = document.getElementById('myButton');
const buttonRespuesta = document.getElementById('Button-respuesta');
const removeButton = document.getElementById('removeButton');
const removerRespuesta = document.getElementById('ButtonRemoverRespuesta');
const container = document.getElementById('capsula');
const contenedorPR = document.querySelector('.contenedor_P-R');
const botonEnviar = document.getElementById('enviar');
const botonCopiar = document.getElementById('copiar');
const botones = document.querySelector('.botones');

// un addEventListener con scroll para menu fijo
window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        botones.classList.add('active');
    } else {
        botones.classList.remove('active');
    }
});



function agregarBloque() {
    const nuevoContenedor = document.createElement("div");
    nuevoContenedor.classList.add("contenedor_P-R");

    const contenedorRespuesta = document.createElement("div");
    contenedorRespuesta.classList.add("contenedor_preguntas");

    const labelPregunta = document.createElement("label");
    labelPregunta.setAttribute("for", "pregunta");
    labelPregunta.textContent = "Pregunta: ";

    const inputPregunta = document.createElement("textarea");
    inputPregunta.setAttribute("type", "text");
    inputPregunta.classList.add("pregunta");

    contenedorRespuesta.appendChild(labelPregunta);
    contenedorRespuesta.appendChild(inputPregunta);

    const contenedorPreguntas = document.createElement("div");
    contenedorPreguntas.classList.add("contenedor_respuestas");

    const labelRespuesta = document.createElement("label");
    labelRespuesta.setAttribute("for", "respuesta");
    labelRespuesta.textContent = "Respuesta 1: ";

    const inputRespuesta = document.createElement("textarea");
    inputRespuesta.setAttribute("type", "text");
    inputRespuesta.classList.add("respuesta");

    contenedorPreguntas.appendChild(labelRespuesta);
    contenedorPreguntas.appendChild(inputRespuesta);

    nuevoContenedor.appendChild(contenedorRespuesta);
    nuevoContenedor.appendChild(contenedorPreguntas);

    container.appendChild(nuevoContenedor);
}

function removerBloque() {
    const contenedores = container.querySelectorAll(".contenedor_P-R");
    if (contenedores.length > 0) {
        const ultimoContenedor = contenedores[contenedores.length - 1];
        container.removeChild(ultimoContenedor);
    }
}

// function agregarContenedorRespuesta() {

//     let contenedor_respuestas = document.querySelectorAll('.contenedor_respuestas');
//     const ultimoElemento = contenedor_respuestas[contenedor_respuestas.length - 1];

//     const respuestas = document.createElement("div");
//     respuestas.classList.add("respuestas");

//     const labelPregunta = document.createElement("label");
//     labelPregunta.setAttribute("for", "respuesta");
//     labelPregunta.textContent = "Respuesta: ";

//     const inputPregunta = document.createElement("textarea");
//     inputPregunta.setAttribute("type", "text");
//     inputPregunta.classList.add("respuesta");

//     respuestas.appendChild(labelPregunta);
//     respuestas.appendChild(inputPregunta);

//     ultimoElemento.appendChild(respuestas);


// }

function agregarContenedorRespuesta() {

    let contenedor_respuestas = document.querySelectorAll('.contenedor_respuestas');
    const ultimoElemento = contenedor_respuestas[contenedor_respuestas.length - 1];

    const respuestas = document.createElement("div");
    respuestas.classList.add("respuestas");

    const labelPregunta = document.createElement("label");
    labelPregunta.setAttribute("for", "respuesta");
    labelPregunta.textContent = "Respuesta " + (ultimoElemento.children.length) + ": ";

    const inputPregunta = document.createElement("textarea");
    inputPregunta.setAttribute("type", "text");
    inputPregunta.classList.add("respuesta");

    respuestas.appendChild(labelPregunta);
    respuestas.appendChild(inputPregunta);

    ultimoElemento.appendChild(respuestas);
}


function removerBloqueRespuesta() {
    let contenedor_respuestas = document.querySelectorAll(".contenedor_respuestas");

    if (contenedor_respuestas.length > 0) {
        const ultimoElemento = contenedor_respuestas[contenedor_respuestas.length - 1];
        let respuestas = ultimoElemento.querySelectorAll(".respuestas");
        if (respuestas.length > 0) {

            const ultimaRespuesta = respuestas[respuestas.length - 1];

            ultimoElemento.removeChild(ultimaRespuesta);
        }
    }

}

let enviado = false;

function enviar() {
    if (enviado) {
        // Si ya se envió una vez, elimina todo el contenido de faqContainer
        const faqContainer = document.querySelector(".faq-container");
        faqContainer.innerHTML = '';
        enviado = false;
    }

    const fragment = document.createDocumentFragment();
    const capsula = document.getElementById('capsula');
    const contenedores = capsula.querySelectorAll('.contenedor_P-R');

    // Crea un nuevo elemento FAQ para cada pregunta y sus respuestas
    for (let i = 0; i < contenedores.length; i++) {
        const pregunta = contenedores[i].querySelector('.pregunta').value;
        const respuestas = contenedores[i].querySelectorAll('.respuesta');
        const respuestasArray = [];

        for (let j = 0; j < respuestas.length; j++) {
            respuestasArray.push(respuestas[j].value);
        }

        let html = `<div class="faq-title">
      <div class="faq-title-text">
        <h2>` + pregunta + `</h2>
      </div>
      <div class="faq-title-arrow"><span class="mbi mbi-chevron-down"></span></div>
    </div>
    <div class="faq-content">`;
        for (let j = 0; j < respuestas.length; j++) {
            html += `<p>` + respuestasArray[j] + `</p>`;
        }
        html += `</div>`;

        const faqItem = document.createElement("div");
        faqItem.classList.add("faq-item")
        faqItem.innerHTML = html;

        fragment.appendChild(faqItem);
    }

    const faqContainer = document.querySelector(".faq-container");
    faqContainer.appendChild(fragment);

    // Actualiza el textarea con el contenido de la capsula
    const resultadoFinal = document.getElementById("resultados");
    const textarea = document.getElementById('resultado');
    textarea.innerHTML = resultadoFinal.outerHTML;

    enviado = true;
}

button.addEventListener('click', agregarBloque);
removeButton.addEventListener('click', removerBloque);
buttonRespuesta.addEventListener('click', agregarContenedorRespuesta);
removerRespuesta.addEventListener('click', removerBloqueRespuesta);
botonEnviar.addEventListener('click', enviar);
botonCopiar.addEventListener('click', copy);

document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        enviar();
    } else if (event.ctrlKey && event.key === 'c') {
        copy();
    }
});



