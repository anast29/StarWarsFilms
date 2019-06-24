
import './style.css';
var image = ['https://img14.deviantart.net/5cd0/i/2013/057/3/8/star_wars_iv___a_new_hope___movie_poster_by_nei1b-d5t3cw9.jpg',
  'https://cdn.shopify.com/s/files/1/1416/8662/products/attack_of_the_clones_2002_styleB_original_film_art_2000x.jpg?v=1551894985',
  'https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg',
  'https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_.jpg',
  'https://observandocine.com/wp-content/uploads/2015/12/star_wars_vi___return_of_the_jedi___movie_poster_by_nei1b-d5t3b8d.jpg',
  'https://www.aletanie.pl/images/261pl.jpg',
  'https://bonneville.com/wp-content/uploads/2019/03/437be55157.jpg'
]
const mainContent: HTMLElement = document.getElementById('container');
const url = 'https://swapi.co/api/films/';
var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.onload = function () {
  const content = JSON.parse(xhr.responseText);
  for (let i = 0; i < content.count; i++) {
    const movieCard: HTMLElement = document.createElement('div');
    movieCard.classList.add('movie-card');
    const cardImg: HTMLImageElement = document.createElement('img');
    cardImg.classList.add('card-img');
    cardImg.src = image[i];
    const backColor: HTMLElement = document.createElement('div');
    backColor.classList.add('back-color');
    const cardBody: HTMLDivElement = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.innerHTML += `<span>Episode ${content.results[i].episode_id}</span>`;
    cardBody.innerHTML += `<h2>${content.results[i].title}</h2>`;
    cardBody.innerHTML += `<span>${content.results[i].director} / ${content.results[i].release_date}</span>`;
    cardBody.innerHTML += `<p>${content.results[i].opening_crawl}</p>`;
    const charactersBtn: HTMLButtonElement = document.createElement('button');
    charactersBtn.classList.add('characters-btn');
    charactersBtn.innerHTML = 'Characters';
    const closeModal: HTMLButtonElement = document.createElement('button');
    closeModal.classList.add('close-modal');
    closeModal.innerText = 'x';
    const modalDiv: HTMLDivElement = document.createElement('div');
    modalDiv.classList.add('modal-div');
    modalDiv.innerHTML = `<h2>Characters info</h2>`;
    const contentModal: HTMLDivElement = document.createElement('div');
    contentModal.classList.add('content-modal');
    modalDiv.appendChild(closeModal);
    for (let j = 0; j < content.results[i].characters.length; j++) {
      let xhrCharacters = new XMLHttpRequest();
      xhrCharacters.open('GET', content.results[i].characters[j], true);
      xhrCharacters.onload = function () {
        const person = JSON.parse(xhrCharacters.responseText)
        const modalText: HTMLDivElement = document.createElement('div');
        modalText.classList.add('modal-text');
        modalText.innerHTML = `<span>${person.name}</span> <span>${person.gender}</span>`;
        contentModal.appendChild(modalText);
      }
      xhrCharacters.send();
    }
    modalDiv.appendChild(contentModal);
    charactersBtn.onclick = function () {
      mainContent.appendChild(modalDiv);
    }
    closeModal.onclick = function () {
      mainContent.removeChild(modalDiv);
    }
    cardBody.appendChild(charactersBtn);
    movieCard.appendChild(cardImg);
    movieCard.appendChild(backColor);
    movieCard.appendChild(cardBody);
    mainContent.appendChild(movieCard);
  }
}
xhr.send();

