/* eslint-disable @typescript-eslint/no-unused-vars */
import { comments } from "./modules/comments.js";
import { renderComments } from "./modules/renderComments.js";
import { sanitizeHTML } from "./modules/sanitizeHTML.js";


export const initLikeListeners = (renderComments) => {

    const likeButtons = document.querySelectorAll(".like-button");
    for (const likeButton of likeButtons) {
      likeButton.addEventListener("click", () => {
         event.stopPropagation();
         const index = likeButton.dataset.index;
         const comment = comments[index];

         comment.likes = comment.isLiked 
         ? comment.likes - 1
         : comment.likes + 1;

         comment.isLiked = !comment.isLiked;
         renderComments();

        });
    };
}

export const initReplayListeners = () => {
    const text = document.getElementById("text-input");
    const commentElements = document.querySelectorAll(".comment");
    for (const commentElement of commentElements) {
      commentElement.addEventListener("click", () => {
        const currentComment = comments[commentElement.dataset.index];
        text.value = `${currentComment.name}:${currentComment.text}`;
    });
    };
}

export const initAddCommentListener = (renderComments) => {
   const name = document.getElementById("name-input");
   const text = document.getElementById("text-input");
   const addButton = document.querySelector(".add-form-button");
    addButton.addEventListener("click", () => {
     const currentDate = new Date();
     const day = currentDate.getDate().toString().padStart(2, '0');
     const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Месяцы в JS от 0 до 11
     const year = currentDate.getFullYear();
     const hours = currentDate.getHours().toString().padStart(2, '0');
     const minutes = currentDate.getMinutes().toString().padStart(2, '0');
     const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

      if (!name.value.trimStart().trimEnd() || !text.value.trimStart().trimEnd()) {
        name.style = 'background: red';
        text.style = 'background: red';
        return;
      };
      const newComment = {
        name: sanitizeHtml(name.value.trimStart().trimEnd()),
        date: `${formattedDate}`,
        text: sanitizeHtml(text.value.trimStart().trimEnd()),
        likes: 0,
        isLiked: false,
      };
      comments.push(newComment);

      renderComments();

      name.value = "";
      text.value = "";

    });
}