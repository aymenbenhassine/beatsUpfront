export default (cartItems = [], action) => {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            // const item = action.payload;
            // const existItem = state.cartItems.find((x) => x.product === item.product);

            // if (existItem) {
            //     return {
            //         ...state,
            //         cartItems: state.cartItems.map((x) =>
            //             x.product === existItem.product ? item : x
            //         ),
            //     };
            // } else {
            return [...cartItems, action.payload];
        default :
            return cartItems;
    }
};