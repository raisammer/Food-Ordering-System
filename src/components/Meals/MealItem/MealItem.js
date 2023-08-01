import React, { useContext, useRef, useState } from "react";
import classes from "./MealItem.module.css"
import Button from "./../../UI/Button"
import cartContext from "../../../store/Cart-context";
const MealItem=(props)=>{
    const [validState,ChageState]=useState(true);
    const amountInputRef=useRef();
    const ctx=useContext(cartContext);
    const addItem=(event)=>{
        event.preventDefault();
        ctx.addItem({
            id:props.item.id,
            amount:+amountInputRef.current.value,
            name:props.item.name,
            price:props.item.price
        })
    }
    const onChange=()=>{
        if(amountInputRef.current.value>5||amountInputRef.current.value<1){
            ChageState(false);
        }
        else{
            ChageState(true);
        }
    }
    return (
        <section className={classes.MealItem}>
            <div>
                <h3>{props.item.name}</h3>
                <div className={classes.description}>{props.item.description}</div>
                <div className={classes.price}>₹{props.item.price}</div>
            </div>
            <form onSubmit={addItem}>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input defaultValue="1" type="number" id="amount" ref={amountInputRef} min="1" max="5" onChange={onChange}/>
                    <Button className={classes.Button}>+Add</Button>
                </div>
                {!validState && <p>Please enter a valid amount (1-5).</p>}
            </form>
        </section>
    )
}
export default MealItem