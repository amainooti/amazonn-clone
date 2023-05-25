import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap"
import { Helmet } from "react-helmet-async"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getError } from '../utils';
// import MessageBox from "../components/MessageBox";
import { Store } from '../Store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function SignUpScreen() {
    const navigate = useNavigate()
    // searrch holds the query string parameter
    const { search } = useLocation();
    // using  the new URLSearchParams(search).get('')
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';


    // const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { userInfo } = state;
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('password do not match')

        }
        try {
            const { data } = await axios.post('http://localhost:3500/api/users/signup', {
                name,
                email,
                password
            });
            ctxDispatch({ type: "USER_SIGNIN", payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');

        } catch (error) {
            toast.error(getError(error));
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);

  return (
      <Container className='small-container'>
          <Helmet> <title> Sign Up  </title> </Helmet>
          <h1 className="my-3"> Sign Up </h1>
          <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="name">
                  <Form.Label> Name </Form.Label>
                  <Form.Control type="name" placeholder="Name" onChange={(e)=> setName(e.target.value)} required />
               </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                  <Form.Label> Email </Form.Label>
                  <Form.Control type="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} required />
               </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                  <Form.Label> Password </Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmpassword">
                  <Form.Label> Confirm Password </Form.Label>
                  <Form.Control type="password" placeholder="Confirm Password" onChange={(e)=> setConfirmPassword(e.target.value)} required />
              </Form.Group>
              <div className="mb-3">
                  <Button type="submit"> Sign Up </Button>
              </div>
              {/* {error && <MessageBox variant='danger'> { error }</MessageBox>} */}
              <div className="mb-3">
                  Already have an account? {' '}
                  <Link to={`/signin?redirect=${redirect}`}> Sign-In</Link>
              </div>
          </Form>
    </Container>
  )
}

export default SignUpScreen