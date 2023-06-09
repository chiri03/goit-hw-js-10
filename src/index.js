import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

new SlimSelect({
  select: '.slim-select',
});

function updateCatInfo(cat) {
  loader.classList.add('hidden');
  catInfo.classList.remove('hidden');
  catInfo.innerHTML = '';
  const image = document.createElement('img');
  image.src = cat[0].url;
  image.alt = 'Cat';
  catInfo.appendChild(image);
  const name = document.createElement('h2');
  name.textContent = cat[0].breeds[0].name;
  catInfo.appendChild(name);
  const description = document.createElement('p');
  description.textContent = cat[0].breeds[0].description;
  catInfo.appendChild(description);
  const temper = document.createElement('p');
  temper.textContent = 'Temper: ' + cat[0].breeds[0].temperament;
  catInfo.appendChild(temper);
}

function showLoader() {
  breedSelect.classList.add('hidden');
  catInfo.classList.add('hidden');
  loader.classList.remove('hidden');
  error.classList.add('hidden');
}
function hideLoader() {
  breedSelect.classList.remove('hidden');
  catInfo.classList.remove('hidden');
  loader.classList.add('hidden');
}
function showError() {
  breedSelect.classList.add('hidden');
  catInfo.classList.add('hidden');
  loader.classList.add('hidden');
  error.classList.remove('hidden');
}
showLoader();

const API_KEY =
  'live_ERwia957CD7C5M4P2jR8Lz3FoJBn4m9Vn2x6u6Xf7g5uihzCuJ84GQ0x3oJWqErX';

fetch('https://api.thecatapi.com/v1/breeds', { method: 'GET' })
  .then(serverPromise =>
    serverPromise
      .json()
      .then(cats => {
        cats.forEach(cat => {
          const option = document.createElement('option');
          option.textContent = cat.name;
          option.value = cat.id;
          breedSelect.add(option);
        });
        hideLoader();
      })
      .catch(e => console.log(e))
  )
  .catch(e => {
    Notiflix.Notify.failure('Failed to fetch breeds:'), error;
  });

let img = '';

breedSelect.addEventListener('change', event => {
  const catId = event.target.value;
  showLoader();
  fetch(
    `https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${catId}&api_key=${API_KEY}`
  )
    .then(res => {
      res
        .json()
        .then(cat => {
          var image = new Image();
          image.url = cat[0].url;
          console.log(image.url);
          catInfo.innerHTML = `<img src=${image.url}>`;
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  showLoader();
  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      updateCatInfo(cat);
      hideLoader();
    })
    .catch(error => {
      Notiflix.Notify.failure(document.querySelector('.error'), error);
      showError();
    });
});
