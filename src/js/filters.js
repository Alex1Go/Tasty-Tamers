import axios from 'axios';
import {
  fetchArea,
  fetchIngredients,
  fetchSearchDishArea,
  fetchSearchDishIngrid,
  fetchSearchDish,
  fetchSearchDishTime
} from './API-request/filter- request';
import star from '../img_header/svg/heart-star.svg'
import { pagination } from './pagination';

const form = document.querySelector('.filter-form');
const searchEl = document.querySelector('.filter-input');
const searchElTime = document.querySelector('.filter-time');
const searchElArea = document.querySelector('.filter-area');
const searchElIng = document.querySelector('.filter-ingredients');
const galary = document.querySelector('.filter-list');
const btnResetFilter = document.querySelector('.filter-btn-reset');

const btnSearchClear = document.querySelector('.filter-input-btn');


const page = pagination.getCurrentPage()


const BASEURL = `https://tasty-treats-backend.p.goit.global/api/recipes`;

let inputSearch = '';
let inputTime = '';
let inputArea = '';
let inputIngr = '';

searchEl.addEventListener('input', debounce(getDish, 300));

searchElArea.addEventListener('change', event => {
  inputArea = event.currentTarget.value;
  fetchSearchDishArea(inputArea).then(data => {
    createGallary(data);
  });
});

searchElIng.addEventListener('change', event => {
  inputIngr = event.currentTarget.value;

  fetchSearchDishIngrid(inputIngr).then(data => {
    createGallary(data);
  });
});

searchElTime.addEventListener('change', event => {
  inputTime = Number(event.target.value)
  
  fetchSearchDishTime(inputTime).then(data => {
     createGallary(data);
   })
    
 })
 btnSearchClear.addEventListener('click', (event) =>{
  event.preventDefault();
 searchEl.value = '';
  btnSearchClear.style.display = "none"
  
   }) 

btnResetFilter.addEventListener('click', event => {
  inputSearch = '';
  inputTime = '';
  inputArea = '';
  inputIngr = '';
  form.reset();
});

fetchArea()
  .then(areas => {
    areas.map(area => {
      const option = `<option value = "${area.name}">${area.name}</option>`;
      searchElArea.insertAdjacentHTML('beforeend', option);
    });
  })
  .catch(() => {});

fetchIngredients()
  .then(ingredients => {
    ingredients.map(ingredient => {
      const option = `<option value = "${ingredient._id}">${ingredient.name}</option>`;
      searchElIng.insertAdjacentHTML('beforeend', option);
    });
  })
  .catch(() => {});

function debounce(fn, wait) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

function getDish(event) {
  inputSearch = event.target.value.trim();
  btnSearchClear.style.display = "flex"

  fetchSearchDish(inputSearch)
    .then(data => {
      if (data.length !== 0) {
        createGallary(data);
      } else {
        galary.insertAdjacentHTML(
          'beforeend',
          `<div class="filter-answer-block"> 
            <img class="filter-answer-img" src="" alt=""> 
            <h3 class="filter-answer-text">Sorry! We didn't find anything.</h3> 
        </div>`
        );
      }
    })
    .catch(() => {});
}

function createGallary(answers) {
  galary.innerHTML = '';
  const galarys = answers.map(answer => {
    
    const image = answer.thumb;
    const title = answer.title;
    const rating = answer.rating;
    const description = answer.description;
    const btnId = answer._id
    const ratingStar = Math.round(answer.rating);
    galary.insertAdjacentHTML(
      'beforeend',
      `<li class="filter-item">
        <img class="filter-img" src="${image}" alt="${title}" />
        <button class="filter-btn-like">
          <svg class="filter-svg-like" value="favorite" width="22" height="22"><use href="./img_header/svg/heart-star.svg#icon-heart-transparent"></use></svg>
        </button>
        <div class="filter-info-block">
          <h4 class="filter-img-title">${title}</h4>
          <p class="filter-img-text">${description}</p>
          <div class="filter-info-reiting">
            <div class="filter-star-block mark-${ratingStar}">
              <p class="filter-reiting">${rating}</p>
              <svg class="filter-star star star-1" width="18" height="18"><use href="${star}#icon-Star-transparent"></use></svg>
              <svg class="filter-star star star-2" width="18" height="18"><use href="${star}#icon-Star-transparent"></use></svg>
              <svg class="filter-star star star-3" width="18" height="18"><use href="${star}#icon-Star-transparent"></use></svg>
              <svg class="filter-star star star-4" width="18" height="18"><use href="${star}#icon-Star-transparent"></use></svg>
              <svg class="filter-star star star-5" width="18" height="18"><use href="${star}#icon-Star-transparent"></use></svg>
            </div>
            <button type="button" id="${btnId}" class="filter-btn-see" data-modal-open>See recipe</button>
          </div>
        </div>
      </li>`   
    );
  });

}


// const buttonModal = document.querySelector(".filter-listener")
// buttonModal.addEventListener('click', event => {
//   console.log(event.target.id
//   )
//     })
// console.log(buttonModal)
     

export { inputSearch, inputTime, inputArea, inputIngr };
