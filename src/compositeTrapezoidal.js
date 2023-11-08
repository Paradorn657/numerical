import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import math, { evaluate } from 'mathjs'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

import Plot from "react-plotly.js";


import { Alert } from "react-bootstrap";




const Compositeletrapezoid = () => {

    const [result, setresult] = useState([]);

    const [Equation, setEquation] = useState("4x^5-3x^4+x^3-6x+2")
    const [B, setB] = useState(1)
    const [A, setA] = useState(1)
    const [N, setN] = useState(2)

    const [Grapdata, setGraphData] = useState(null);

    let subtrap = []

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
        else if (name == "N") {
            setN(value);
        }

    };

    const calculateSubTrapezoids = () => {
        const h = (B - A) / N;
        const subTrapezoids = [];
        for (let i = A; i < B; i = i + h) {
            const x0 = i;
            const x1 = i + h;
            const y0 = evaluate(Equation, { x: x0 });
            const y1 = evaluate(Equation, { x: x1 });

            subTrapezoids.push([
                { x: x0, y: 0 },
                { x: x0, y: y0 },
                { x: x1, y: y1 },
                { x: x1, y: 0 },
                { x: x0, y: 0 },
            ]);
        };
        return subTrapezoids;
    }

    const setgraphvalue = () => {
        const data = []
        for (let i = A; i <= B; i++) {

            let fx = evaluate(Equation, { x: i })
            data.push({ i, fx });

        }
        console.log(data)
        setGraphData(data);
    }





    const generateInput = () => {

        const b = B;
        const a = A;

        const h = (b - a) / N;

        console.log(h);

        const fx = new Array(N + 1);


        let j = 0;
        const data = [];
        for (let i = a; i <= b; i += h) {
            i = parseFloat(i)
            console.log("step " + i);
            fx[j] = evaluate(Equation, { x: i });
            j++;
        }


        let sum = 0;

        for (let i = 1; i <= fx.length - 2; i++) {
            sum += fx[i];
        }

        const I = (h / 2) * (fx[0] + fx[fx.length - 1] + 2 * sum);


        console.log(I);
        setgraphvalue();
        setresult([I])
        
    };







    return (
        <Container>
            <h1>Composite Trapezoidal Rule</h1>
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

            {
                Grapdata && (

                    <Plot

                        data={[
                            {
                                x: Grapdata.map((point) => point.i),
                                y: Grapdata.map((point) => point.fx),
                                type: 'Scatter',
                                mode: 'line',
                                line: { color: "blue" },
                                name: 'fx'
                            },
                            ...calculateSubTrapezoids().map((trapezoid, index) => ({
                                x: trapezoid.map((point) => point.x),
                                y: trapezoid.map((point) => point.y),
                                fill: 'tozeroy',
                                type: 'scatter',
                                fillcolor: index % 2 === 0 ? 'rgba(0, 128, 0, 0.2)' : 'rgba(0, 0, 128, 0.2)',
                                showlegend: false,
                            }))


                        ]}

                        layout={
                            {
                                width: 600,
                                height: 400,
                                title: 'graph trapzoid',
                                xaxis: { title: "x" },
                                yaxis: { title: "y" },
                                showlegend: true,
                            }
                        }




                    />


                )
            }








        </Container>
    );
};



export default Compositeletrapezoid;
