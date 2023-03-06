import {getRandomInteger, createRandomIdFromRangeGenerator, getRandomArrayElements} from './util.js';

const COMMENTS_TEMPLATES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PHOTO_DESCRIPTIONS = [
  'Show must go on. Я требую продолжения банкета.',
  'Выходные, пожалуйста, не оставляйте меня сейчас!',
  'Лучшее еще впереди',
  'Первый день в спортзале. Сдаюсь тренеру: «Ломай меня полностью»',
  'Знали бы вы, что у меня на уме.',
  'Можно ли быть более ленивым, чем мой кот?',
  'Жизнь, однако, хороша — кушай завтрак не спеша.'
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const idPhotoDescription = createRandomIdFromRangeGenerator(1, 25);
const idMessage = createRandomIdFromRangeGenerator(1, 200);
const idPhoto = createRandomIdFromRangeGenerator(1, 25);


const createMessage = () => {
  const numberOfMessage = getRandomInteger(0, 1);
  return {
    id: idMessage(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: (numberOfMessage) ? getRandomArrayElements(COMMENTS_TEMPLATES, 2) :
      getRandomArrayElements(COMMENTS_TEMPLATES, 1),
    name: getRandomArrayElements(NAMES, 1),
  };
};

const createPhotoDescription = () => ({
  id: idPhotoDescription(),
  url: `photos/${ idPhoto()}.jpg`,
  description: getRandomArrayElements(PHOTO_DESCRIPTIONS, 1),
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(1, 10) }, createMessage)
});

const createListUsersPhotos = () => Array.from({ length: 25 }, createPhotoDescription);

export {createListUsersPhotos};
