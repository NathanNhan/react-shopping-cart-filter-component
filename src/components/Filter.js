import React, { Component } from "react";

export default class Filter extends Component {
   shouldComponentUpdate(prevProp){
     if(this.props.size !== prevProp.size){
       return true;
     }
     if(this.props.sort !== prevProp.sort){
       return true;
     }
     if(this.props.sort === prevProp.sort || this.props.size === prevProp.size){
       return false;
     }  
   }
  render() {
    console.log("fillter component");
    return (
      <div className="filter">
        <div className="filter-result">{this.props.count} Products</div>
        <div className="filter-sort">
          Order{" "}
          <select value={this.props.sort} onChange={this.props.sortProducts}>
            <option>Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div className="filter-size">
          Filter{" "}
          <select value={this.props.size} onChange={this.props.filterProducts}>
            <option value="">ALL</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
    );
  }
}
