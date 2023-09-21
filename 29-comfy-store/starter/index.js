// global imports
import './src/toggleSidebar.js';
import './src/cart/toggleCart.js';
import './src/cart/setupCart.js';
// specific imports
import fetchProducts from './src/fetchProducts.js';
import { setupStore, store } from './src/store.js';
import display from './src/displayProducts.js';
import { getElement } from './src/utils.js';

const init = async() => {
    const products = await fetchProducts()
    // console.log(products)
    // [
    //     {
    //         "id": "rec43w3ipXvP28vog",
    //         "fields": {
    //             "company": "ikea",
    //             "colors": [
    //                 "#f15025",
    //                 "#222"
    //             ],
    //             "featured": true,
    //             "price": 999,
    //             "name": "high-back bench",
    //             "image": [
    //                 {
    //                     "id": "attcvDDMikF6G2iNi",
    //                     "width": 1000,
    //                     "height": 639,
    //                     "url": "https://course-api.com/images/store/product-1.jpeg",
    //                     "filename": "product-1.jpeg",
    //                     "size": 62864,
    //                     "type": "image/jpeg",
    //                     "thumbnails": {
    //                         "small": {
    //                             "url": "https://course-api.com/images/store/product-1.jpeg",
    //                             "width": 56,
    //                             "height": 36
    //                         },
    //                         "large": {
    //                             "url": "https://course-api.com/images/store/product-1.jpeg",
    //                             "width": 801,
    //                             "height": 512
    //                         },
    //                         "full": {
    //                             "url": "https://course-api.com/images/store/product-1.jpeg",
    //                             "width": 3000,
    //                             "height": 3000
    //                         }
    //                     }
    //                 }
    //             ]
    //         }
    //     },
    //     ...
    if (products) {
        setupStore(products)
        const featured = store.filter((product) => product.featured === true)
        display(featured, getElement('.featured-center'))
    }
}

window.addEventListener('DOMContentLoaded', init)