import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css"
const BackDrop=(props)=>{
    return(
        <div className={classes.Overlay} onClick={()=>{props.onClose()}}></div>
    )
}
const Overlay=(props)=>{
    return(
        <div className={classes.Modal}>
            {props.children}
        </div>
    )
}
const Modal=(props)=>{
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<BackDrop onClose={()=>props.CartState(false)}/>,document.getElementById("root-backdrop"))}
            {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>,document.getElementById("root-backdrop"))}            
        </React.Fragment>
    )
}
export default Modal