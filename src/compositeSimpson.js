import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import math, { evaluate } from 'mathjs'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';


import { Alert } from "react-bootstrap";


const CompositeSimpson = () => {

    const [result, setresult] = useState([]);

    const [Equation, setEquation] = useState("x^7+2x^3-1")
    const [B, setB] = useState(1)
    const [A, setA] = useState(1)
    const [N, setN] = useState(2)


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name == "Equation") {
            setEquation(value);
        }
        else if (name == "A") {
            setA(value);
        }
        else if (name == "B") {
            setB(value);
        }
        else if (name == "N") {
            setN(value);
        }

    };



    const generateInput = () => {
        const b = B;
        const a = A;

        console.log(b)
        console.log(a)
    
        const h = (b - a) / (2*N);
    
        console.log(h);
    
        const fx = new Array(N + 1);
    
        let j = 0;
        for (let i = a; i <= b; i += h) {
            i = parseFloat(i)
            
            fx[j] = evaluate(Equation,{x:i});
            console.log("step "+i + " "+fx[j]);
            j++;
        }
    
        let sumOdd = 0;
        let sumEven = 0;
    
        for (let i = 1; i <= fx.length - 2; i++) {
            if (i % 2 !== 0) {
                sumOdd += fx[i];
            } else {
                sumEven += fx[i];
            }
        }
        console.log(sumOdd)
        console.log(sumEven)
        const I = (h / 3) * ( (fx[0]) + fx[fx.length - 1] + (4 * sumOdd) + (2 * sumEven) );
    
    
        console.log(I);
        setresult([I])

    };







    return (
        <Container>
            <h1>Composite Simpsons Rule</h1>
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

                    <Form.Label style={{ marginTop: "20px" }} >N</Form.Label>
                    <Form.Control
                        type="number"
                        name="N"
                        value={N}
                        onChange={handleInputChange}
                        style={{ width: "20%" }}
                    />
                </Form.Group>


                <div className="cal-button">
                    <Button variant="primary" onClick={generateInput} style={{ marginTop: "20px" }} >
                        Calculate with Composite Simpsons Rule
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



export default CompositeSimpson;
