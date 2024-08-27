const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

const questions = [
    {
        question: 'Qual é a unidade de medida da corrente elétrica?',
        answers: [
            { text: 'Ohm', correct: false },
            { text: 'Ampère', correct: true },
            { text: 'Volt', correct: false },
            { text: 'Watt', correct: false }
        ]
    },
    {
        question: 'O que é um transformador?',
        answers: [
            { text: 'Um dispositivo que converte energia mecânica em elétrica', correct: false },
            { text: 'Um dispositivo que armazena energia', correct: false },
            { text: 'Um dispositivo que transforma a tensão da corrente elétrica', correct: true },
            { text: 'Um tipo de motor elétrico', correct: false }
        ]
    },
    {
        question: 'O que é resistência elétrica?',
        answers: [
            { text: 'A capacidade de um material em armazenar energia', correct: false },
            { text: 'A oposição à passagem da corrente elétrica', correct: true },
            { text: 'A quantidade de energia que um componente consome', correct: false },
            { text: 'O fluxo de elétrons em um condutor', correct: false }
        ]
    }
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Reiniciar';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
