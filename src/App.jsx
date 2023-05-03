import './App.css'
import { ProductScreen } from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import NotFound from './screens/NotFound';
import SignInScreen from './screens/SignInScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart } = state;

  return (
    <Router>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg='dark' variant='dark'>
            <Container>
                <LinkContainer to="/">
              <Navbar.Brand>
                  Amazon
              </Navbar.Brand>
              </LinkContainer>
              <Nav className='m-auto'>
                <Link to='/cart' className='nav-link'>
                  Cart {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.length}
                    </Badge>
                  )}
                </Link>
              </Nav>

            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path='/' element={<HomeScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/signin' element={<SignInScreen />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Container>

        </main>
        <footer>
          <div className="text-center"> All rights reserved.</div>
        </footer>
      </div>

    </Router>
  )
}

export default App
