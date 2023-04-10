import { resetScale } from './scale.js';
import {resetSlider} from './effects.js';
import { sendData } from './api.js';
import { showSuccessUpload, showErrorUpload } from './upload-event.js';
import {uploadUserPhoto} from './upload-user.js';
import {isEscapeKey} from './util.js';
const imageUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imageUploadForm.querySelector('#upload-file');
const imageUpload = imageUploadForm.querySelector('.img-upload__overlay');
const cancelUpload = imageUpload.querySelector('#upload-cancel');
const hashtagField = imageUploadForm.querySelector('.text__hashtags');
const descriptionField = imageUploadForm.querySelector('.text__description');
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_NUMBER_HASHTAG = 5;
const MAX_SIMBOLS_TEXTAREA = 140;
const ERRORE_INPUT_HASHTAG = 'Неправильный формат хэштэга';
const ERRORE_INPUT_DESCRIPTION = `Количество знаков не больше ${MAX_SIMBOLS_TEXTAREA}!`;
const submitButton = imageUploadForm.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--errore',
});
const closeModalForm = () => {
  imageUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadForm.reset();
  resetScale();
  resetSlider();
};
const closeUploadOnEscape = () => {
  document.removeEventListener('keydown', onEscapeDown);
};
const closeUploadFile = () => {
  cancelUpload.addEventListener('click', closeModalForm);
  document.addEventListener('keydown', onEscapeDown);

};

uploadFile.addEventListener('change', () => {
  document.body.classList.add('modal-open');
  imageUpload.classList.remove('hidden');
  resetScale();
  resetSlider();
  uploadUserPhoto();
  closeUploadFile();
});

function onEscapeDown (evt) {
  if (evt.key === 'Escape') {
    closeModalForm();
    closeUploadOnEscape();
  }
}
hashtagField.addEventListener('keydown', (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
});
descriptionField.addEventListener('keydown', (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
});
const validateDescription = (value) => value.length <= MAX_SIMBOLS_TEXTAREA;


const isValidTag = (tag) => HASHTAG_PATTERN.test(tag);
const hasValidNumber = (tags) => tags.length <= MAX_NUMBER_HASHTAG;
const hasUniquTag = (tags) => {
  const lowerCaseTag = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTag.length === new Set(lowerCaseTag).size;
};
const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((element) => element.trim().length);
  return tags.every(isValidTag) && hasValidNumber(tags) && hasUniquTag(tags);
};
pristine.addValidator(hashtagField, validateTags, ERRORE_INPUT_HASHTAG);
pristine.addValidator(descriptionField, validateDescription, ERRORE_INPUT_DESCRIPTION);
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};
function setUserFormSubmit(onSuccess) {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(formData)
        .then(() => {
          onSuccess();
          showSuccessUpload();
        })
        .catch(() => {
          showErrorUpload();
        }).finally(unblockSubmitButton);
    }
  });
}
export {setUserFormSubmit, closeModalForm};
