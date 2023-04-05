import {createListUsersPhotos} from './data.js';

const newPicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');
let listUsersPhotos;
const userPicturesFragment = document.createDocumentFragment();
const renderGallery = (listPhotos) => {
  listPhotos.forEach(({id, comments, url, likes}) => {
    const userPhoto = newPicture.cloneNode(true);
    userPhoto.querySelector('.picture__comments').textContent = comments.length;
    userPhoto.querySelector('.picture__likes').textContent = likes;
    userPhoto.querySelector('.picture__img').src = url;
    userPhoto.dataset.thubnailId = id;
    userPicturesFragment.appendChild(userPhoto);
  });
  const userPictures = document.querySelector('.pictures');
  userPictures.appendChild(userPicturesFragment);
  listUsersPhotos = listPhotos;
};

export {renderGallery, listUsersPhotos};
