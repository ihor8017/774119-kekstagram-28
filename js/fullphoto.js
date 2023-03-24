import {userPicturesFragment, listUsersPhotos} from './picture.js';

const userPictures = document.querySelector('.pictures');
userPictures.appendChild(userPicturesFragment);
const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const userComment = socialComments.querySelector('.social__comment');

const showBigPictures = (thubnailId) => {
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const userCommentFragment = document.createDocumentFragment();
  socialComments.innerHTML = '';
  const {comments, url, likes} = thubnailId;

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  comments.forEach(({avatar, message, name}) => {
    const newComment = userComment.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__text').textContent = message;
    newComment.querySelector('.social__picture').alt = name;
    userCommentFragment.appendChild(newComment);
  });
  socialComments.appendChild(userCommentFragment);
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};
userPictures.addEventListener('click', (evt) => {
  const thubnail = evt.target.closest('[data-thubnail-id]');
  if (!thubnail) {
    return;
  }
  const thubnailId = listUsersPhotos.find((element) => element.id === +thubnail.dataset.thubnailId);
  showBigPictures(thubnailId);
  document.body.classList.add('modal-open');
});
const closeButton = document.querySelector('.big-picture__cancel');
closeButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
});

