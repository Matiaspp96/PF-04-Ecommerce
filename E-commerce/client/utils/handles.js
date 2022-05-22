
export const handleAddToCartOrFav = (e, item) => {
    e.preventDefault();
    const product = {
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description ,
        category: item.category,
        image: item.image,
        rating: item.rating
    };
    return product
}