const imageUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imageUploadForm.querySelector('#upload-file');
const imageUpload = imageUploadForm.querySelector('.img-upload__overlay');
const cancelUpload = imageUpload.querySelector('#upload-cancel');
const hashtagField = imageUploadForm.querySelector('.text__hashtags');
const descriptionField = imageUploadForm.querySelector('.text__description');
const closeUploadOnEscape = () => {
  document.removeEventListener('keydown', onEscapeDown);
};
const closeUploadFile = () => {
  cancelUpload.addEventListener('click', () => {
    //evt.preventDefault();
    imageUpload.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });
  document.addEventListener('keydown', onEscapeDown);
};

uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault();
  document.body.classList.add('modal-open');
  imageUpload.classList.remove('hidden');
  closeUploadFile();
});

function onEscapeDown (evt) {
  if (evt.key === 'Escape') {
    document.body.classList.remove('modal-open');
    imageUpload.classList.add('hidden');
    closeUploadOnEscape();
  }
}
hashtagField.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});
descriptionField.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});


