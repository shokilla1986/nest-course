import { Comment } from '../api/dto/comments.dto';

export const commentsTemplate = (comments: Comment[]) => {
  if (comments?.length === 0) {
    return emptyComment();
  }
  let html = '<div class="row">';
  for (const commentItem of comments) {
    html += `
<div class="col-lg-6">
<div class="card">
<div class="card-body">
<h5 class="card-title">${commentItem.id}</h5>

<h6 class="card-subtitle mb-2 text-muted">
Дата создания: ${commentItem.createdAt}
</h6>
<p class="card-text">${commentItem.text}</p>
</div>
</div>
</div>
`;
  }
  html += '</div>';
  return html;
};
const emptyComment = () => {
  return `<h1>Список комментов пуст!</h1>`;
};
