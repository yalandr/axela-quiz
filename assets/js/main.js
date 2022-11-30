// VARIABLES ============================================================
const btnNext = document.querySelector('.btn-next');
const quizStep = document.querySelectorAll('.quiz-step');
const arrowBack = document.querySelector('.arrow-back-img');
const progressBarLine = document.querySelector('.progress-bar-line');
const progressPercentage = document.querySelector('.progress-percentage');
const additionInput = document.querySelector('.addition-input-wrapper');
const notification = document.querySelector('.notification');

document.querySelector('.question-number').innerText = '1.';

let index = 0;
let questionsPassed = 0;
let isInputValidated = false;

// CONFIGURATIONAL VARIABLES ============================================
const gSheetLink = 'https://docs.google.com/spreadsheets/d/1g4xKaN2DU_bShQ5dQ6vxP9rVAthoD7puEpLx6TwVTtE/edit?usp=sharing';
const sheetBestLink = 'https://sheet.best/api/sheets/8234265b-c551-4966-b15f-11cd3594d596';
let siteBase = "/";

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
const inputAdvertiser = document.querySelector('.form-control.adv-input');
const addedItemsList = document.querySelector('.added-items-list');
const addBtn = document.querySelector('.add-btn');
const listMessage = document.querySelector('.list-message');
let advertisersArray = [];

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
        advertisersArray.push(inputAdvertiser.value);
        inputAdvertiser.value = '';
        listMessage.style.display = 'none';
        isInputValidated = true;
    }
})

// DATA RECORDING
const mainForm = document.querySelector('#mainForm');
let quizObj = {};

mainForm.onchange = (event) => {
    let question = event.target.name;
    let answer = event.target.value.trim();
    quizObj[question] = answer;

    if (event.target.type === "checkbox") {

        quizObj.Traffic = [];
        for (let i = 0; i < inputCheckbox.length; i++) {
            if (inputCheckbox[i].checked && inputCheckbox[i].name === 'Traffic') {
                quizObj.Traffic.push(inputCheckbox[i].value);
            }
        }
        
        quizObj.Vertical = [];
        for (let i = 0; i < inputCheckbox.length; i++) {
            if (inputCheckbox[i].checked && inputCheckbox[i].name === 'Vertical') {
                quizObj.Vertical.push(inputCheckbox[i].value);
            }
        }
    }

    quizObj.Advertiser = advertisersArray;
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

const showModal = (content) => {
    messageModal.classList.add('active');
    messageModalContent.innerHTML = content;
}

const closeModal = () => {
    messageModal.classList.remove('active');
    messageModalContent.innerHTML = '';
}

messageModalContent.addEventListener('click', (event) => {
    event.stopPropagation();
})

// CURRENT TIME
let currentDate = new Date().getDate();
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let currentHour = new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours();
let currentMinute = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();

let currentTime = currentDate + "." + currentMonth + "." + currentYear + " " + currentHour + ":" + currentMinute;

// DATA SENDING
let isFormSubmitted = false;

const handleSubmit = () => {

    let formObjectString = {
        Date: currentTime,
        Name: quizObj.Name,
        Connection: quizObj.Connection,
        Login: quizObj.Login,
        Email: quizObj.Email,
        Traffic: quizObj.Traffic.join(', '),
        Vertical: quizObj.Vertical.join(', '),
        Advertiser: quizObj.Advertiser.join(', '),
        Team: quizObj.Team
    }

    if (isInputValidated === true && isFormSubmitted === false) {
        axios.post(sheetBestLink, formObjectString);
        mainForm.reset();
        notification.classList.remove('active');
        isFormSubmitted = true;
        showModal(`
            <h2 class="thankyou-heading">
                Дякуємо!
            </h2>
            <p class="thankyou-text">
                Ми отримали вашу заявку та зв’яжемося з вами найближчим часом
            </p>
            <a href="https://axela.network/" class="btn btn-link" target="_blank">
                Перейти на сайт а́xela
            </a>
        `);
    } else {
        showModal(`
            <p class="message-text">
                Упс... Щось пішло не так :(
            </p>
            <a href=${siteBase} class="btn btn-link">
                Оновити сторiнку
            </a>
        `);
        mainForm.reset();
    }
}

// LAST QUESTION CHECKING
const lastQuestionSwitch = () => {

    if (questionsPassed+1 !== quizStep.length) {
        questionSwitch();
    } else if (questionsPassed+1 === quizStep.length) {
        btnNext.innerHTML = `Завершити`;
        progressBarLine.style.width = '100%';
        progressPercentage.innerText = '100%';
        mainForm.style.opacity = '0.25';
        notification.classList.add('active');
        btnNext.addEventListener('click', (e) => {
            handleSubmit();
        })
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
        btnNext.innerHTML = `
            Наступне питання 
            <img src="assets/img/svg/arrow-next.svg" alt="Arrow next" class="arrow-next-img">
        `;
        notification.classList.remove('active');
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
