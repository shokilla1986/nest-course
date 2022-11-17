import { News } from '../api/dto/news.dto';
import { commentsTemplate } from './comments';

export const newsTemplate = (news: News[]) => {
  if (news?.length === 0) {
    return emptyNews();
  }
  let html = '<div class="row">';
  for (const newsItem of news) {
    html += `
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${newsItem.name}</h5>

            <h6 class="card-subtitle mb-2 text-muted">
            Дата создания: ${newsItem.createdAt}
            </h6>
            <p class="card-text">${newsItem.description}</p>
            <div>${commentsTemplate(newsItem.comments)}</div>
            </div>
          </div>
        </div>
        `;
  }
  html += '</div>';
  return html;
};
const emptyNews = () => {
  return `<h1>Список постов пуст!</h1>`;
};
