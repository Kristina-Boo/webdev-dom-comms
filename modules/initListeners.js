
import { postComment } from "./api.js";
import { comments, updateComments } from "./comments.js";
import { sanitizeHTML } from "./sanitizeHTML.js";


export const initLikeListeners = (renderComments) => {

    const likeButtons = document.querySelectorAll(".like-button");

    for (const likeButton of likeButtons) {
      likeButton.addEventListener("click", (event) => {
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


      if (!name.value.trimStart().trimEnd() || !text.value.trimStart().trimEnd()) {
        name.style = 'background: red';
        text.style = 'background: red';

        setTimeout(() => {
            name.style = 'background: white';
            text.style = 'background: white';
          }, 2000)

        return;
      };

      document.querySelector('.form-loading').style.display= 'block'
      document.querySelector('.add-form').style.display= 'none'
 
      postComment(sanitizeHTML(text.value.trimStart().trimEnd()), sanitizeHTML(name.value.trimStart().trimEnd()))
      .then(
        (data) => {
          document.querySelector('.form-loading').style.display= 'none'
          document.querySelector('.add-form').style.display= 'flex'

          updateComments(data)
          renderComments()
          name.value = "";
          text.value = "";

        },
      ).catch((error) => {

        document.querySelector('.form-loading').style.display = 'none'
        document.querySelector('.add-form').style.display = 'flex'

        if (error.message === 'Failed to fetch') {
          return alert('Нет интернета, попробуйте снова')
        }

        if (error.message === 'Ошибка сервера') {
          return alert('Ошибка сервера')
        }

        if (error.message === "Неверный запрос"){
          return alert('Имя и комментарий должны быть не короче трех символов')

          name.classList.add('-error')
          text.classList.add('-error')

          setTimeout(() => {
            name.classList.remove('-error')
            text.classList.remove('-error')
          }, 2000)

          
        }
        
      })

    })

      

    
}
