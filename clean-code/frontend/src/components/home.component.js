import React, { Component } from "react";
import ProductService from "../services/product.service";







export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }




  componentDidMount() {

    ProductService.listProducts().then(
      response => {
        this.setState({
          products: response.data
        });
      },
    );
  }

  // Add to order button in this view and product view
  // order view
  render() {
    return (
      <div className="container">
        <h2>How to:</h2>
        <p>Create new order on orders page</p>
        <p>Set order as active</p>
        <p>Choose product from products page</p>
        <p>Add product to order</p>
      </div >


    );
  }
}
