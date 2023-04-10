import './full-photo.js';
import {setUserFormSubmit, closeModalForm} from './form.js';
import './scale.js';
import './effects.js';
import { renderGallery } from './picture.js';
import {setFilter, getFiteredPhotos} from './user-filter.js';
import { showAlert, debounce} from './util.js';
import {getData} from './api.js';
import './upload-user.js';
const imgSortFilters = document.querySelector('.img-filters');
const RERENDER_DELAY = 500;
const debounceDGalleryRender = debounce(renderGallery,RERENDER_DELAY);
let modifiedData;
getData().then((data) => {
  renderGallery(data);
  imgSortFilters.classList.remove('img-filters--inactive');
  setFilter(() => {
    modifiedData = getFiteredPhotos(data);
    debounceDGalleryRender(modifiedData);
  });
}).catch(
  (err) => {
    showAlert(err.message);
  }
);
setUserFormSubmit(closeModalForm);
