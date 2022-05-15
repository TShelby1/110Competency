import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navBar";
import Footer from "./components/footer";
import Catalog from "./components/catalog";
import Todo from "./components/todo";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import About from "./components/about";
import Home from "./components/home";
import Admin from "./components/admin";
import GlobalStoreProvider from "./context/globalStoreProvider";
import Cart from "./components/cart";

import { BrowserRouter, Routes, Route } from "react-router-dom"; // wraps these components

function App() {
  return (
    <div className="App">
      <GlobalStoreProvider>
      <BrowserRouter>
        <Navbar></Navbar>

        <Routes>
          <Route path= "/" exact element={<Home />}></Route>
          <Route path= "/home" exact element={<Home />}></Route>
          <Route path= "/catalog" exact element={<Catalog />}></Route>
          <Route path= "/about" exact element={<About />}></Route>
          <Route path= "/shoppingList" exact element={<Todo />}></Route>
          <Route path= "/admin" exact element={<Admin />}></Route>
          <Route path="/cart" exact element={<Cart />}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
      </GlobalStoreProvider>
    </div>
  );
}

export default App;
