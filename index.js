import { fetchComments } from './modules/api.js'
import { updateComments } from './modules/comments.js'
import { renderComments } from './modules/renderComments.js'

export const fetchAndRenderComments = (ifFirstLoading) => {
    if (ifFirstLoading) {
        document.querySelector('.container').innerHTML =
            `<p>Пожалуйста подождите, загружаю комментарии...</p>`
    }
    fetchComments().then((data) => {
        updateComments(data)
        renderComments()
    })
}
fetchAndRenderComments(true)
