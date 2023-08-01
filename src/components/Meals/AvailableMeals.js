import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/useHttp";
  
const AvailableMeals=()=>{
    const {isLoading,errors,sendRequest}=useHttp();
    const [MEALS,addMeals]=useState([]);
    useEffect(()=>{
      sendRequest({url:'https://react-http-c7725-default-rtdb.firebaseio.com/meals.json'},(data)=>{
        for(const key in data){
          const newMeal={
            id:data[key].id,
            name:data[key].name,
            price:data[key].price,
            description:data[key].description,
          }
          addMeals((prev)=>{return [...prev,newMeal]})
        }
    });
    },[sendRequest])
    return (
        <Card>
            {isLoading&&<p>Loading...</p>}
            {errors!==""&&<p>{errors}</p>}
            {MEALS.map((item)=>{
                return (<MealItem item={item} id={item.id} key={item.id}/>)
            })}
        </Card>
    )
}
export default AvailableMeals