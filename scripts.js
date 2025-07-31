const cursos = {
  "Ciclo 1": [
    { id: "historia", nombre: "Temas de Historia del Perú" },
    { id: "ingles1", nombre: "Inglés TI 1" },
    { id: "lengua1", nombre: "Lengua 1" },
    { id: "gramesp1", nombre: "Gramática del Español 1" },
    { id: "liderazgo", nombre: "Taller de Liderazgo Personal" }
  ],
  "Ciclo 2": [
    { id: "ingles2", nombre: "Inglés TI 2", requisitos: ["ingles1"] },
    { id: "gramesp2", nombre: "Gramática del Español 2", requisitos: ["gramesp1"] },
    { id: "lengua2", nombre: "Lengua 2", requisitos: ["lengua1"] },
    { id: "interpersonales", nombre: "Taller de Relaciones Interpersonales", requisitos: ["liderazgo"] },
    { id: "lenguaC1", nombre: "Lengua C1" }
  ],
  "Ciclo 3": [
    { id: "contexto", nombre: "Contexto y Sentido en la Comunicación", requisitos: ["gramesp2", "lengua2"] },
    { id: "entornos", nombre: "Entornos Globales", requisitos: ["historia"] },
    { id: "ingles3", nombre: "Inglés TI 3", requisitos: ["ingles2"] },
    { id: "graming", nombre: "Gramática del Inglés", requisitos: ["ingles2"] },
    { id: "lenguaC2", nombre: "Lengua C2", requisitos: ["lenguaC1"] }
  ],
  "Ciclo 4": [
    { id: "ingles4", nombre: "Inglés TI 4", requisitos: ["ingles3"] },
    { id: "analisis", nombre: "Análisis Textual para la Traducción", requisitos: ["contexto"] },
    { id: "iniciacion", nombre: "Iniciación a la Traducción", requisitos: ["ingles3", "graming"] },
    { id: "lenguaC3", nombre: "Lengua C3", requisitos: ["lenguaC2"] },
    { id: "gramC", nombre: "Gramática de Lengua C" }
  ],
  "Ciclo 5": [
    { id: "ingles5", nombre: "Inglés TI 5", requisitos: ["ingles4"] },
    { id: "tradIng1", nombre: "Traducción Directa del Inglés 1", requisitos: ["ingles4", "iniciacion"] },
    { id: "estilistica", nombre: "Estilística Contrastiva", requisitos: ["analisis"] },
    { id: "lenguaC4", nombre: "Lengua C4", requisitos: ["lenguaC3"] },
    { id: "antro", nombre: "Antropología Cultural", requisitos: ["entornos"] }
  ],
  "Ciclo 6": [
    { id: "culturaIng", nombre: "Lengua y Cultura Inglesa", requisitos: ["ingles5", "antro"] },
    { id: "tradIng2", nombre: "Traducción Directa del Inglés 2", requisitos: ["tradIng1"] },
    { id: "writing", nombre: "Writing Techniques For Translators", requisitos: ["ingles5", "tradIng1"] },
    { id: "lenguaC5", nombre: "Lengua C5", requisitos: ["lenguaC4"] },
    { id: "tradC1", nombre: "Traducción Directa Lengua C1", requisitos: ["iniciacion", "lenguaC4"] },
    { id: "interpretacion", nombre: "Introducción a la Interpretación", requisitos: ["ingles5", "tradIng1"] }
  ],
  "Ciclo 7": [
    { id: "sp2en1", nombre: "Spanish-To-English Translation 1", requisitos: ["writing"] },
    { id: "traductologia", nombre: "Introducción a la Traductología", requisitos: ["analisis"] },
    { id: "esp", nombre: "Iniciación a la Traducción Especializada", requisitos: ["tradIng2"] },
    { id: "culturaC", nombre: "Lengua y Cultura Lengua C", requisitos: ["lenguaC5", "antro"] },
    { id: "tradC2", nombre: "Traducción Directa Lengua C2", requisitos: ["tradC1"] }
  ],
  "Ciclo 8": [
    { id: "intercultural", nombre: "Comunicación Intercultural", requisitos: ["antro"] },
    { id: "soft1", nombre: "Software Especializado 1", requisitos: ["tradIng1"] },
    { id: "metodologia", nombre: "Metodología de la Investigación", requisitos: ["traductologia"] },
    { id: "esp1", nombre: "Traducción Especializada 1", requisitos: ["esp"] },
    { id: "sp2en2", nombre: "Spanish-To-English Translation 2", requisitos: ["sp2en1"] }
  ],
  "Ciclo 9": [
    { id: "soft2", nombre: "Software Especializado 2", requisitos: ["soft1"] },
    { id: "tesis1", nombre: "Seminario de Tesis 1", requisitos: ["metodologia"] },
    { id: "esp2", nombre: "Traducción Especializada 2", requisitos: ["esp1"] },
    { id: "sp2en3", nombre: "Spanish-To-English Translation 3", requisitos: ["sp2en2"] }
  ],
  "Ciclo 10": [
    { id: "etica", nombre: "Ética Profesional" },
    { id: "tesis2", nombre: "Curso de Trabajo de Investigación - Seminario de Tesis 2", requisitos: ["tesis1"] },
    { id: "esp3", nombre: "Traducción Especializada 3", requisitos: ["esp2"] },
    { id: "revision", nombre: "Revisión y Posedición", requisitos: ["esp"] }
  ]
};

let estado = JSON.parse(localStorage.getItem("estadoCursos") || "{}");

function guardarEstado() {
  localStorage.setItem("estadoCursos", JSON.stringify(estado));
}

function estaAprobado(id) {
  return estado[id] === true;
}

function requisitosCumplidos(requisitos = []) {
  return requisitos.every(id => estaAprobado(id));
}

function buscarNombreCurso(id) {
  for (const ciclo in cursos) {
    for (const curso of cursos[ciclo]) {
      if (curso.id === id) return curso.nombre;
    }
  }
  return id;
}

function renderMalla() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  for (const ciclo in cursos) {
    const columna = document.createElement("div");
    columna.className = "semestre";
    const titulo = document.createElement("h3");
    titulo.textContent = ciclo;
    columna.appendChild(titulo);

    cursos[ciclo].forEach(curso => {
      const div = document.createElement("div");
      div.classList.add("curso");
      div.textContent = curso.nombre;

      if (estaAprobado(curso.id)) {
        div.classList.add("aprobado");
      } else if (!requisitosCumplidos(curso.requisitos)) {
        div.classList.add("bloqueado");
        const faltan = curso.requisitos?.filter(r => !estaAprobado(r))
          .map(r => buscarNombreCurso(r)).join(", ");
        div.dataset.tooltip = faltan ? `Falta: ${faltan}` : "";
      } else {
        div.classList.add("disponible");
      }

      div.addEventListener("click", () => {
        if (div.classList.contains("bloqueado")) return;
        estado[curso.id] = !estaAprobado(curso.id);
        guardarEstado();
        renderMalla();
      });

      columna.appendChild(div);
    });

    malla.appendChild(columna);
  }
}

renderMalla();
