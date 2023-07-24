import TastyTreatsAPI from './API-request/popular-request';
const getRequest = new TastyTreatsAPI();
const refs = {
    list: document.querySelector('.popular-recipes-list'),
    list_mobile: document.querySelector('.popular-list.popular-recipes-mobile'),
}

async function fetchPopular() {
  const recipes = await getRequest.getRecipesData();
 
  const markup = recipes.map(el => {
    return `<li class="popular-recipes-item" data-id="${el._id}">
      <div class="popular-recipes-wraper">
        <img
          class="popular-recipes-img"
          src="${el.preview}"
          alt="${el.title}"
          loading="slow"
        />
      </div>
      <div class="popular-containet-def">
        <h3 class="popular-recipes-title">${el.title}</h3>
        <p class="popular-recipes-description">${el.description}</p>
      </div>
    </li>`}).join('');
  refs.list.insertAdjacentHTML('beforeend', markup);
 
}

fetchPopular()