import * as api from '../../api';

//ADD TO CART
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await api.fetchProduitbyId();

    dispatch({
        type: 'CART_ADD_ITEM',
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};