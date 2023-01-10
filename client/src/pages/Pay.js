import React, { useEffect, useRef } from "react";
import { Container, Card, FormControl, Button } from "react-bootstrap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link } from "react-router-dom";
import Search from "./Search";
import "../App.css";

function Pay() {
    const paypal = useRef();

    return (

      <div className="App">


        <Container className="text-center">
            <h1 style ={{color:"white", margin: "20px"}}>Send Tips</h1>

            <PayPalScriptProvider
                options={{
                    "client-id":
                        "Accd8Q-uUAAgjL7IWAGDun_EqhniiynGOurSJUqtbOtLXu2_A2w8UMXfpJb6sNvQv3BX5dwGmbS9KHZf",
                }}
            >
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: "2.00",
                                    },
                                },
                            ],
                        });
                    }}
                />
            </PayPalScriptProvider>

            <Link to={"/"}>
                <Button>Back</Button>
            </Link>
        </Container>
      </div>
    );
}

export default Pay;
