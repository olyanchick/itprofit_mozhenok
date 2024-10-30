import './styles/style.sass';
import Inputmask from "inputmask";
import './modal.js';

// Маска для ввода телефона
const phoneInput = document.querySelector("#input_phone");
Inputmask({ mask: "+375 (99) 999-99-99", inputEventOnly: true }).mask(phoneInput);

function validation(form) {
    const emailInput = document.getElementById("input_email");
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let result = true;

    // Удаление ошибки, если есть
    function removeError(input) {
        const parent = input.parentNode;
        if (parent.classList.contains('error')) {
            parent.querySelector('.error_label').remove();
            parent.classList.remove('error');
        }
    }

    // Создание сообщения об ошибке
    function createError(input, text) {
        const parent = input.parentNode;
        const errorLabel = document.createElement("label");
        errorLabel.classList.add("error_label");
        errorLabel.textContent = text;
        parent.classList.add('error');
        parent.append(errorLabel);
    }

    // Удаляем предыдущие ошибки
    const allInputs = form.querySelectorAll('input');
    for (const input of allInputs) {
        removeError(input);
        if (input.value === '') {
            createError(input, 'Поле не заполнено!');
            result = false;
        }
    }

    // Проверка корректности email
    if (!emailPattern.test(emailInput.value)) {
        createError(emailInput, "Пожалуйста, введите корректный адрес электронной почты.");
        result = false;
    }

    return result;
}

// Функция для отправки данных формы через AJAX
async function sendFormData(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Преобразуем FormData в объект

    try {
        const response = await fetch('http://localhost:9090/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        handleResponse(result, form);

    } catch (error) {
        handleResponse(error, form);
        console.error('Ошибка при отправке формы:', error);
    }
}

// Обработка ответа от сервера
function handleResponse(response, form) {
    clearFormErrors(); // Убираем предыдущие ошибки

    const messageContainer = document.getElementById("form_message");
    console.log(response);

    if (response.status === "success") {
        // Очистка полей формы
        form.reset();

        messageContainer.append(response.message);
        messageContainer.classList.add("success_message");

    } else {
        console.log(response);
        messageContainer.append(response.message);
        messageContainer.classList.add("error_message");
    }
}

// Очистка ошибок перед новой проверкой
function clearFormErrors() {
    const errorLabels = document.querySelectorAll('.error_label');
    errorLabels.forEach(label => label.remove());

    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));

    // Очистка сообщения в контейнере
    const messageContainer = document.getElementById("form_message");
    messageContainer.textContent = '';
    messageContainer.classList.remove("success_message", "error_message");
}

// Обработчик отправки формы
document.getElementById('add_form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Проверяем форму перед отправкой
    if (validation(this)) {
        sendFormData(this); // Отправка данных формы через AJAX
    }
});
