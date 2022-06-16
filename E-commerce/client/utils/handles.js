
export const handleAddToCartOrFav = (e, item) => {
    e.preventDefault();
    const product = {
        _id: item._id,
        name: item.name,
        price: item.price,
        description: item.description ,
        image: item.image,
        quantity: item.quantity,
        category: item.category,
        rating: item.rating
    };
    return product
}

export const handleRemoveFromCart = (e, item) => {
    e.preventDefault();
    const product = {
        _id: item._id,
        name: item.name,
        price: item.price,
    };
    return product
}

export const handleRemoveFromFav = (item) => {
    const product = {
        _id: item._id,
        name: item.name
    };
    return product
}