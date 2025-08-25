import { comments } from "./comments.js";
import { initLikeListeners, initReplayListeners } from "./initListeners.js";

export const renderComments = () => {
  
  const container = document.querySelector(".container");
  const commentsHtml = comments
        .map((comment, index) => {
            return `
        <li class="comment" data-index="${index}">
           <div class="comment-header">
              <div>${comment.name}</div>
              <div id="date">${new Date(comment.date).toLocaleDateString()}</div>
           </div>
           <div class="comment-body">
              <div class="comment-text">${comment.text}</div>
           </div>
           <div class="comment-footer">
             <div class="likes">
               <span class="likes-counter">${comment.likes}</span>
               <button 
               data-index="${index}" 
               class="like-button ${comment.isLiked ? "-active-like" : ""}">
               </button>
             </div>
           </div>
         </li>
         `;
     }) 
    .join("");

  const addCommentsHtml = `
      <ul class="comments">
      </ul>
      <div class="add-form">
        <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          id="name-input"
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
          id="text-input"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button">Написать</button>
          <div id="date"></div>
        </div>
      </div>
      <div class="form-loading" style="display: none; margin-top: 20px;">
        коментарий добавляется...
      </div>`
  const linkToLoginText = `<p>чтобы отправить комментарий, <span class="link-login">войдите</span><p>`
  const baseHtml = `
  <ul class="comments">${commentsHtml}</ul> 
  ${linkToLoginText}
  `
  // добавляю в контейнер разметку
  container.innerHTML = baseHtml
  initLikeListeners(renderComments);
  initReplayListeners();
};
