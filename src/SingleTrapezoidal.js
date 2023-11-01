import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import math, { evaluate } from 'mathjs'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';


import { Alert } from "react-bootstrap";


const Singletrapezoid = () => {

  const [result, setresult] = useState([]);

    const [Equation, setEquation] = useState("4x^5-3x^4+x^3-6x+2")
    const [B, setB] = useState(1)
    const [A, setA] = useState(1)


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name == "equation") {
            setEquation(value);
        }
        else if (name == "A") {
            setA(value);
        }
        else if (name == "B") {
            setB(value);
        }

    };



    const generateInput = () => {
        console.log(Equation)
        console.log(A)
        console.log(B)

        const b = B;
        const a = A;

        const fx0 = evaluate(Equation,{x:a});
        const fx1 = evaluate(Equation,{x:b})

        const math = require('mathjs');

        const I = ((b - a) / 2) * (fx0 + fx1);

        console.log(I);

        setresult([I])

    };







    return (
        <Container>
            <h1>Single Trapezoidal Rule</h1>
            <Form>

                <Form.Group controlId="rowInput">
                    <Form.Label style={{ marginTop: "20px" }} >Equation</Form.Label>
                    <Form.Control
                        type="text"
                        name="Equation"
                        value={Equation}
                        onChange={handleInputChange}
                        style={{ width: "20%" }}
                    />
                </Form.Group>

                <Form.Group controlId="rowInput">
                    <Form.Label style={{ marginTop: "20px" }} >B</Form.Label>
                    <Form.Control
                        type="number"
                        name="B"
                        value={B}
                        onChange={handleInputChange}
                        style={{ width: "20%" }}
                    />

                    <Form.Label style={{ marginTop: "20px" }} >A</Form.Label>
                    <Form.Control
                        type="number"
                        name="A"
                        value={A}
                        onChange={handleInputChange}
                        style={{ width: "20%" }}
                    />
                </Form.Group>


                <div className="cal-button">
                    <Button variant="primary" onClick={generateInput} style={{ marginTop: "20px" }} >
                        Calculate with Single Trapezoidal Method
                    </Button>

                </div>


            </Form>

            {
                result.map((x) =>
                    <Alert style={{ marginTop: "20px" }}>
                        {`Integrate Value is : ${x}`}

                    </Alert>
                )
            }






        </Container>
    );
};



export default Singletrapezoid;
