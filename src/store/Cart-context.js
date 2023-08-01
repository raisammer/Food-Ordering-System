import React from "react";
const cartContext=React.createContext({
    items:[],
    totalAmount:0,
    totalCount:0,
    addItem:()=>{},
    removeItem:()=>{},
    clear:()=>{}
})
export default cartContext;
