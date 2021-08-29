// feature 1
import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    console.log("constructor");
    super();
    this.state = {
      cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
      products: data.products,
      size: "",
      sort: "",
    };
  }
  sortProducts = (event) => {
    // impl
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    });
  };
  filterProducts = (event) => {
    // impl
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };
  addtoCart = (product) => {
    
    const exisItem = this.state.cartItems.find((x) => x._id === product._id);
    if (exisItem) {
      this.setState({
        cartItems: this.state.cartItems.map((x) =>
          x._id === product._id ? { ...exisItem, qty: exisItem.qty + 1 } : x
        ),
      });
      
    } else {
      this.setState({
        cartItems: [...this.state.cartItems, { ...product, qty: 1 }],
      });
    }
    
  };
  
  componentDidUpdate () {
    localStorage.setItem("cart", JSON.stringify(this.state.cartItems));
  }
  
  removeCart = (product) => {
    const exisItem = this.state.cartItems.find((x) => x._id === product._id);
    if (exisItem) {
      this.setState({
        cartItems: this.state.cartItems.map((x) =>
          x._id === product._id ? { ...exisItem, qty: exisItem.qty - 1 } : x
        ),
      });
    }
    if (exisItem.qty <= 1) {
      this.setState({
        cartItems: this.state.cartItems.filter((x) => x._id !== product._id),
      });
    }
    
  };
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products
                products={this.state.products}
                addCart={this.addtoCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeCart={this.removeCart}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default App;
