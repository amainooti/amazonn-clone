import axios from "axios";
import { useEffect, useReducer } from "react";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload }
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}

    default:
      return state;
  }
}


export const ProductScreen = () => {
  const params = useParams()
    const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    error: '',
    loading: true
})
  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'FETCH_REQUEST'})
      try {
        const result = await axios.get(`http://localhost:3500/api/products/slug/${slug}`);
        dispatch({type: 'FETCH_SUCCESS', payload: result.data})
      } catch (error) {
        dispatch({type: 'FETCH_ERROR', payload: error.message})
      }

    }
    fetchData()
  }, [slug])


  return (
    loading ? <div> Loading.. </div> :
      error ? <div> {error} </div> :
        <Row className="d-flex">
          <Col md={6}>
            <img
              className="img-large"
              alt={product.slug}
              src={product.image} />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h1> {product.name}  </h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                >

                </Rating>
              </ListGroup.Item>
               <ListGroup.Item>
                 ${product.price}
              </ListGroup.Item>
               <ListGroup.Item>
                 {product.quality}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col> Price: </Col>
                      <Col>${ product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col> Status: </Col>
                      <Col>{ product.countInStock > 0 ? <Badge bg="success">In Stock</Badge>: <Badge bg="danger">Unavailable</Badge> }</Col>
                    </Row>
                  </ListGroup.Item>
                  {
                    product.countInStock > 0 && (
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button variant="primary">Add to Cart</Button>
                        </div>
                      </ListGroup.Item>
                    )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

        </Row>
  )
}
