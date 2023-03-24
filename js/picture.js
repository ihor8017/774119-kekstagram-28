import {createListUsersPhotos} from './data.js';

const newPicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const userPicturesFragment = document.createDocumentFragment();
const listUsersPhotos = createListUsersPhotos();

listUsersPhotos.forEach(({id, comments, url, likes}) => {
  const userPhoto = newPicture.cloneNode(true);
  userPhoto.querySelector('.picture__comments').textContent = comments.length;
  userPhoto.querySelector('.picture__likes').textContent = likes;
  userPhoto.querySelector('.picture__img').src = url;
  userPhoto.dataset.thubnailId = id;
  userPicturesFragment.appendChild(userPhoto);
});
export {listUsersPhotos};
export {userPicturesFragment};
