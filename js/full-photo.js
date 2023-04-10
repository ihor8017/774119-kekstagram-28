import {listUsersPhotos} from './picture.js';
import {isEscapeKey} from './util.js';
const COMMENTS_PER_PORTION = 5;
const userPictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const userComment = socialComments.querySelector('.social__comment');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
let shownComments = 0;
let commentsList;

const createNewComment = (comment) => {
  const newComment = userComment.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__text').textContent = comment.message;
  newComment.querySelector('.social__picture').alt = comment.name;
  return newComment;
};
const closeBigPicture = () => {
  shownComments = 0;
  document.removeEventListener('keydown', isEscape);
  commentsLoader.removeEventListener('click',addCommits);
};
const renderComments = (comments) => {
  shownComments += COMMENTS_PER_PORTION;
  const userCommentFragment = document.createDocumentFragment();
  if (shownComments >= comments.length) {
    shownComments = comments.length;
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click',addCommits);
  } else {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', addCommits);
  }
  for (let i = 0; i < shownComments; i++) {
    userCommentFragment.appendChild(createNewComment(comments[i]));
  }
  socialComments.innerHTML = '';
  socialComments.appendChild(userCommentFragment);
  socialCommentCount.innerHTML = `${shownComments} из <span class="comments-count">125</span> комментариев`;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
};
function addCommits () {
  renderComments(commentsList);
}

const showBigPictures = (thubnailId) => {
  socialComments.innerHTML = '';
  const {comments, url, likes, description} = thubnailId;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.classList.remove('hidden');
  renderComments(comments);
  commentsList = comments;
};
userPictures.addEventListener('click', (evt) => {
  const thubnail = evt.target.closest('[data-thubnail-id]');
  if (!thubnail) {
    return;
  }
  const thubnailId = listUsersPhotos.find(
    (element) => element.id === +thubnail.dataset.thubnailId
  );
  showBigPictures(thubnailId);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', isEscape);
});
function isEscape () {
  if (isEscapeKey) {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    closeBigPicture();
  }
}
const closeButton = document.querySelector('.big-picture__cancel');
closeButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.removeEventListener('click',addCommits);
  shownComments = 0;
});
