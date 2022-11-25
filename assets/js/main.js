const btnNext = document.querySelector('.btn-next');
const quizStep = document.querySelectorAll('.quiz-step');
const arrowBack = document.querySelector('.arrow-back-img');
const progressBarLine = document.querySelector('.progress-bar-line');
const progressPercentage = document.querySelector('.progress-percentage');
let index = 0;
let questionsPassed = 0;
let inputValidated = false;

if (1) {
    inputValidated = true;
}

const questionSwitch = () => {
    if (questionsPassed+1 < quizStep.length) {
        quizStep.item(index).classList.remove('active');
        quizStep.item(index+1).classList.add('active');
        arrowBack.style.opacity = '1';
        index++;
        questionsPassed++;
        console.log(questionsPassed);
        progressBarLine.style.width = 100 / quizStep.length * questionsPassed + '%';
        progressPercentage.innerText = Math.ceil(100 / quizStep.length * questionsPassed) + '%';

    } else {
        return false;
    }
}

const questionBack = () => {
    quizStep.item(index).classList.remove('active');
    quizStep.item(index-1).classList.add('active');
    index--;
    questionsPassed--;
    progressBarLine.style.width = 100 / quizStep.length * questionsPassed + '%';
    progressPercentage.innerText = Math.ceil(100 / quizStep.length * questionsPassed) + '%';
}

btnNext.addEventListener('click', (e) => {
    e.preventDefault();
    questionSwitch();
})

arrowBack.addEventListener('click', (e) => {
    e.preventDefault();
    questionBack();
})