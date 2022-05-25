
export const handleAddToCartOrFav = (e, item) => {
    e.preventDefault();
    const product = {
        _id: item._id,
        name: item.name,
        price: item.price,
        description: item.description ,
        image: item.image,
    };
    return product
}

export const handleRemoveFromCart = (e, item) => {
    e.preventDefault();
    const product = {
        id: item.id,
        name: item.name,
        price: item.price,
    };
    return product
}