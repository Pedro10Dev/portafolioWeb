const card = document.querySelector('.card');
const flipButtons = document.querySelectorAll('.flip-button');

flipButtons.forEach(button => {
  button.addEventListener('click', () => {
    card.classList.toggle('flipped');   

  });
});