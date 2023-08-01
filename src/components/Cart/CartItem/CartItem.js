import React, { useContext } from "react";
import cartContext from "../../../store/Cart-context";
import classes from "./CartItem.module.css"
const CartItem=(props)=>{
    const ctx=useContext(cartContext);
    const item={
        name:props.name,
        price:props.price,
        id:props.id,
        amount:1
    }
    return (
        <section className={classes.CartItem}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>
                    <div className={classes.price}>
                        ₹{props.price}
                    </div>
                    <div className={classes.quantity}>
                        x{props.amount}
                    </div>
                </div>
                
            </div>
            <div>
                <button onClick={()=>ctx.removeItem(props.id)}>-</button>
                <button onClick={()=>ctx.addItem(item)}>+</button>
            </div>
        </section>
    )
}
export default CartItem