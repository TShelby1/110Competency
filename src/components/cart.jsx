import { useContext } from "react";
import store from "../context/storeContext";
import ProductInCart from "./productInCart";

import "./cart.css";

const Cart = () => {
  const cart = useContext(store).cart;
  const getTotal = () =>{
    let total = 0;
    for (let i =0; i < cart.length; i++){
      let prod= cart[i];
      total += (prod.quantity * prod.price);
    }
    return "$ " + total.toFixed(2);
  };

  return (
    <div className="cart">
      <div className="cart-heading">
        <h1>Your cart</h1>
        <h5>Currently you have {cart.length} products in the cart</h5>
      </div>
      

      <div className="cart-content">
        <div className="products">
        {cart.map((prod) => (<ProductInCart key={prod._id} info={prod}></ProductInCart>
        ))}
        </div>
        
      

      <div className="side-panel">
        <h6>Ready to Pay??</h6>
        <h5>{getTotal()}</h5>
        <hr />
        <button className="btn btn-block btn-primary">
          Submit Payment
        </button>
      </div>

      </div>
    </div>

    
  );
};

export default Cart;