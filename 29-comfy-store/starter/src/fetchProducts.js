import { allProductsUrl } from './utils.js';

const fetchProducts = async () => {
    const response = await fetch(allProductsUrl).catch((err) => console.log(err))
    // const data = await response.json()
    // 일반적으로 이렇게 쓰지 않았었나?????????
    if (response) {
        return response.json()
    }
    return response
};

export default fetchProducts;
