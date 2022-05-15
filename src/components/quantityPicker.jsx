import React from "react";
import "./quantity.css";

const QuantityPicker = (props) => {
  let [quantity, setQuantity]=React.useState(1); //state variable. you use a variable and function for the let syntax in here, state variables are not allowed to me modified directly. quantity is = 1, dont effect the state directly, you use the setQuantity method, to 2,3,4, etc. variable was never modified, it was removed and another was created. do not modify the value in react
    
  const handleIncrease = () => {
    let nextQuantity = quantity + 1;
    setQuantity(nextQuantity);
    props.onChange(nextQuantity);
    
  };

  const handleDecrease = () => {
    let nextQuantity=quantity-1;
    if(nextQuantity>0){
      setQuantity(quantity -1);
      props.onChange(nextQuantity);
        
    };
    
  };

  
  return (

    <div className="quantity-picker">

      <button onClick={handleIncrease} className="btn btn-sm ">
        +
      </button>

      <label>{quantity}</label>

      <button onClick={handleDecrease} className="btn btn-sm ">
        -
      </button>

    </div>
  );
};

export default QuantityPicker;
