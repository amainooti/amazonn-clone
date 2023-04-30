import './App.css'
import { ProductScreen } from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function App() {

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


            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path='/' element={<HomeScreen />} />
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
