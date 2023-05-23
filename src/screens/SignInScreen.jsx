import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap"
import { Helmet } from "react-helmet-async"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getError } from '../utils';
import MessageBox from "../components/MessageBox";
import { Store } from '../Store';


function SignInScreen() {
    const navigate = useNavigate()
    // searrch holds the query string parameter
    const { search } = useLocation();
    // using  the new URLSearchParams(search).get('')
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';


    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { userInfo } = state;
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3500/api/users/signin', {
                email,
                password
            });
            ctxDispatch({ type: "USER_SIGNIN", payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');

        } catch (error) {
            setError(getError(error));
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);

  return (
      <Container className='small-container'>
          <Helmet> <title> Sign In  </title> </Helmet>
          <h1 className="my-3"> Sign In </h1>
          <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="email">
                  <Form.Label> Email </Form.Label>
                  <Form.Control type="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} required />
               </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                  <Form.Label> Password </Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} required />
              </Form.Group>
              <div className="mb-3">
                  <Button type="submit"> Sign In </Button>
              </div>
              {error && <MessageBox variant='danger'> { error }</MessageBox>}
              <div className="mb-3">
                  New customer? {' '}
                  <Link to={`/signup?redirect=${redirect}`}> Create your account</Link>
              </div>
          </Form>
    </Container>
  )
}

export default SignInScreen