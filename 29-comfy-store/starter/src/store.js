import { getStorageItem, setStorageItem } from './utils.js';
let store = getStorageItem('store');

const setupStore = (products) => {
    store = products.map((product) => {
        const { id, fields: { featured, name, price, company, colors, image: img } } = product
        const image = img[0].thumbnails.large.url
        return { id, featured, name, price, company, colors, image }
    })
    // console.log(store)
    // [
    //     {
    //         "id": "rec43w3ipXvP28vog",
    //         "featured": true,
    //         "name": "high-back bench",
    //         "price": 999,
    //         "company": "ikea",
    //         "colors": [
    //             "#f15025",
    //             "#222"
    //         ],
    //         "image": "https://course-api.com/images/store/product-1.jpeg"
    //     },
    //     ...
    setStorageItem('store', store)
};

const findProduct = (id) => {
    let product = store.find((product) => product.id === id)
    return product
};

export { store, setupStore, findProduct };
