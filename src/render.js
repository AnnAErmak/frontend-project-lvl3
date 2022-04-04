import * as yup from 'yup';
import axios from 'axios';

function isValidUrl(url) {
  const urlSchema = yup.string().min(1).url();
  return urlSchema.isValidSync(url);
}
function renderPostAndFeeds(state) {
  const { posts } = state;
  const renderPosts = posts.map((post) => `<li class="list-group-item"><a href=${post.link}>${post.title}</a></li>`);
  const htmlPoasts = `
    <div class="card w-100" style="width: 18rem;">
      <div class="card-header">
          Посты
      </div>
      <ul class="list-group list-group-flush">
        ${renderPosts.join('')}
      </ul>
  </div>
  `;
  const p = document.querySelector('.posts');
  p.innerHTML = htmlPoasts;
  const { feeds } = state;

  const renderFeeds = feeds.map((fe) => `<p>${fe.title}</p>
        <p>${fe.des}</p>
    `);

  const htmlFeeds = `
    <div class="card w-100" style="width: 18rem;">
      <div class="card-header">
          Фиды
      </div>
      ${renderFeeds.join('')}
  </div>
  `;
  const f = document.querySelector('.feeds');
  f.innerHTML = htmlFeeds;
}
function fn1(data, state) {
  console.log(data);
  const postsDoc = data.querySelectorAll('item');
  const feedTitle = data.querySelector('title');
  const feedDescrip = data.querySelector('description');
  state.feeds.push({ title: feedTitle.textContent, des: feedDescrip.textContent, idFeed: state.feeds.length + 1 });
  // console.log(feedTitle.textContent, feedDescrip.textContent)
  postsDoc.forEach((post) => {
    const titlePost = post.querySelector('title').textContent;
    const linkPost = post.querySelector('link').textContent;
    state.posts.push({
      title: titlePost,
      link: linkPost,
      idPost: state.posts.length + 1,
      idFeed: state.feeds[0].idFeed,
    });
  });
  renderPostAndFeeds(state);
}
function parseXML(data) {
  const parser = new DOMParser();
  const document = parser.parseFromString(data, 'application/xml');

}
export default function (url, state, i18nextInstance) {
  const feedback = document.querySelector('.feedback');
  feedback.innerHTML = '';
  if (!isValidUrl(url)) {
    feedback.textContent = i18nextInstance.t('errorURL');
    return;
  }
  axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then((response) => {
      if (response.data.status.http_code !== 200) {
        feedback.textContent = i18nextInstance.t('error');
        return;
      }
      parseXML(response.data.contents, state);
    })
    .catch((err) => console.error(err.message));
}
