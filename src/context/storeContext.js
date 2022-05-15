import React from 'react';
//describes the data that will be available on the store
// will not contain any data
let store = React.createContext({
    cart: [],
    user: {},
    addProdToCart: () => {},
    removeProdFromCart: () => {}

});

export default store;