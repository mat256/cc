import React, { Component } from "react";
import ProductService from "../services/product.service";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";



const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


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
        {this.state.products.map(function (d, idx) {
          return (<ul key={d.id}><Link to={'/product/' + d.id}>Title: {d.title}, price: {d.price}</Link></ul>)
        })}
      </div >


    );
  }
}
