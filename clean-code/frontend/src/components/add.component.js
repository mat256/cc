import React, { Component } from "react";
import ProductService from "../services/product.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";






export default class Add extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);

    this.state = {
      products: [],
      title: "",
      description:"",
      price:"",
      successful: false,
      message: ""
    };
  }
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  handleAdd(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      ProductService.createProduct(
        this.state.title,
        this.state.description,
        this.state.price
      ).then(
        response => {
          this.setState({
            successful: true,
            message: "Added successfuly!"
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.detail) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
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
      /*<div className="container">
        {this.state.products.map(function (d, idx) {
          return (<ul key={d.id}><Link to={'/product/' + d.id}>Title: {d.title}, price: {d.price}</Link></ul>)
        })}
      </div >*/

      <div className="col-md-12">
        <div className="card card-container">

          <Form
            onSubmit={this.handleAdd}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="descriptionl"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <Input
                    type="price"
                    className="form-control"
                    name="price"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Add</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>



    );
  }
}
