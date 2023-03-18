import React, { Component } from "react";
import OrderService from "../services/order.service";
import { Link } from "react-router-dom";



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
         window.location.reload();

    }




  render() {
    return (
    <>
      <div className="container">
        {this.state.orders.map(function (d, idx) {
          return (<ul key={d.id}><Link to={'/order/' + d.id}>order: {d.id}</Link></ul>)
        })}
      </div >
      <div className="container">
                <button className="btn btn-primary btn-block" onClick={this.handleClick}>New Order</button>
            </div >


</>
    );
  }
}