import './styles/style.sass';
import Inputmask from "inputmask";

// Маска для ввода телефона
const phoneInput = document.querySelector("#input_phone");
Inputmask({ mask: "+375 (99) 999-99-99" }).mask(phoneInput);

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

// Обработчик отправки формы
document.getElementById('add_form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Если валидация пройдена, показать сообщение, иначе отменить отправку
    if (validation(this)) {
        alert('Форма проверена успешно!');
    }
});
