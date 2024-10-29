
function validation(form) {

    const Inputmask = require("inputmask");

    const phoneInput = document.querySelector("#input_phone");
    const maskOptions = {
        mask: "+375 (99) 999-99-99",  // Маска для белорусского телефона
        showMaskOnHover: false,        // Не показывать маску при наведении
    };
    Inputmask(maskOptions).mask(phoneInput)

    function removeError(input) {
        const parent = input.parentNode;

        if (parent.classList.contains('error')) {
            parent.querySelector('.error_label').remove()
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


    let result = true;

    const allInputs = form.querySelectorAll('input');

    for (const input of allInputs) {

        removeError(input);

        if (input.value === '') {
            console.log ('Ошибка поля');
            createError(input, 'Поле не заполнено!');
            result = false;
        }

    }

    return result
}

document.getElementById('add_form').addEventListener('submit', function (event){
    event.preventDefault();

    if (validation(this) === true) {
        alert('Форма проверена успешно!')
    }
})
