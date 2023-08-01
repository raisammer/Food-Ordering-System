import React, { useContext, useState } from "react";
import useHttp from "../../hooks/useHttp";
import cartContext from "../../store/Cart-context";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./Cart.module.css"
import CartItem from "./CartItem/CartItem";
import CheckoutForm from "./CheckoutForm";

const Cart=(props)=>{
    const {sendRequest,errors,isLoading}=useHttp();
    const ctx=useContext(cartContext);
    const [Checkout,setCheckout]=useState(false);
    const [Message,showMessage]=useState(false);
    const [Ordered,setOrdered]=useState(false);
    const onSubmitHandler=async(userData)=>{
        await sendRequest({
            url:"https://react-http-c7725-default-rtdb.firebaseio.com/orders.json",
            method:"POST",
            body:{userData:userData,order:ctx.items}},(data)=>{console.log(data)}
        )
        ctx.clear();
        setOrdered(true);
    }
        const beforeOrder=(
            <React.Fragment>
                <div className={`${classes.Items} ${Checkout&&classes.ItemsCheckout}`}>
                    {ctx.items.map((item)=>{
                        return(<CartItem id={item.id} name={item.name} price={item.price} amount={item.amount} key={item.id}/>)
                    })}
                </div>
                <div className={classes.total}>
                    <h2>Total Amount</h2>
                    <h2>₹{ctx.totalAmount.toFixed(2)}</h2>
                </div>
                {Checkout&&<div className={classes.Checkout}>
                    <CheckoutForm CartState={props.CartState} onSubmitHandler={onSubmitHandler}/>
                </div>}
                {Message&&<p>Please add Items to your Cart!</p>}
                {!Checkout&&<div className={classes.CartButtons}>
                    <Button className={classes.Button}  onClick={()=>{
                        ctx.items.length!==0?setCheckout(true):showMessage(true)
                    }}>Order</Button>
                    <Button className={`${classes.Button} ${classes.close}`} onClick={()=>props.CartState()}>Close</Button>
                </div>}
            </React.Fragment>
        )
        const afterOrder=(
            <React.Fragment>
                {isLoading?
                    <p>Confirming your Order...</p>:
                    errors===""?
                        <p>Successfully sent the order</p>:
                        <p>Order was unsuceessfull. Please Try Again</p>
                }
                <Button className={`${classes.Button}`} onClick={()=>props.CartState()}>Close</Button>
            </React.Fragment>
        )
    return (
        <Card className={classes.Card}>
            {Ordered?afterOrder:beforeOrder}
        </Card>
    )
}
export default Cart