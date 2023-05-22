import { Button, Container, Form } from "react-bootstrap"
import { Helmet } from "react-helmet-async"
import { Link, useLocation } from "react-router-dom"

function SignInScreen() {
    // searrch holds the query string parameter
    const { search } = useLocation();
    // using  the new URLSearchParams(search).get('')
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';

  return (
      <Container className='small-container'>
          <Helmet> <title> Sign In  </title> </Helmet>
          <h1 className="my-3"> Sign In </h1>
          <Form action="">
              <Form.Group className="mb-3" controlId="email">
                  <Form.Label> Email </Form.Label>
                  <Form.Control type="email" placeholder="Email" required />
               </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                  <Form.Label> Password </Form.Label>
                  <Form.Control type="password" required placeholder="Password" />
              </Form.Group>
              <div className="mb-3">
                  <Button type="submit"> Sign In </Button>
              </div>
              <div className="mb-3">
                  New customer? {' '}
                  <Link to={`/signup?redirect=${redirect}`}> Create your account</Link>
              </div>
          </Form>
    </Container>
  )
}

export default SignInScreen