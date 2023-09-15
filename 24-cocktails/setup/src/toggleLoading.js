import get from './getElement.js'

const loading = get('.loading')
console.log(loading)

// <article class="loading">
//     <img src="./loading.gif" alt="loading">
// </article>

export const showLoading = () => {
    loading.classList.remove('hide-loading')
}

export const hideLoading = () => {
    loading.classList.add('hide-loading')
}