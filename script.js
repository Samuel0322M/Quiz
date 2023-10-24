const questions = [
    {
        question: "¿Cuál es el planeta más grande del sistema solar?",
        answers: [
            {text: "Marte", correct: false},
            {text: "Venus", correct: false},
            {text: "Júpiter", correct: true},
            {text: "Saturno", correct: false},
        ]
    },
    {
        question: "¿Cuál es el río más largo del mundo?",
        answers: [
            {text: "Rio Amazonas", correct: false},
            {text: "Rio Nilo", correct: true},
            {text: "Rio Misisipi", correct: false},
            {text: "Rio Yangtsé", correct: false},
        ]
    },
    {
        question: "¿En qué año se firmó la Declaración de Independencia de los Estados Unidos?",
        answers: [
            {text: "1620", correct: false},
            {text: "1776", correct: true},
            {text: "1865", correct: false},
            {text: "1492", correct: false},
        ]
    },
    {
        question: "¿Cuál es el elemento químico más abundante en la Tierra?",
        answers: [
            {text: "Oxígeno", correct: false},
            {text: "Hidrógeno", correct: true},
            {text: "Hierro", correct: false},
            {text: "Carbono", correct: false},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionindex = 0;
let score = 0;

function startQuiz(){
    currentQuestionindex = 0;
    score= 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionindex];
    let questionNo = currentQuestionindex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
}
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true"
    if (isCorrect){
        selectBtn.classList.add("correct")
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled =  true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    if(score === questions.length){
        questionElement.innerHTML =`Puntuaste ${score} de ${questions.length} ¡tienes una puntuacion perfecta tomale captura y tienes un cupo para que el dueño de este quiz te invite para un helado!`;
        }else{
            questionElement.innerHTML = `Mejor suerte para la proxima`;
        }
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionindex++;
    if(currentQuestionindex < questions.length){
    showQuestion();
    }else{
        showScore();
    }
};

nextButton.addEventListener("click", ()=>{
    if(currentQuestionindex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz(); 