// import { Link } from 'react-router-dom'
import { useEffect, useReducer } from 'react'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
// import logger from 'use-reducer-logger';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload }
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}

    default:
      return state;
  }
}

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    error: '',
    loading: true
})
  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'FETCH_REQUEST'})
      try {
        const result = await axios.get('http://localhost:3500/api/products');
        dispatch({type: 'FETCH_SUCCESS', payload: result.data})
      } catch (error) {
        dispatch({type: 'FETCH_ERROR', payload: error.message})
      }

    }
    fetchData()
  }, [])

  return (
      <>
          <h1> Featured Product </h1>
          <div className='products'>
        {
          loading ? <div className='loading'>Loading </div> :
            error ? <div> {error}</div>
              : (
                <Row>

                  {
                    products.map(product => (
                      <Col sm={6} md={4} lg={3} key={product.id}>
                        <Product product={product}></Product>
                    </Col>
              ))}
              </Row>
            )}
          </div>
    </>
  )
}

export default HomeScreen
