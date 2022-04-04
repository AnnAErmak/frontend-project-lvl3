import i18next from 'i18next';
import render from './render.js';

const init = () => {
  const state = {
    formURL: {
      isValid: false,
      errors: [],
    },
    feeds: [],
    posts: [],
  };

  i18next
    .init({
      lng: 'ru',
      debug: true,
      resources: {
        ru: {
          translation: {
            error: 'Ресурс не содержит валидный RSS',
            errorDel: 'RSS уже существует',
            errorURL: 'Ссылка должна быть валидным URL',
            sucsses: 'RSS успешно загружен',
          },
        },
      },
    })
    .then((t) => { t('key'); });

  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { url } = form.elements;
    render(url.value, state, i18next);
  });
};

export default init;
