import "./catalog.css";
import Product from "./product";
import {useState, useEffect} from 'react';
import DataService from "../services/dataService"; //double period is one folder back

const Catalog = () =>{
    const [products, setProducts] = useState([]);

    const loadCatalog = async () => {
        const service = new DataService();
        let prods = await service.getCatalog();
        setProducts(prods);
       
    }

    


    useEffect(() => {
        //do something when the componets are displayed
        loadCatalog();
    }, []);


    return(
    <div className="catalog">
        <h1 className="header">Catalog</h1>

        <div className="prod-counter">
        <h4>We have {products.length} fish products ready for you.</h4>
        </div>

        <div className="prod">
        {products.map((prod) =>(
            <Product key={prod._id} info={prod}></Product>

        ))}
        
          
            
        </div>    
        
        
        
        
    </div>
    );
}

export default Catalog;