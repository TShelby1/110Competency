import "./productInCart.css";
const ProductInCart = (props) => {
    const getTotal = () => {
        return "$" + (props.info.price * props.info.quantity).toFixed(2);
    };
    return(
        <div className="prod-cart">
            <div className="cart-img">
            <h5>{props.info.title}</h5>
            <img src={"/images/" + props.info.image} alt="product"></img>
            </div>
            

            <div className="cart-info">
                <h1>Cart Information:</h1>
                <div className="prod-info">
                    <label>{"Price: " + props.info.price.toFixed(2)}</label>
                    <label>{"Quantity: " + props.info.quantity}</label>
                    <label>{"Total: " + getTotal()}</label>
                </div>
            <div className="cart-btn">
                    <button className="btn btn-sm btn-danger">Delete</button>
                </div>
                

                

            </div>
        
            
        </div>
    );
};

export default ProductInCart;