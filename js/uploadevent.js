const templateFragmentSuccess = document.querySelector('#success').content;
const successModal = templateFragmentSuccess.querySelector('.success');
const successButton = templateFragmentSuccess.querySelector('.success__button');
const body = document.querySelector('body');
const showSuccessUpload = () => {
  body.appendChild(successModal);
};

const templateFragmentError = document.querySelector('#error').content;
const errorModal = templateFragmentError.querySelector('.error');
const showErrorUpload = () => {
  body.appendChild(errorModal);
};


function onEscapeDown (evt) {
  if (evt.key === 'Escape') {
    closeModal();
    closeUploadOnEscape();
  }
}
export {showSuccessUpload, showErrorUpload};
