import { useRef, useState } from "react"
import Button from "../UI/Button"
import classes from "./CheckoutForm.module.css"

const CheckoutForm=(props)=>{
    const nameInputRef=useRef();
    const addressInputRef=useRef();
    const postalInputRef=useRef();
    const cityInputRef=useRef();
    const [isValid,changeIsValid]=useState({
        name:true,
        address:true,
        city:true,
        postal:true
    })
    const isNotEmpty=(val)=>val.trim()!=="";
    const isSixChar=(val)=>val.trim().length===6;
    const onSubmit=(event)=>{
        event.preventDefault();
        const name=nameInputRef.current.value;
        const address=addressInputRef.current.value;
        const postal=postalInputRef.current.value;
        const city=cityInputRef.current.value;

        const nameIsValid=isNotEmpty(name);
        const addressIsValid=isNotEmpty(address);
        const postalIsValid=isSixChar(postal);
        const cityIsValid=isNotEmpty(city);
        changeIsValid({
            name:isNotEmpty(name),
            address:isNotEmpty(address),
            postal:isSixChar(postal),
            city:isNotEmpty(city)
        })
        if(nameIsValid&&addressIsValid&&postalIsValid&&cityIsValid){
            props.onSubmitHandler({
                name:name,
                address:address,
                postal:postal,
                city:city
            })
        }
    }
    return (
        <form className={classes.form} onSubmit={onSubmit}>
            <div className={`${classes.control} ${!(isValid.name)&&classes.invalid}`}>
                <label htmlFor="name">Your Name</label>
                <input id="name" type="text" ref={nameInputRef}/>
            </div>
            <div className={`${classes.control} ${!(isValid.address)&&classes.invalid}`}>
                <label htmlFor="address">Address</label>
                <input id="address" type="text" ref={addressInputRef}/>
            </div>
            <div className={`${classes.control} ${!(isValid.postal)&&classes.invalid}`}>
                <label htmlFor="postal">Postal Code</label>
                <input id="postal" type="number" minLength="6" maxLength="6" ref={postalInputRef}/>
            </div>
            <div className={`${classes.control} ${!(isValid.city)&&classes.invalid}`}>
                <label htmlFor="city">City</label>
                <input id="city" type="text" ref={cityInputRef}/>
            </div>
            <div className={classes.actions}>
                <Button onClick={()=>props.CartState()}>Close</Button>
                <Button type="submit" className={classes.submit}>Confirm</Button>
            </div>
        </form>
    )
}
export default CheckoutForm