export const adaptProductsList = products => {

    return products
        .filter(product => product.name && product.price && product.id)
        .map(({ price, ...rest }) => ({ ...rest, price: +price }));
};
