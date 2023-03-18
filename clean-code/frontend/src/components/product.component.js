import React, { Component } from "react";
import ProductService from "../services/product.service";
import OrderService from "../services/order.service";

import { withRouter } from '../common/with-router';

class Product extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            product: {},
        };
    }

    componentDidMount() {

        ProductService.getProduct(this.props.router.params.id).then(
            response => {
                this.setState({
                    product: response.data
                });
            },
        );
    }
        handleClick(e) {
        //console.log(typeof this.props.router.params.id);
        ProductService.deleteProduct(this.props.router.params.id).then(
        () => {
          this.props.router.navigate("/products");
          window.location.reload();
        }
      );
      }

      handleAdd(e) {
        OrderService.addProductToOrder(JSON.parse(localStorage.getItem('order')), this.props.router.params.id, 1).then(
        () => {
          this.props.router.navigate("/products");
          window.location.reload();
        }
      );
      }

    render() {
        return (
            <div className="container">
                <h3>Title: {this.state.product.title}</h3>
                <p>Price: {this.state.product.price}</p>
                <p>Description: {this.state.product.description}</p>
                <button className="btn btn-primary btn-block" onClick={this.handleAdd}>Add Product to order</button>
                <button className="btn btn-primary btn-block" onClick={this.handleClick}>Delete Product</button>
            </div >
        );
    }
}

export default withRouter(Product);
