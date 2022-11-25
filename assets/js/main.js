// document.querySelector(document).ready(function () {
//     document.querySelector('.btn-next').addEventListener('click', function (e) {
//         e.preventDefault();
//         document.querySelector(this).parents('.test-step').fadeOut(500);
//         setTimeout(function () {
//             document.querySelector(this).parents('.test-step').nextElementSibling.classList.add("active");
//         }.bind(this), 800)

//     });

//     document.querySelector('.test-step label').addEventListener('click', function (e) {
//         setTimeout(function () {
//             document.querySelector(this).parents('.test-step').fadeOut(500);
//             setTimeout(function () {
//                 document.querySelector(this).parents('.test-step').nextElementSibling.classList.add("active");
//             }.bind(this), 800)
//         }.bind(this), 500)
//     });

//     document.querySelector('.test-step .prev-btn').addEventListener('click', function (e) {
//         e.preventDefault();
//         document.querySelector(this).parents('.test-step').previousElementSibling.classList.add('active');
//         document.querySelector(this).parents('.test-step').classList.remove('active');
//     });
// });

const btnNext = document.querySelectorAll('.btn-next');
const quizStep = document.querySelectorAll('.quiz-step');
const arrowBack = document.querySelector('.arrow-back-img');
const progressBarLine = document.querySelector('.progress-bar-line');
const progressPercentage = document.querySelector('.progress-percentage');
let index = 0;

btnNext.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        e.preventDefault();
        quizStep.item(index).classList.remove('active');
        quizStep.item(index+1).classList.add('active');
        arrowBack.style.opacity = '1';
        index++;
        progressBarLine.style.width = 100 / quizStep.length + '%';
        progressPercentage.innerText = Math.ceil(100 / quizStep.length) + '%';
    })
})