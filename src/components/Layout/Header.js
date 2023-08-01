import React from "react";
import classes from "./Header.module.css"
import mealsimage from "../../assets/meals.jpg"
import HeaderCart from "./HeaderCart";
const Header=()=>{
    return(
        <React.Fragment>
            <header className={classes.heading}>
                <h1>ReactMeals</h1>
                <HeaderCart/>
            </header>
            <div className={classes.image}>
                <img src={mealsimage} alt='A table full of delicious food!' />
            </div>
        </React.Fragment>
    )
}
export default Header