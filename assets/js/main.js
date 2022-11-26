const btnNext = document.querySelector('.btn-next');
const quizStep = document.querySelectorAll('.quiz-step');
const arrowBack = document.querySelector('.arrow-back-img');
const progressBarLine = document.querySelector('.progress-bar-line');
const progressPercentage = document.querySelector('.progress-percentage');

document.querySelector('.question-number').innerText = '1.';

let index = 0;
let questionsPassed = 0;
let inputValidated = false;

let inputText = document.querySelector('.form-control.text');

inputText.addEventListener('input', () => {
    console.log(inputText.value);
    if (inputText.value.trim().length > 1) {
        inputValidated = true;
        inputText.classList.add('valid');
        btnNext.style.opacity = '1';
        btnNext.removeAttribute('disabled');
    } else {
        inputValidated = false;
        inputText.classList.remove('valid');
        btnNext.style.opacity = '0.5';
        btnNext.setAttribute("disabled", "");
    }
});

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
        document.querySelectorAll('.question-number').forEach((elem) => {
            elem.innerText = `${questionsPassed + 1}.`;
        });
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
    document.querySelectorAll('.question-number').forEach((elem) => {
        elem.innerText = `${questionsPassed + 1}.`;
    });
}

btnNext.addEventListener('click', (e) => {
    e.preventDefault();
    questionSwitch();
})

document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      questionSwitch();
      dataGetting();
    }
});

arrowBack.addEventListener('click', (e) => {
    e.preventDefault();
    questionBack();
});
