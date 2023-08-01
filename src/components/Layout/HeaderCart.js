import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCart.module.css"
import Button from "../UI/Button";
import Carticon from "../../assets/CartIcon"
import Modal from "../UI/Modal";
import Cart from "../Cart/Cart"
import cartContext from "../../store/Cart-context";
const HeaderCart=()=>{
    const ctx=useContext(cartContext)
    const [CartIsOpen,CartState]=useState(false);
    const [ButtonClass,ChangeClass]=useState(classes.HeaderCart)
    useEffect(()=>{
        ChangeClass(`${classes.HeaderCart} ${classes.bump}`);
        const timer=setTimeout(()=>ChangeClass(`${classes.HeaderCart}`),300);
        return ()=>{clearTimeout(timer)}
    },[ctx.totalCount])
    return (
        <React.Fragment>
            <Button className={ButtonClass} onClick={()=>{CartState(true)}}>
                <span className={classes.icon}><Carticon/></span>
                <span>Your Cart</span>
                <span className={classes.cartItemsCount}>{ctx.totalCount}</span>
            </Button>
            {CartIsOpen===true&&<Modal CartState={CartState}><Cart CartState={CartState}/></Modal>}
        </React.Fragment>
    )
}
export default HeaderCart