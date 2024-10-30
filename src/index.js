import './styles/style.sass';
import Inputmask from "inputmask";
import './modal.js';

document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.querySelector("#input_phone");
    Inputmask({ mask: "+375 (99) 999-99-99", inputEventOnly: true }).mask(phoneInput);

    function removeError(input) {
        const parent = input.parentNode;
        if (parent.classList.contains('error')) {
            const errorLabel = parent.querySelector('.error_label');
            if (errorLabel) {
                errorLabel.remove();
            }
            parent.classList.remove('error');
        }
    }

    function createError(input, text) {
        const parent = input.parentNode;
        const errorLabel = document.createElement("label");
        errorLabel.classList.add("error_label");
        errorLabel.textContent = text;
        parent.classList.add('error');
        parent.append(errorLabel);
    }

    function validation(form) {
        const emailInput = document.getElementById("input_email");
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        let result = true;

        const allFields = form.querySelectorAll('input, textarea');
        for (const field of allFields) {
            removeError(field);
            if (field.value.trim() === '') {
                createError(field, 'Поле не заполнено!');
                result = false;
            }
        }

        if (emailInput.value.trim() !== '' && !emailPattern.test(emailInput.value)) {
            createError(emailInput, "Пожалуйста, введите корректный адрес электронной почты.");
            result = false;
        }

        return result;
    }

    async function sendFormData(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

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

    function handleResponse(response, form) {
        clearFormErrors();

        const messageContainer = document.getElementById("form_message");

        if (response.status === "success") {
            form.reset();

            messageContainer.append(response.message);
            messageContainer.classList.add("success_message");

        } else {
            messageContainer.append(response.message);
            messageContainer.classList.add("error_message");
        }
    }

    function clearFormErrors() {
        const errorLabels = document.querySelectorAll('.error_label');
        errorLabels.forEach(label => label.remove());

        const errorFields = document.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));

        const messageContainer = document.getElementById("form_message");
        messageContainer.textContent = '';
        messageContainer.classList.remove("success_message", "error_message");
    }

    document.getElementById('add_form').addEventListener('submit', function (event) {
        event.preventDefault();

        if (validation(this)) {
            sendFormData(this);
        }
    });

    const form = document.getElementById('add_form');
    const allFields = form.querySelectorAll('input, textarea');

    allFields.forEach(field => {
        field.addEventListener('focus', () => {
            removeError(field);
        });
    });
})