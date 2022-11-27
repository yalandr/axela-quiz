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

// EMAIL INPUT VALIDATION
let inputEmail = document.querySelectorAll('.form-control.email');

inputEmail.forEach((el) => {
    el.addEventListener('input', () => {
        if (el.value.includes('@')) {
            isInputValidated = true;
            el.classList.add('valid');
            btnAble();
        } else {
            isInputValidated = false;
            el.classList.remove('valid');
            btnDisable();
        }
    })
})


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
        <li class="added-list-item">
            ${advertiserName}
        </li>
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
const mainForm = document.querySelector('#mainForm');
let quizArray = [];
let quizObj = {};

const hiddenInput = document.createElement('input');
hiddenInput.className = 'hidden-input-for-quiz valid';
hiddenInput.name = 'quiz_data';
hiddenInput.type = 'hidden';
mainForm.appendChild(hiddenInput);

mainForm.onchange = (event) => {
    let question = event.target.name;
    let answer = event.target.value;
    let objectItem = `${question} - ${answer}`;
    
    quizArray.push(objectItem);
    
    const newSet = new Set(quizArray);
    const uniqueQuizArray = Array.from(newSet);
    
    quizObj = uniqueQuizArray.reduce((acc, cur, i) => {
        i =  `${i + 1}`;
        acc[i] = cur;
        return acc;
    }, {});

    console.table(quizObj);
    sessionStorage.setItem('axela-quiz', JSON.stringify(quizObj));
    hiddenInput.value = sessionStorage.getItem('axela-quiz');
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

// MODAL
const messageModal = document.querySelector('.message-modal');
const messageModalContent = document.querySelector('.message-modal-content');
const messageText = document.querySelector('.message-text');

const showModal = (message) => {
    messageModal.classList.add('active');
    messageText.innerText = message;
}

const closeModal = () => {
    messageModal.classList.remove('active');
}

messageModalContent.addEventListener('click', (event) => {
    event.stopPropagation();
})

// FORM SENDING
async function formSend() {

    let formData = new FormData(mainForm);

    if (isInputValidated === true) {
        let response = await fetch('send.php', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            console.log('form send!');
            mainForm.reset();
            window.location = "thankyou.html";
        } else {
            showModal('Something went wrong');
            mainForm.reset();
        }
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
        mainForm.style.opacity = '0.25';

        btnNext.onclick = () => {
            formSend();
        };
    }
}

// QUESTION BACK
const questionBack = () => {
    if (questionsPassed > 0) {
        mainForm.style.opacity = '1';
        quizStep.item(index).classList.remove('active');
        quizStep.item(index-1).classList.add('active');
        index--;
        questionsPassed--;
        progressBarLine.style.width = 100 / quizStep.length * questionsPassed + '%';
        progressPercentage.innerText = Math.ceil(100 / quizStep.length * questionsPassed) + '%';
        document.querySelectorAll('.question-number').forEach((elem) => {
            elem.innerText = `${questionsPassed + 1}.`;
        });
    } else if (questionsPassed === 0) {
        arrowBack.style.opacity = '0';
    } else {
        return false;
    }
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
