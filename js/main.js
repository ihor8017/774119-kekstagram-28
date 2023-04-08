import './fullphoto.js';
import {setUserFormSubmit, closeModalForm} from './form.js';
import './scale.js';
import './effects.js';
import { renderGallery } from './picture.js';
import {setFilter, renderFiteredGallery} from './userfilter.js';
import { showAlert, debounce } from './util.js';
import {getData} from './api.js';
const imgSortFilters = document.querySelector('.img-filters');
const RERENDER_DELAY = 500;
getData().then((data) => {
  renderGallery(data);
  imgSortFilters.classList.remove('img-filters--inactive');
  setFilter(debounce(() => renderFiteredGallery(data), RERENDER_DELAY));
}).catch(
  (err) => {
    showAlert(err.message);
  }
);
setUserFormSubmit(closeModalForm);
