import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
    const priceInput = getElement('.price-filter')
    const priceValue = getElement('.price-value')

    let maxPrice = store.map((product) => product.price)
    // console.log(maxPrice)
    // [
    //     999,
    //     7999,
    //     2599,
    //     4599,
    //     699,
    //     6999,
    //     899,
    //     2199,
    //     3995,
    //     2998,
    //     1099,
    //     999
    // ]
    maxPrice = Math.max(...maxPrice)
    maxPrice = Math.ceil(maxPrice / 100)
    // console.log(maxPrice) // 80

    priceInput.value = maxPrice
    priceInput.max = maxPrice
    priceInput.min = 0
    priceValue.textContent = `Value: $${maxPrice}`

    priceInput.addEventListener('input', () => {
        const value = parseInt(priceInput.value)
        priceValue.textContent = `Value : $${value}`
        let newStore = store.filter((product) => product.price / 100 <= value)
        display(newStore, getElement('.products-container'), true)
        if (newStore.length < 1) {
            const products = getElement('.products-container')
            products.innerHTML = `<h3 class="filter-error">sorry, no products matched your search</h3>`;
      
        }
    })
};

export default setupPrice;
