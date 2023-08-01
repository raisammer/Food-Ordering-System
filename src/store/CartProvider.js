import React, { useReducer } from "react";
import CartContext from "./Cart-context";
const defaultCartState={
    items:[],
    totalAmount:0,
    totalCount:0
}
const cartReducer=(state,action)=>{
    if(action.type==="ADD"){
        const updatedTotalAmount=state.totalAmount+action.item.price*action.item.amount;
        const updatedTotalCount=state.totalCount+action.item.amount;
        const updatedItems=[...state.items]
        const Index=updatedItems.findIndex(element => {
            return (element.id===action.item.id)
        });
        if(Index!==-1)
            updatedItems[Index].amount+=action.item.amount;
        else
            updatedItems.push(action.item)
        console.log(updatedItems)
        return {items:updatedItems,totalAmount:updatedTotalAmount,totalCount:updatedTotalCount}
    }
    else if(action.type==="DELETE"){
        const updatedItems=[...state.items]
        const Index=updatedItems.findIndex(element => {
            return (element.id===action.id)
        });
        const updatedTotalAmount=state.totalAmount-updatedItems[Index].price;
        const updatedTotalCount=state.totalCount-1;
        if(updatedItems[Index].amount!==1)
            updatedItems[Index].amount-=1;
        else
            updatedItems.splice(Index,1);
        return {items:updatedItems,totalAmount:updatedTotalAmount,totalCount:updatedTotalCount}
    }
    else if(action.type==="CLEAR"){
        return defaultCartState
    }
    return defaultCartState
}
const CartProvider=(props)=>{
    const [cartState,dispatchCartAction]=useReducer(cartReducer,defaultCartState);
    const addItem=((item)=>{
        dispatchCartAction({type:"ADD",item:item})
    })
    const deleteItem=((id)=>{
        dispatchCartAction({type:"DELETE",id:id})
    })
    const clear=()=>{
        dispatchCartAction({type:"CLEAR"})
    }
    return(
        <CartContext.Provider value={{
            items:cartState.items,
            totalAmount:cartState.totalAmount,
            addItem:addItem,
            removeItem:deleteItem,
            totalCount:cartState.totalCount,
            clear:clear
        }}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartProvider