// import React from 'react';
import "./admin.css";
import { useState, useEffect } from "react";
import DataService from '../services/dataService';
const Admin = () => {
  const [product, setProduct] = useState({});
  const [coupon, setCoupon] = useState({});
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [allCoupons, setAllCoupons] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    retrieveCoupons();
    retrieveProducts();
  }, []);

  const retrieveProducts = async () =>{
    let service = new DataService();
    let prods = await service.getCatalog();
    setAllProducts(prods);
  };

  const retrieveCoupons = async () => {
    let service = new DataService();
    let coupons = await service.getCoupons();
    console.log("all", coupons)
    setAllCoupons(coupons);
  };

  const handleTextChange = (e) => {
    let copy = { ...product };
    copy[e.target.name] = e.target.value;
    setProduct(copy);
  };

//when component loads, call a fn name retrieve Coupons
//console log their result

  const handleCouponChange = (e) => {
    let copy = {...coupon};
    copy[e.target.name] = e.target.value;
    setCoupon(copy);
  };

  const showError = (text) => {
    setErrorMessage(text);
    setErrorVisible(true);
  };

  const handleSaveProduct = async () => {
    

    if(product.title.length < 5){
      showError("Error, title should be at least 5 char");
      
       
        return;

    }
   
    if(!product.image){
      showError("Error, Need Image");
      
       
        return;
    }
    if(!product.category){
      showError("Error, category can not be empty");
      
       
        return;
    }

    let savedProduct = {...product};
    savedProduct.price = parseFloat(product.price);

    if(!savedProduct.price || savedProduct.price < 1){
      showError("Error, price should not be less than 1");
     
       
        return;
    }
    setErrorVisible(false);
    console.log(savedProduct)

    let service = new DataService();
    let res = await service.saveProduct(savedProduct);

    let copy = [...allProducts];
    copy.push(res);
    setAllProducts(copy);

    console.log(res);

    //send to server
  };

const handleSaveCoupon = async () => {
    

    let savedCoupon = {...coupon};
    savedCoupon.discount = parseFloat(savedCoupon.discount);

    if(savedCoupon.code.length < 5 ){
      console.log("Error, needs to be 5 characters");
        return;
    }

    if(!savedCoupon.discount || savedCoupon.discount > 35) {
      console.log("Error, can not be empty or greater than 35%");    //need to not send to server if error, use return();
        return;
    }
    setErrorVisible(false);
    console.log("Saving Coupon: ", savedCoupon);

    let service = new DataService();
    let res = await service.saveCoupon(savedCoupon);
    console.log(res)

    let copy = [...allCoupons];
    copy.push(res);
    setAllCoupons(copy);
    
};


  return (
    <div className="admin-page">
      {errorVisible ? <div className="alert alert-danger">  
        {errorMessage}
      </div> : null}
      <div className="sections-container">
        <section className="sec-products">
          <h2>Enter your products Here:</h2>
          <div className="form">
            <div className="my-control">
              <label>Title:</label>
              <input
                onChange={handleTextChange}
                name="title"
                type="text"
              ></input>
            </div>
            <div className="my-control">
              <label>Price:</label>
              <input
                onChange={handleTextChange}
                name="price"
                type="number"
              ></input>
            </div>
            <div className="my-control">
              <label>Image:</label>
              <input
                onChange={handleTextChange}
                name="image"
                type="text"
              ></input>
            </div>
            <div className="my-control">
              <label>Category:</label>
              <input
                onChange={handleTextChange}
                name="category"
                type="text"
              ></input>
            </div>
            <div className="my-control">
              <button onClick={handleSaveProduct} className="btn btn-light">
                Submit
              </button>
            </div>
          </div>
          <div className="prod-list">
            <ul>
              {allProducts.map(prod => <li key={prod._id}>{prod.title} - ${prod.price}</li>)}
            </ul>
          </div>
        </section>
        <section className="sec-coupons">
            <h2>Enter Coupons Here:</h2>
            <div className="form">
                <div className="my-control">
                    <label>Coupon Code:</label>
                        <input
                            onChange={handleCouponChange}
                            name="code"
                            type="text"
                        ></input>
                </div>

                <div className="my-control">
                    <label>Discount:</label>
                        <input
                            onChange={handleCouponChange}
                            name="discount"
                            type="number"
                        ></input>
                </div>

                <div className="my-control">
                    <button onClick={handleSaveCoupon} className="btn btn-light">
                        Submit
                    </button>
                </div>
            
            </div>

            <div className="coupon-list">
              <ul>
                {allCoupons.map(coupon => <li key={coupon._id}>{coupon.code} - {coupon.discount}</li>)}
              </ul>
            </div>
        </section>
      </div>
      
      
    </div>
  );
};

export default Admin;
