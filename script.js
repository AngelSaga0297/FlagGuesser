const apiUrl = 'https://restcountries.com/v3.1/all';
const imgElement = document.getElementById('flag-img');
const inputGuess = document.getElementById('country-input');
const guessButton = document.getElementById('guess-button');
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName('close')[0];
inputGuess.value = '';
let randomCountry;
  
function fetchCountry() {
  fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
      randomCountry = data[Math.floor(Math.random() * data.length)];
      imgElement.src = randomCountry.flags.png;
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

fetchCountry();
  
guessButton.addEventListener('click', checkGuess);
inputGuess.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

function checkGuess() {
    const guess = inputGuess.value;
    if (guess.toLowerCase() === randomCountry.name.common.toLowerCase()) {
        modal.getElementsByClassName('modal-content')[0].innerHTML = '<h2 style="color: green;">Correct!</h2>';
        modal.style.display = 'block';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 600);
        fetchCountry();
        inputGuess.value = '';
    } else {
        modal.getElementsByClassName('modal-content')[0].innerHTML = '<h2 style="color: red;">Wrong!</h2>';
        modal.style.display = 'block';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 600);
    }
}

span.onclick = function() {
    modal.style.display = 'none';
}

