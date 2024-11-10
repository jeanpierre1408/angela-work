
const quizzes = {
    option1: [
        {
            question: "¿De qué trata el texto?",
            answers: ["La energía solar", "El reciclaje y su importancia", "La fotografía digital"],
            correct: 1
        },
        {
            question: "¿Qué materiales se mencionan como reciclables?",
            answers: ["Madera y papel", "Papel, plástico, vidrio y metal", "Textiles y vidrio"],
            correct: 1
        },
        {
            question: "¿Cuál es uno de los beneficios del reciclaje según el texto?",
            answers: ["Aumenta la contaminación", "Ayuda a ahorrar energía", "Incrementa la cantidad de residuos en los vertederos"],
            correct: 1
        },
        {
            question: "¿Cómo contribuye el reciclaje a la conservación de los recursos naturales?",
            answers: ["Aumentando la extracción de recursos", "Disminuyendo la necesidad de extraer nuevos recursos", "No tiene ningún impacto"],
            correct: 1
        },
        {
            question: "¿Qué efecto tiene el reciclaje en las comunidades?",
            answers: ["Promueve la educación ambiental y la conciencia", "Ayuda a ahorrar energía", "Reduce la contaminación del aire"],
            correct: 0  
        }
    ],
    option2: [
        {
            question: "¿De qué trata el texto?",
            answers: ["La energía eólica y sus beneficios", "La conservación del agua", "La importancia del reciclaje"],
            correct: 0
        },
        {
            question: "¿Qué utilizan los aerogeneradores para generar electricidad?",
            answers: ["Luz solar", "Fuerza del viento", "Energía térmica"],
            correct: 1
        },
        {
            question: "¿Qué tipo de energía produce la energía eólica?",
            answers: ["Energía contaminante", "Energía limpia", "Energía química"],
            correct: 1
        },
        {
            question: "¿Qué impacto tiene la energía eólica en comparación con las fuentes tradicionales de energía?",
            answers: ["Aumenta la contaminación", "Tiene un impacto ambiental reducido", "Es más costosa y menos eficiente"],
            correct: 1
        },
        {
            question: "¿Por qué se considera la energía eólica una fuente inagotable?",
            answers: ["Porque se puede almacenar fácilmente", "Porque el viento es un recurso natural que no se agota", "Porque produce energía continuamente sin necesidad de mantenimiento"],
            correct: 1
        }
    ],
    option3: [
        {
            question: "¿Cuál es la idea principal del texto?",
            answers: ["Una vida sin sentido no vale la pena de ser vivida.", "El asumir la tarea del pensar trae la posibilidad de crear un sentido a la vida.", "La reflexión mejora las respuestas que aún no tenemos.", "El mal es el resultado de la capacidad de pensar del ser humano.", "El pensar evita que nos engañen y aceptemos reglas sin reflexión."],
            correct: 1
        },
    ]
};

let currentOption = '';
let currentQuizIndex = 0;

// Eventos para los botones de opciones
document.getElementById('option1-button').addEventListener('click', () => {
    currentOption = 'option1';
    showOptionScreen('option1');
});

document.getElementById('option2-button').addEventListener('click', () => {
    currentOption = 'option2';
    showOptionScreen('option2');
});

document.getElementById('option3-button').addEventListener('click', () => {
    currentOption = 'option3';
    showOptionScreen('option3');
});

// Eventos para los botones de continuar
document.getElementById('continue-option1-button').addEventListener('click', () => {
    startQuiz('option1');
});

document.getElementById('continue-option2-button').addEventListener('click', () => {
    startQuiz('option2');
});

document.getElementById('continue-option3-button').addEventListener('click', () => {
    startQuiz('option3');
});

// Función para mostrar la pantalla de opción
function showOptionScreen(option) {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById(`${option}-screen`).classList.remove('hidden');
    document.body.style.backgroundColor = 'white';
}

// Función para iniciar el quiz
function startQuiz(option) {
    currentOption = option;
    currentQuizIndex = 0;
    document.getElementById(`${option}-screen`).classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.body.style.backgroundColor = 'white';
    showQuiz();
}

// Mostrar pregunta del quiz
function showQuiz() {
    const quiz = quizzes[currentOption][currentQuizIndex];
    document.getElementById('quiz-question').innerText = quiz.question;
    const answersDiv = document.getElementById('quiz-answers');
    answersDiv.innerHTML = ''; // Limpiar respuestas anteriores
    
    quiz.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.addEventListener('click', () => checkAnswer(index));
        answersDiv.appendChild(button);
    });
    
    document.getElementById('next-button').classList.add('hidden');
}

function checkAnswer(selectedIndex) {
    const quiz = quizzes[currentOption][currentQuizIndex];
    const answerButtons = document.querySelectorAll('#quiz-answers button');
    
    // Desactivar todos los botones después de seleccionar
    answerButtons.forEach(button => {
        button.disabled = true;
    });

    // Resaltar botón seleccionado
    answerButtons[selectedIndex].classList.add(
        selectedIndex === quiz.correct ? 'selected-correct' : 'selected-incorrect'
    );

    if (selectedIndex === quiz.correct) {
        document.body.classList.add('correct-answer');
        document.getElementById('correct-sound').play();
    } else {
        document.body.classList.add('incorrect-answer');
        document.getElementById('incorrect-sound').play();
        
        // Resaltar la respuesta correcta
        answerButtons[quiz.correct].classList.add('selected-correct');
    }
    
    document.getElementById('next-button').classList.remove('hidden');
}

// Modificar el evento del botón siguiente para limpiar las clases
document.getElementById('next-button').addEventListener('click', () => {
    document.body.classList.remove('correct-answer', 'incorrect-answer');
    
    const answerButtons = document.querySelectorAll('#quiz-answers button');
    answerButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove('selected-correct', 'selected-incorrect');
    });
    
    currentQuizIndex++;
    if (currentQuizIndex < quizzes[currentOption].length) {
        showQuiz();
    } else {
        showCongratulations();
    }
});

// Botón siguiente
document.getElementById('next-button').addEventListener('click', () => {
    document.body.style.backgroundColor = '#F5F5F5'; // Gris muy claro, menos blanco
    
    currentQuizIndex++;
    if (currentQuizIndex < quizzes[currentOption].length) {
        showQuiz();
    } else {
        showCongratulations();
    }
});

// Otros lugares donde se establece el fondo
function showOptionScreen(option) {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById(`${option}-screen`).classList.remove('hidden');
    document.body.style.backgroundColor = '#F5F5F5'; // Gris muy claro
}

function startQuiz(option) {
    currentOption = option;
    currentQuizIndex = 0;
    document.getElementById(`${option}-screen`).classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.body.style.backgroundColor = '#F5F5F5'; // Gris muy claro
    showQuiz();
}

function showCongratulations() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('congratulations-screen').classList.remove('hidden');
    document.body.style.backgroundColor = '#F5F5F5'; // Gris muy claro
}

document.getElementById('back-to-menu-button').addEventListener('click', () => {
    document.getElementById('congratulations-screen').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
    document.body.style.backgroundColor = '#F5F5F5'; // Gris muy claro
});