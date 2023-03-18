import React, { Component } from "react";
import OrderService from "../services/order.service";

import { withRouter } from '../common/with-router';

class Order extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            order: {},
            products:[],
        };
    }

    componentDidMount() {

        OrderService.getOrder(this.props.router.params.id).then(
            response => {
                this.setState({
                    order: response.data
                });
            },
        );
        OrderService.getOrderItems(this.props.router.params.id).then(
            response => {
                this.setState({
                    products: response.data
                });
            },
        );
    }
        handleClick(e) {
        OrderService.deleteOrder(this.props.router.params.id).then(
        () => {
          this.props.router.navigate("/orders");
          window.location.reload();
        }
      );
      }

      handleAdd(e) {
        localStorage.setItem("order", JSON.stringify(this.props.router.params.id)).then(
        () => {
          this.props.router.navigate("/products");
          window.location.reload();
        }
      );
      }
    render() {
        return (
        <>
            <div className="container">
                <h3>Id: {this.state.order.id}</h3>
            </div >
            <div className="container">
        {this.state.products.map(function (d, idx) {
          return (<ul key={d.id}><p>Title: {d.title}, price: {d.price}</p></ul>)
        })}
      </div >
      <div className="container">
                <button className="btn btn-primary btn-block" onClick={this.handleAdd}>Set order as active</button>
                <button className="btn btn-primary btn-block" onClick={this.handleClick}>Delete order</button>
            </div >
      </>
        );
    }
}

export default withRouter(Order);
