const imageUploadForm = document.querySelector('.img-upload__form');
const controlScaleSmaller = imageUploadForm.querySelector('.scale__control--smaller');
const controlScaleBigger = imageUploadForm.querySelector('.scale__control--bigger');
const controlValue = imageUploadForm.querySelector('.scale__control--value');
const imageUploadPrewier = imageUploadForm.querySelector('.img-upload__preview img');
const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
let value = 100;
const resetScale = () => {
  imageUploadPrewier.style.transform = `scale(${DEFAULT_SCALE / 100})`;
  controlValue.value = `${DEFAULT_SCALE}%`;
  value = 100;
};
imageUploadPrewier.style.transform = `scale(${DEFAULT_SCALE / 100})`;
controlValue.value = `${DEFAULT_SCALE}%`;
controlScaleSmaller.addEventListener('click', (evt) =>{
  evt.preventDefault();
  value -= STEP_SCALE;
  if (value < MIN_SCALE) {
    value = MIN_SCALE;
  }
  controlValue.value = `${value}%`;
  imageUploadPrewier.style.transform = `scale(${value / 100})`;
});
controlScaleBigger.addEventListener('click', (evt) =>{
  evt.preventDefault();
  value += STEP_SCALE;
  if (value > MAX_SCALE) {
    value = MAX_SCALE;
  }
  controlValue.value = `${value}%`;
  imageUploadPrewier.style.transform = `scale(${value / 100})`;
});
export {resetScale};
