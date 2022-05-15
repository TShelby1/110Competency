import axios from 'axios';

let mockCatalog = [
  { _id: "1", title: "Charter", category: "Experience", price: 50, image: "charter.jpg", description: "Go on an adventure" },
  { _id: "2", title: "Lures", category: "item", price: 8, image: "lures.jpg", description: "Top of the line lures" },
  { _id: "3", title: "Budget Lures", category: "item", price: 9, image: "lures2.jpg", description: "Budget Lures" },
  { _id: "4", title: "Poles", category: "item", price: 25, image: "poles.jpg", description: "Top of the line Poles" },
  { _id: "5", title: "Budget Poles", category: "Item", price: 45, image: "poles2.jpg", description: "Budget Poles" },
  { _id: "6", title: "Pond", category: "Experience", price: 1, image: "pond.jpg", description: "Best Pond to go to" },

];

class DataService {
  async getCatalog() {
    //get catalog from the server
    //return the list of products
       let response = await axios.get("http://127.0.0.1:5000/api/catalog"); //when it will take time to load. 
       
       return response.data;
    //testing only
     
  }

  async getCoupons() {
    console.log("calling server")

    let response = await axios.get("http://127.0.0.1:5000/api/couponCodes");

    return response.data;
  }
  async getProducts(){
    let response = await axios.get('http://127.0.0.1:5000/api/Products');

    return response.data;
  }

  async saveCoupon(coupon) {
    let response = await axios.post('http://127.0.0.1:5000/api/couponCodes', coupon);
    return response.data;
  }



  async saveProduct(product){
    let response = await axios.post('http://127.0.0.1:5000/api/catalog', product);
    return response.data;
  }
}

export default DataService;
