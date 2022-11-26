// VARIABLES ============================================================
const btnNext = document.querySelector('.btn-next');
const quizStep = document.querySelectorAll('.quiz-step');
const arrowBack = document.querySelector('.arrow-back-img');
const progressBarLine = document.querySelector('.progress-bar-line');
const progressPercentage = document.querySelector('.progress-percentage');
const additionInput = document.querySelector('.addition-input-wrapper');

document.querySelector('.question-number').innerText = '1.';

let index = 0;
let questionsPassed = 0;
let isInputValidated = false;

// FUNCTIONS ============================================================

// BUTTON ABILITY
const btnAble = () => {
    btnNext.style.opacity = '1';
    btnNext.removeAttribute('disabled');
}

// BUTTON DISABILITY
const btnDisable = () => {
    btnNext.style.opacity = '0.5';
    btnNext.setAttribute("disabled", "");
}

// TEXT INPUT VALIDATION
let inputText = document.querySelectorAll('.form-control.text');

inputText.forEach((el) => {
    el.addEventListener('input', () => {
        if (el.value.trim().length > 0 && el.value.trim() !== ' ') {
            isInputValidated = true;
            el.classList.add('valid');
            btnAble();
        } else {
            isInputValidated = false;
            el.classList.remove('valid');
            btnDisable();
        }
    });
});

// INPUT RADIO
let inputRadio = document.querySelectorAll('.form-control.radio');

inputRadio.forEach((el) => {
    el.addEventListener('change', () => {
        console.log(el.value);
        additionInput.style.display = "block";
    })
})

// INPUT CHECKBOX
let inputCheckbox = document.querySelectorAll('.form-control.checkbox');

inputCheckbox.forEach((el) => {
    el.addEventListener('change', () => {
        if (el.checked) {
            btnAble();
            isInputValidated = true;
        } else {
            btnDisable();
            isInputValidated = false;
        }
    })
})

// ADVERTISERS ADDING
const inputAdvertiser = document.querySelector('.form-control.text.advertiser');
const addedItemsList = document.querySelector('.added-items-list');
const addBtn = document.querySelector('.add-btn');

const addAdvertiserItem = (advertiserName) => {
    let advertiserItem  = ` 
        <div class="added-list-item">
            ${advertiserName}
        </div>
        ` 
    addedItemsList.innerHTML += advertiserItem;
}

addBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    let advertiserName = inputAdvertiser.value;
    advertiserName = advertiserName.trim();
    if (advertiserName == '') {
        return false;
    } else {
        addAdvertiserItem(advertiserName);
        inputAdvertiser.value = '';
        isInputValidated = true;
    }
})

// DATA RECORDING
let mainForm = document.querySelector('#mainForm');
let quizArray = [];
let quizObj = {};

mainForm.onchange = (event) => {
    let question = event.target.name;
    let answer = event.target.value;
    let objectItem = `${question} - ${answer}`;
    quizArray.push(objectItem);
    quizObj = quizArray.reduce((acc, cur, i) => {
        i =  `${i + 1}`;
        acc[i] = cur;
        return acc;
    }, {});

    console.table(quizObj);
    sessionStorage.setItem('quiz', JSON.stringify(quizObj));
    // newInput.value = sessionStorage.getItem('quiz');
};


// QUESTION SWITCH
const questionSwitch = () => {
    if (questionsPassed+1 < quizStep.length) {
        quizStep.item(index).classList.remove('active');
        quizStep.item(index+1).classList.add('active');
        arrowBack.style.opacity = '1';
        index++;
        questionsPassed++;
        progressBarLine.style.width = 100 / quizStep.length * questionsPassed + '%';
        progressPercentage.innerText = Math.ceil(100 / quizStep.length * questionsPassed) + '%';
        document.querySelectorAll('.question-number').forEach((elem) => {
            elem.innerText = `${questionsPassed + 1}.`;
        });
        btnDisable();
        isInputValidated = false;
    } else {
        return false;
    }
}

// LAST QUESTION CHECKING
const lastQuestionSwitch = () => {
    if (questionsPassed+1 !== quizStep.length) {
        questionSwitch();
    } else if (questionsPassed+1 === quizStep.length) {
        btnNext.innerText = 'Завершити';
        progressBarLine.style.width = '100%';
        progressPercentage.innerText = '100%';
        btnNext.onclick = () => {
            window.location = "thankyou.html";
        };
    }
}

// QUESTION BACK
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

// BTN-NEXT CLICK
btnNext.addEventListener('click', (e) => {
    e.preventDefault();
    lastQuestionSwitch();
})

// QUESTION SWITCH ON ENTER KEY
document.addEventListener("keypress", (event) => {
    if (isInputValidated === true && event.key === "Enter") {
        lastQuestionSwitch();
    }
});

// BTN-BACK CLICK
arrowBack.addEventListener('click', (e) => {
    e.preventDefault();
    questionBack();
});
