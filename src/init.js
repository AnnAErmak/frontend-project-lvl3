// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from 'yup';

const init = () => {
  const state = {
    formURL: {
      isValid: false,
      errors: [],
    },
    listsFeeds: [],
  };
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { url } = form.elements;
    // eslint-disable-next-line no-use-before-define
    isValid(url.value, state);
  });
};
function isValid(url, state) {
  const urlSchema = yup.string().min(1).url();
  console.log(urlSchema.isValidSync(url));
  console.log(state.listsFeeds.includes(url));
}
export default init;
