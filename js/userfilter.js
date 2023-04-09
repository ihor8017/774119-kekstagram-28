import {getRandomArray} from './util.js';
const getDiscussed = (photo) =>{
  const {comments} = photo;
  return comments.length;
};
const comparePhotos = (photoA, photoB) => {
  const commentsA = getDiscussed(photoA);
  const commentsB = getDiscussed(photoB);
  return commentsB - commentsA;
};
let attributId;
const setFilter = (cb) => {
  const imagFilterForm = document.querySelector('.img-filters__form');
  imagFilterForm.addEventListener('click', (evt) => {
    attributId = evt.target.closest('[id]');
    cb();
  });
};
const getFiteredPhotos = (photos) => {
  const listFilters = document.querySelectorAll('.img-filters__button');
  let activFilter;
  listFilters.forEach((element) => {
    if(element.closest('.img-filters__button--active')){
      activFilter = element;
    }
  });
  activFilter.classList.remove('img-filters__button--active');
  if (!attributId) {
    return;
  }
  attributId.classList.add('img-filters__button--active');
  const id = attributId.id;
  let filteredData = photos;
  switch (id) {
    case 'filter-discussed' : filteredData = photos.slice()
      .sort(comparePhotos);

      attributId.classList.add('img-filters__button--active');
      break;
    case 'filter-random' : filteredData = getRandomArray(photos, 10);

      attributId.classList.add('img-filters__button--active');
      break;
    case 'filter-default' : filteredData = photos;

      attributId.classList.add('img-filters__button--active');
      break;

  }
  return filteredData;
};

export {setFilter, getFiteredPhotos};
