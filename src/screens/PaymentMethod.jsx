import { Helmet } from "react-helmet-async"
import CheckoutSteps from "../components/CheckoutSteps"
import { Button, Form } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { Store } from "../Store"
import { useNavigate } from "react-router-dom"

function PaymentMethod() {
    const navigate = useNavigate()
    const { state, dispatch: ctxDispatch } = useContext(Store)

    const {
        cart: { shippingAddress, paymentMethod }
    } = state;

    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'Paypal')


    useEffect(() => {
        if (!shippingAddress?.address) {
            navigate("/shipping")
        }
    }, [shippingAddress, navigate])

    const handleSubmit = (event) => {
        event.preventDefault();
        ctxDispatch({ type: "SAVE_SHIPPING_METHOD", payload: paymentMethodName });
        localStorage.setItem("paymentMethod", paymentMethodName);
        navigate('/placeorder')
}



  return (
      <div>
          <CheckoutSteps step1 step2 step3></CheckoutSteps>
          <Helmet>
              <title> Payment Method </title>
          </Helmet>
          <h1 className="my-3"> Payment Method </h1>
          <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <Form.Check
                      type="radio"
                      id="Paypal"
                      label="Paypal"
                      value="Paypal"
                      checked={paymentMethodName === "Paypal"}
                      onChange={(e)=> setPaymentMethod(e.target.value)}
                  />

              </div>
              <div className="mb-3">
                  <Form.Check
                      type="radio"
                      id="Stripe"
                      label="Stripe"
                      value="Stripe"
                      checked={paymentMethodName === "Stripe"}
                      onChange={(e)=> setPaymentMethod(e.target.value)}
                  />

              </div>
              <div className="mb-3">
                  <Button type="submit">Submit</Button>
              </div>
          </Form>
    </div>
  )
}

export default PaymentMethod