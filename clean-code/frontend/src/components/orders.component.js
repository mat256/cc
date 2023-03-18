import React, { Component } from "react";
import ProductService from "../services/product.service";
import OrderService from "../services/order.service";
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


export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      orders: [],
      message: ""
    };
  }




  componentDidMount() {

    OrderService.listOrders().then(
      response => {
        this.setState({
          orders: response.data
        });
      },
    );
  }
      handleClick(e) {
        OrderService.createNewOrder();
    }



  // Add to order button in this view and product view
  // order view
  render() {
    return (
    <>
      <div className="container">
        {this.state.orders.map(function (d, idx) {
          return (<ul key={d.id}><Link to={'/orders/' + d.id}>order: {d.id}</Link></ul>)
        })}
      </div >
      <div className="container">
                <button onClick={this.handleClick}>New Order</button>
            </div >


</>
    );
  }
}