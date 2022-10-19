import { products } from '../data/products';

export const getProducts = (publisher) => {
    const validPublisher = ['DC Comics', 'Marvel Comics'];
    if (!validPublisher.includes(publisher)) {
        throw new Error(`${publisher} no existe`);
    }
    return products.filter(heroe => heroe.publisher === publisher);
};