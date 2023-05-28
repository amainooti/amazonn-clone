import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";
import { Card, Col, Row } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Store } from "../Store";
import { Link, useNavigate } from "react-router-dom";

export default function PlaceOrderScreen() {
    const navigate = useNavigate()
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { userInfo, cart: { shippingAddress, paymentMethod} } = state


    useEffect(() => {
        if (!userInfo) {
            navigate('/signin')
        }
    }, [userInfo, navigate])

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
                              <strong>Name: </strong> {shippingAddress.fullName} <br />
                              <strong>Address: </strong> {shippingAddress.address},
                              {shippingAddress.city}, {shippingAddress.postalCode},
                              {shippingAddress.country}
                          </Card.Text>
                          <Link to= "/shipping"> Edit </Link>
                      </Card.Body>
                  </Card>
                  <Card className="mb-3">
                      <Card.Body>
                          <Card.Title> Payment  </Card.Title>
                          <Card.Text>
                              <strong>Payment: </strong> {paymentMethod} <br />
                          </Card.Text>
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
    </div>
  )
}
