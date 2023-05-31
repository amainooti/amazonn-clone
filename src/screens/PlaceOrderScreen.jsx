import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import { Link, useNavigate } from "react-router-dom";
import { getError } from "../utils";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import axios from "axios";

export default function PlaceOrderScreen() {

    const reducer = (state, action) => {
        switch (action.type) {
            case "CREATE_REQUEST":
                return { ...state, loading: true }
            case "CREATE_SUCCESS":
                return { ...state, loading: false }
            case "CREATE_FAIL":
                return { ...state, loading: false, error: action.payload}
            default:
                return state
        }
    }

    const initialState = {
        loading: false,

    }
    const navigate = useNavigate()
    const [{ loading }, dispatch] = useReducer(reducer, initialState);

    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { userInfo, cart } = state;


    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice)
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = async () => {
        try {
            dispatch({ type: "CREATE_REQUEST" })
            const { data } = await axios.post('http://localhost:3500/api/orders', {
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            },
                {
                    headers: {
                        authorization: `Bearer ${ userInfo.token }`
                    }
                }
            )
            ctxDispatch({ type: "CART_CLEAR" })
            dispatch({ type: "CREATE_SUCCESS" })
            localStorage.removeItem("cartItems")
            navigate(`/order/${data.order._id}`)
        } catch (error) {
            dispatch({ type: "CREATE_FAIL" })
            toast.error(getError(error))
        }
    }


    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate("/payment")
        }
    }, [cart, navigate])


  return (
      <div>
          <Helmet>
              <title> Place Order </title>
          </Helmet>
          <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
          <h1 className="my-3"> Preview Order </h1>
          <Row>
              <Col md={8}>
                  <Card className="mb-3">
                      <Card.Body>
                          <Card.Title>Shipping </Card.Title>
                          <Card.Text>
                              <strong>Name: </strong> {cart.shippingAddress.fullName} <br />
                              <strong>Address: </strong> {cart.shippingAddress.address},
                              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                              {cart.shippingAddress.country}
                          </Card.Text>
                          <Link to= "/shipping"> Edit </Link>
                      </Card.Body>
                  </Card>
                  <Card className="mb-3">
                      <Card.Body>
                          <Card.Title> Payment  </Card.Title>
                          <Card.Text>
                              <strong>Payment: </strong> {cart.paymentMethod} <br />
                          </Card.Text>
                          <Link to="/payment">Edit</Link>
                      </Card.Body>
                  </Card>
                  <Card>
                      <Card.Body className="mb-3">
                          <Card.Title> Items </Card.Title>
                          <ListGroup variant="flush">
                              {cart.cartItems.map((item) => (
                                  <ListGroup.Item key={item._id}>
                                      <Row className="align-items-center">
                                          <Col md={6}>
                                              <img className="img-fluid rounded img-thumbnail" src={item.image} alt={item.slug} /> {' '}
                                              <Link to={`/product/${item.slug}`}> {item.name }</Link>
                                          </Col>
                                          <Col md={3} className="  text-center"> <span> {item.quantity} </span> </Col>
                                          <Col md={3}> <span> ${item.price} </span> </Col>
                                      </Row>

                              </ListGroup.Item>
                              ))}
                          </ListGroup>
                          <Link to= "/cart" className="text-center">Edit</Link>
                      </Card.Body>
                  </Card>
              </Col>
              <Col md={4}>
                  <Card>
                      <Card.Body>
                          <Card.Title> Order Summary </Card.Title>
                          <ListGroup variant="flush">
                              <ListGroup.Item>
                                  <Row>
                                      <Col>Items</Col>
                                      <Col>${ cart.itemsPrice.toFixed(2)}</Col>

                                  </Row>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                  <Row>
                                      <Col>Shipping</Col>
                                      <Col>${ cart.shippingPrice.toFixed(2)}</Col>
                                      <Col></Col>
                                  </Row>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                  <Row>
                                      <Col>Tax</Col>
                                      <Col>${ cart.taxPrice.toFixed(2)}</Col>

                                  </Row>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                  <Row>
                                      <Col><strong>Order Total</strong></Col>
                                      <Col>${ cart.totalPrice.toFixed(2)}</Col>

                                  </Row>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                  <div className="d-grid">
                                    <Button type="button"
                                            onClick={placeOrderHandler}
                                            disabled={cart.cartItems.length === 0}>
                                            {loading ? <LoadingBox></LoadingBox>: "Place Order"}

                                      </Button>
                                  </div>
                               </ListGroup.Item>
                          </ListGroup>
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
    </div>
  )
}
