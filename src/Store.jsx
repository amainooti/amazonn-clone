import { createContext, useReducer } from "react";
import logger from 'use-reducer-logger';


export const Store = createContext()

const initialState = {

    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    cart: {
        shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : null,
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : []
    }
}


const reducer = (state, action) => {
    switch (action.type) {
        case "CART_ADD_ITEM": {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(item => item._id === newItem._id);
            const cartItems = existItem ? state.cart.cartItems.map(item => item._id === existItem._id ? newItem : item)
                : [...state.cart.cartItems, newItem]
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: {...state.cart, cartItems }}
        }
        case "CART_REMOVE_ITEM": {
            const cartItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } }
        }
        case "USER_SIGNIN":
            return { ...state, userInfo: action.payload }
        case "USER_SIGNOUT":
            return { ...state, userInfo: null }
        case "SAVE_SHIPPING_ADDRESS":
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress: action.payload
            } }
        default:
            return state;
    }
}


export const StoreProvider = (props) => {
    const [state, dispatch] = useReducer(logger(reducer), initialState)
    const value = { state, dispatch }

    return <Store.Provider value={value}> {props.children} </Store.Provider>
}



// @STEPS TO CREATING A STORE WITH CONTEXT HOOK
// create a context
// create a reducer and initial states
// create a context wrapper that takes in props
// use the reducer hook and destructure stata and dispatch
// bind them to a value varia9ble and pass them into the value prop of the context.Provider method