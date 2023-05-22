// import React from 'react'

import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";

function Product({ product }) {
  const navigate = useNavigate()
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart: { cartItems } } = state;


  const addToChartHandler = async (item) => {

     const existInCart = cartItems.find(item => item._id === product._id);
      const quantity = existInCart ? existInCart.quantity + 1 : 1
       const { data } = await axios.get(`http://localhost:3500/api/products/${item._id}`)
        if (data.countInStock < quantity) {
        window.alert('Sorry, product is out of stock.')
        return;
        }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } })
    navigate("/cart")
    }
  return (
      <Card>
         <Link to={`/product/${product.slug}`} >
           <img src={product.image} className="card-img-top" alt={product.slug} />
          </Link>
        <Card.Body>
           <Link to={`/product/${product.slug}`} >
             <Card.Title> {product.name} </Card.Title>
              </Link>
              <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
        <Card.Text> ${product.price} </Card.Text>
        {product.countInStock === 0 ?
          <Button variant="light" disabled> Out of stock </Button> :
          <Button onClick={() => addToChartHandler(product)}> Add to cart </Button>}
        </Card.Body>
    </Card>
  )
}

export default Product