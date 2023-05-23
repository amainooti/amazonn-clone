import './App.css'
import { ProductScreen } from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Badge, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import NotFound from './screens/NotFound';
import SignInScreen from './screens/SignInScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';

function App() {
  const { state, dispatch: ctxDispatch} = useContext(Store)
  const { cart, userInfo } = state;



  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" })
    localStorage.removeItem("userInfo");
  }
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
              <Nav className='me-auto'>
                <Link to='/cart' className='nav-link'>
                  Cart {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.length}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item> User Profile </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item> Order History </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link className="dropdown-item" onClick={signOutHandler} to="#signout">
                      Sign Out
                    </Link>

              </NavDropdown>
                ): (
                  <Link className = 'nav-link' to='/signin'>
                    Sign In
                  </Link>
                )}
              </Nav>

            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/signin' element={<SignInScreen />} />
              <Route path='/shipping' element={<ShippingAddressScreen />} />
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
