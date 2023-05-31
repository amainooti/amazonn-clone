import { useContext, useEffect, useReducer } from "react"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { Store } from "../Store"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { getError } from "../utils"
import axios from "axios"
import { Helmet } from "react-helmet-async"
import { Card, Col, ListGroup, Row } from "react-bootstrap"


// const initialState = {
//     laoding: false,
//     error: '',
//     order: {}
// }


const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true , error: ''}
        case "FETCH_SUCCESS":
            return {...state, loading: false, order: action.payload, error: ''}
        case "FETCH_FAILED":
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}


function OrderScreen() {
    const params = useParams()
    const { id: orderId } = params;
    const navigate = useNavigate()

    const { state } = useContext(Store);
    const { userInfo } = state;

    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    laoding: false,
    error: '',
    order: {}
}
    );
    console.log(order)
    useEffect(() => {
        const fetchOrder = async() => {
            try {
                dispatch({ type: "FETCH_REQUEST" })
                const { data } = await axios.get(`http://localhost:3500/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                })
                dispatch({ type: "FETCH_SUCCESS", payload: data })
                console.log(data);

            } catch (error) {
                dispatch({ type: "FETCH_FAILED", payload: getError(error) })
            }
        }
        if (!userInfo) {
            return navigate('/signin')
        }
        if (!order._id || (order._id && order._id !== orderId )) {
            fetchOrder()
        }
    }, [userInfo, navigate, order, orderId])

  return (
      loading
          ? (<LoadingBox></LoadingBox>)
          : error ? (
              <MessageBox variant="danger"> {error}</MessageBox>
          ) : <div>
                  <Helmet>
                      <title> Order {orderId} </title>
                  </Helmet>
                  <h1 className="mb-3"> Order {orderId}</h1>
                  <Row>
                      <Col md={8}>
                          <Card className="mb-3">
                              <Card.Body>

                                  <Card.Title>Shipping</Card.Title>
                                  <Card.Text>
                                      <strong>Name: </strong> {order.shippingAddress.fullName} <br />
                                      <strong>Address: </strong> {order.shippingAddress.address},
                                      {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                  </Card.Text>
                              </Card.Body>

                          </Card>
                          <Card className="mb-3">
                              <Card.Body>
                                  <Card.Title>Payment</Card.Title>
                                  <Card.Text>
                                      <strong>Method: </strong> {order.paymentMethod}
                                  </Card.Text>
                                  {order.isPaid
                                      ? (<MessageBox variant="success">
                                      Paid at {order.paidAt}
                                      </MessageBox>)
                                      : (<MessageBox variant="danger"> Not Paid </MessageBox>)}
                              </Card.Body>
                          </Card>
                          <Card className="mb-3">
                              <Card.Title>Items</Card.Title>
                              <ListGroup variant="flush">
                                  {order.orderItems.map(item => (
                                      <ListGroup.Item key={item._id}>
                                          <Row className="align-items-center">
                                              <Col md={6}>
                                                  <img
                                                    src={item.image}
                                                      alt={item.name}
                                                     className="img-fluid img-thumbnail rounded"
                                                  /> {' '}
                                                  <Link to={`product/${item.slug}`}> {item.name} </Link>
                                              </Col>
                                              <Col md={3}>
                                                  <span> { item.quantity }</span>
                                              </Col>
                                              <Col md={3}>
                                                  <span> { item.price }</span>
                                              </Col>
                                          </Row>
                                      </ListGroup.Item>
                                  ))}
                              </ListGroup>
                          </Card>
                      </Col>
                      <Col md={4}>
                          <Card>
                              <Card.Body>
                                  <Card.Title>Order Summary</Card.Title>
                                  <ListGroup variant="flush">
                                      <ListGroup.Item>
                                          <Row>
                                              <Col> Items</Col>
                                              <Col> ${ order.itemsPrice.toFixed(2)}</Col>
                                          </Row>
                                      </ListGroup.Item>
                                      <ListGroup.Item>
                                          <Row>
                                              <Col> Shipping</Col>
                                              <Col> ${ order.shippingPrice.toFixed(2)}</Col>
                                          </Row>
                                      </ListGroup.Item>
                                      <ListGroup.Item>
                                          <Row>
                                              <Col> Tax</Col>
                                              <Col> ${ order.taxPrice.toFixed(2)}</Col>
                                          </Row>
                                      </ListGroup.Item>
                                      <ListGroup.Item>
                                          <Row>
                                              <Col> Order Total</Col>
                                              <Col> ${ order.totalPrice.toFixed(2)}</Col>
                                          </Row>
                                      </ListGroup.Item>
                                  </ListGroup>
                              </Card.Body>
                          </Card>
                      </Col>
                  </Row>
          </div>
  )
}

export default OrderScreen