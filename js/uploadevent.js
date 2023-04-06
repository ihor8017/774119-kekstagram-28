const templateFragmentSuccess = document.querySelector('#success').content;
const successModal = templateFragmentSuccess.querySelector('.success');
const successButton = templateFragmentSuccess.querySelector('.success__button');
const body = document.querySelector('body');

const closeSuccess = () => {
  successModal.remove();
};
const showSuccessUpload = () => {
  body.appendChild(successModal);
  const closeNonActiveSuccess = (evt) => {
    const target = evt.target;
    if (!target.closest('.success__inner') && !target.closest('.success__button')) {
      closeSuccess();
    }
  };
  successButton.addEventListener('click', closeSuccess, {once: true});
  document.addEventListener('keydown', onEscapeDownSuccess, true);
  successModal.addEventListener('click',closeNonActiveSuccess);
};

const templateFragmentError = document.querySelector('#error').content;
const errorModal = templateFragmentError.querySelector('.error');
const errorButton = templateFragmentError.querySelector('.error__button');

const closeError = () => {
  errorModal.remove();
};

const showErrorUpload = () => {
  body.appendChild(errorModal);
  const closeNonActiveError = (evt) => {
    const target = evt.target;
    if (!target.closest('.error__inner') && !target.closest('.error__button')) {
      closeError();
    }
  };
  errorButton.addEventListener('click', closeError, {once: true});
  document.addEventListener('keydown', onEscapeDownErrore, true);
  window.addEventListener('click', closeNonActiveError);
};


function onEscapeDownSuccess (evt) {
  if (evt.key === 'Escape') {
    document.removeEventListener('keydown', onEscapeDownSuccess, true);
    closeSuccess();
  }
}
function onEscapeDownErrore (evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
    document.removeEventListener('keydown', onEscapeDownErrore, true);
    closeError();
  }
}
export {showSuccessUpload, showErrorUpload};
