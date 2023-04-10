const FILES_TYPES = ['jpg', 'jpeg', 'png'];
const imageUploadInput = document.querySelector('.img-upload__input');
const imagePreview = document.querySelector('.img-upload__preview img');
const uploadUserPhoto = () => {
  const file = imageUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILES_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
  }
};
export {uploadUserPhoto};
