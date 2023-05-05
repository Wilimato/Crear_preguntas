const button = document.getElementById('myButton');
const buttonRespuesta = document.getElementById('Button-respuesta');
const removeButton = document.getElementById('removeButton');
const removerRespuesta = document.getElementById('ButtonRemoverRespuesta');
const container = document.getElementById('capsula');
const contenedorPR = document.querySelector('.contenedor_P-R');
const botonEnviar = document.getElementById('enviar');
const botonCopiar = document.getElementById('copiar');


function agregarBloque() {
    const nuevoContenedor = document.createElement("div");
    nuevoContenedor.classList.add("contenedor_P-R");

    const contenedorRespuesta = document.createElement("div");
    contenedorRespuesta.classList.add("contenedor_preguntas");

    const labelPregunta = document.createElement("label");
    labelPregunta.setAttribute("for", "pregunta");
    labelPregunta.textContent = "Pregunta: ";

    const inputPregunta = document.createElement("input");
    inputPregunta.setAttribute("type", "text");
    inputPregunta.classList.add("pregunta");

    contenedorRespuesta.appendChild(labelPregunta);
    contenedorRespuesta.appendChild(inputPregunta);

    const contenedorPreguntas = document.createElement("div");
    contenedorPreguntas.classList.add("contenedor_respuestas");

    const labelRespuesta = document.createElement("label");
    labelRespuesta.setAttribute("for", "respuesta");
    labelRespuesta.textContent = "Respuesta: ";

    const inputRespuesta = document.createElement("input");
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

function agregarContenedorRespuesta() {

    let contenedor_respuestas = document.querySelectorAll('.contenedor_respuestas');
    const ultimoElemento = contenedor_respuestas[contenedor_respuestas.length - 1];

    const respuestas = document.createElement("div");
    respuestas.classList.add("respuestas");

    const labelPregunta = document.createElement("label");
    labelPregunta.setAttribute("for", "respuesta");
    labelPregunta.textContent = "Respuesta: ";

    const inputPregunta = document.createElement("input");
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



// function enviar() {
//     const fragment = document.createDocumentFragment();
//     const capsula = document.getElementById('capsula');
//     const contenedores = capsula.querySelectorAll('.contenedor_P-R');

//     for (let i = 0; i < contenedores.length; i++) {
//         const pregunta = contenedores[i].querySelector('.pregunta').value;
//         const respuestas = contenedores[i].querySelectorAll('.respuesta');
//         const respuestasArray = [];

//         for (let j = 0; j < respuestas.length; j++) {
//             respuestasArray.push(respuestas[j].value);


//         }
//         let html = `<div class="faq-title">
//                 <div class="faq-title-text">
//                     <h2>` + pregunta + `</h2>
//                     </div>
//                     <div class="faq-title-arrow"><span class="mbi mbi-chevron-down"></span></div>
//                 </div>`;
//         html += `<div class="faq-content">
//         <ul>`
//         for (let j = 0; j < respuestas.length; j++) {
//             html += `<li>` + respuestasArray[j] + `</li>`;
//         }

//         html += `</ul>
//         </div>`;

//         console.log(typeof (html))

//         const faqItem = document.querySelector(".faq-item")

//         faqItem.innerHTML = html;
//     }
//     let resultadoFinal = document.getElementById("resultados")

//     const textarea = document.getElementById('resultado');

//     textarea.innerHTML = resultadoFinal.outerHTML;
// }

function enviar() {
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

        const faqContainer = document.querySelector(".faq-container");
        // Agrega el nuevo elemento FAQ a la capsula
        faqContainer.appendChild(faqItem);
    }

    // Actualiza el textarea con el contenido de la capsula
    const resultadoFinal = document.getElementById("resultados");
    const textarea = document.getElementById('resultado');
    textarea.innerHTML = resultadoFinal.outerHTML;
}


//Copiar resultado
function copy() {
    document.getElementById("resultado").focus();
    document.execCommand("selectAll");
    document.execCommand("copy");
    mensaje.classList.add("activo");
    setTimeout(() => mensaje.classList.remove("activo"), 4000);
}

button.addEventListener('click', agregarBloque);
removeButton.addEventListener('click', removerBloque);
buttonRespuesta.addEventListener('click', agregarContenedorRespuesta);
removerRespuesta.addEventListener('click', removerBloqueRespuesta);
botonEnviar.addEventListener('click', enviar);
botonCopiar.addEventListener('click', copy);
