const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadPrewier = imageUploadForm.querySelector('.img-upload__preview img');
const slider = imageUploadForm.querySelector('.effect-level__slider');
const effectLevelValue = imageUploadForm.querySelector('.effect-level__value');
const effectsList = imageUploadForm.querySelector('.effects__list');
const imageEffectLevel = imageUploadForm.querySelector('.img-upload__effect-level');
let effectName = ' ';

const SLIDER_PREFERENCE = [ {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
},
{
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
},
{
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
},
{
  range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
  connect: 'lower',
},
{
  range: {
    min: 1,
    max: 3,
  },
  start: 3,
  step: 0.1,
  connect: 'lower',
}
];
const createSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to:  (value) => Number.isInteger(value)
        ? value.toFixed(0)
        : value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });
};

let measure = '';
function createStyleEffect() {
  slider.noUiSlider.on('update', () => {
    const gettingSliderValue = slider.noUiSlider.get();
    effectLevelValue.value = gettingSliderValue;
    imageUploadPrewier.style.filter = `${effectName}(${gettingSliderValue}${measure})`;
  });
}
const showSlider = () => {
  imageEffectLevel.classList.remove('hidden');
};
const resetSlider = () => {
  imageEffectLevel.classList.add('hidden');
  imageUploadPrewier.style.filter = 'none';
};

const onChangeSlider = () => {
  imageEffectLevel.classList.remove('.hidden');
  switch (effectName) {
    case 'none': resetSlider();
      break;
    case 'chrome': slider.noUiSlider.updateOptions(SLIDER_PREFERENCE[0]);
      showSlider();
      effectName = 'grayscale';
      createStyleEffect();
      break;
    case 'sepia': slider.noUiSlider.updateOptions(SLIDER_PREFERENCE[1]);
      showSlider();
      createStyleEffect();
      break;
    case 'marvin': slider.noUiSlider.updateOptions(SLIDER_PREFERENCE[2]);
      showSlider();
      effectName = 'invert';
      measure = '%';
      createStyleEffect();
      break;
    case 'phobos': slider.noUiSlider.updateOptions(SLIDER_PREFERENCE[3]);
      showSlider();
      effectName = 'blur';
      measure = 'px';
      createStyleEffect();
      break;
    case 'heat': slider.noUiSlider.updateOptions(SLIDER_PREFERENCE[4]);
      showSlider();
      effectName = 'brightness';
      createStyleEffect();
      break;
  }
};

createSlider();
effectsList.addEventListener('change', (evt) => {
  const choosenEffect = evt.target.classList.contains('effects__radio');
  if (!choosenEffect) {
    return ;
  }
  effectName = evt.target.value;
  measure = '';
  onChangeSlider();
});
export {resetSlider};
