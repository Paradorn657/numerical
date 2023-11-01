import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import math, { evaluate } from 'mathjs'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';


import { Alert } from "react-bootstrap";


const SecondDivideDiff = () => {

    const [result, setresult] = useState([]);

    const [Equation, setEquation] = useState("e^(x/3)+x^2")
    const [H, setH] = useState(1)
    const [X, setX] = useState(1)
    const [N, setN] = useState(1)


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name == "Equation") {
            setEquation(value);
        }
        else if (name == "X") {
            setX(parseFloat(value));
        }
        
        else if (name == "H") {
            setH(parseFloat(value));
        }
 

    };

    function fx(X) {

        return evaluate(Equation,{x:X});

    }



    const generateInput = () => {
        console.log(type)

        var ans = 0;
        const x = parseFloat(X); 
        const h = parseFloat(H);

        if(type=="Forward"){
            ans =  ( (-1 * fx(x + (h * 3)))   + (4 * fx(x + (h * 2))) - (5 * fx(x + h)) + (2 * fx(x)) )/     (h * h);

        }
        else if(type=="Backward"){
            ans = ((2 * fx(x) - 5 * fx(x - h) + 4 * fx(x - (h * 2)) - fx(x - (h * 3))) / (h * h));

        }
        else if(type=="Central"){
            ans = (-1 * fx(x + (h * 2)) + 16 * fx(x + h) - 30 * fx(x) + 16 * fx(x - h) - fx(x - (h * 2))) / (12 * (h * h));

        }
        setresult([ans])

    };


    const [type, setType] = useState("Forward");

    const handleTypeChange = (value) => {
        setType(value);
    };





    return (
        <Container>
            <h1>Second Divide-Differences</h1>
            <Form>
                <Form.Group>
                    <ToggleButtonGroup type="radio" name="splineType"  onChange={handleTypeChange} defaultValue={type} style={{ width: "70%", marginTop: "20px" }}>
                        <ToggleButton id="Forward-radio" value={"Forward"} variant="outline-primary">Forward Divided-Differences</ToggleButton>
                        <ToggleButton id="Backward-radio" value={"Backward"} variant="outline-primary">Backward Divided-Differences</ToggleButton>
                        <ToggleButton id="Central-radio" value={"Central"} variant="outline-primary">Central Divided-Differences</ToggleButton>
                    </ToggleButtonGroup>
                </Form.Group>

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
                    <Form.Label style={{ marginTop: "20px" }} >X</Form.Label>
                    <Form.Control
                        type="number"
                        name="X"
                        value={X}
                        onChange={handleInputChange}
                        style={{ width: "20%" }}
                    />

                    <Form.Label style={{ marginTop: "20px" }} >H</Form.Label>
                    <Form.Control
                        type="number"
                        name="H"
                        value={H}
                        onChange={handleInputChange}
                        style={{ width: "20%" }}
                    />

                   
                </Form.Group>


                <div className="cal-button">
                    <Button variant="primary" onClick={generateInput} style={{ marginTop: "20px" }} >
                        Calculate with Second Divide-Differences
                    </Button>

                </div>


            </Form>

            {
                result.map((x) =>
                    <Alert style={{ marginTop: "20px" }}>
                        {`Differences Value is : ${x}`}

                    </Alert>
                )
            }






        </Container>
    );
};



export default SecondDivideDiff;
