import './fullphoto.js';
import {setUserFormSubmit, closeModalForm} from './form.js';
import './scale.js';
import './effects.js';
import { renderGallery } from './picture.js';
import { showAlert } from './util.js';
import {getData} from './api.js';
getData().then((data) => {
  renderGallery(data);
}).catch(
  (err) => {
    showAlert(err.message);
  }
);
setUserFormSubmit(closeModalForm);
