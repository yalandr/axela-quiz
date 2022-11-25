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

let btnNext = document.querySelectorAll('.btn-next');
let quizStep = document.querySelectorAll('.quiz-step');

// btnNext.addEventListener('click', (e) => {
//     e.preventDefault();
//     console.log(quizStep);
// })
console.log(quizStep);