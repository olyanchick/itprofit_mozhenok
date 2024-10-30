const modal = document.querySelector('.modal');
const openModalButton = document.querySelector('.modal_open_button');
const closeModalButton = document.querySelector('.modal_close');

function openModal() {
    modal.classList.remove('modal_hidden');
    modal.classList.add('modal_opened');
    document.body.classList.add('modal_open');
}

function closeModal() {
    modal.classList.remove('modal_opened');
    modal.classList.add('modal_hidden');
    document.body.classList.remove('modal_open');
}

openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal');
    modal.style.opacity = '';
    modal.style.visibility = '';
});


export { openModal, closeModal };
