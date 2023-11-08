
import { useState } from "react";
import { Alert, Button, Container, Form, Table } from "react-bootstrap";
import { SQRT1_2Dependencies, evaluate } from "mathjs";
import Plot from "react-plotly.js";

const TestPage = () => {

    const [Equation, setEquation] = useState("x^2");

    const [B, setB] = useState(1);
    const [A, setA] = useState(1);
    const [N, setN] = useState(1);

    const [graphData, setGraphData] = useState(null)


    const [result, setResult] = useState([]);

    const test = [
        { i: 0, fx: 1 },
        { i: 2, fx: 4 },
        { i: 3, fx: 2 },
        { i: 4, fx: 5 },
        { i: 5, fx: 2 },
        { i: 6, fx: 1 },
    
    ]


    const handleinputchange = (e) => {

        const { name, value } = e.target;
        if (name == "equation") {
            setEquation(value)
            console.log(value)
        }
        if (name == "B") {
            setB(value);
        }
        if (name == "A") {
            setA(value);
        }
        if (name == "N") {
            setN(value);
        }



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
    const calculateSubTrapezoids = () => {
        const b = B;
        const a = A;
        const h = (b - a) / (2*N);
        const subTrapezoids = [];
    
        for (let i = a; i < b; i += h) {
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
        }
    
        return subTrapezoids;
      };




    const calculate = () => {
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

            fx[j] = evaluate(Equation, { x: i });
            console.log("step " + i + " " + fx[j]);
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
        const I = (h / 3) * ((fx[0]) + fx[fx.length - 1] + (4 * sumOdd) + (2 * sumEven));

        setResult([I])

        setgraphvalue();


    }

    return (
        <Container>
            <h1>
                Composite SimpsonsRule
            </h1>

            <Form>
                <Form.Group>
                    <Form.Label style={{ marginTop: "20px" }}>Equation</Form.Label>
                    <Form.Control type="text" name="equation" value={Equation} onChange={handleinputchange} style={{ width: "20%" }} />

                </Form.Group>

                <Form.Group>
                    <Form.Label style={{ margintop: "20px" }}>B</Form.Label>
                    <Form.Control type="number" name="B" value={B} onChange={handleinputchange} style={{ width: "20%" }} />

                </Form.Group>

                <Form.Group>
                    <Form.Label style={{ margintop: "20px" }}>A</Form.Label>
                    <Form.Control type="number" name="A" value={A} onChange={handleinputchange} style={{ width: "20%" }} />

                </Form.Group>

                <Form.Group>
                    <Form.Label style={{ margintop: "20px" }}>N</Form.Label>
                    <Form.Control type="number" name="N" value={N} onChange={handleinputchange} style={{ width: "20%" }} />
                </Form.Group>

                <div style={{ marginTop: "20px" }}>
                    <Button variant="primary" onClick={calculate}>
                        Calculate
                    </Button>
                </div>

                {
                    result.map((x) =>

                        <Alert style={{ marginTop: "20px" }}>
                            {x}
                        </Alert>

                    )
                }

                {


                    graphData && (
                        <Plot
                            data={[
                                {
                                    x: graphData.map((point) => point.i),
                                    y: graphData.map((point) => point.fx),
                                    type: 'scatter',
                                    mode: 'lines', // This line has only lines, no markers
                                    line: { color: 'blue' },
                                    name: 'Function', // Update the name
                                },
                                ...calculateSubTrapezoids().map((trapezoid, index) => ({
                                    x: trapezoid.map((point) => point.x),
                                    y: trapezoid.map((point) => point.y),
                                    fill: 'tozeroy',
                                    type: 'scatter',
                                    fillcolor: index % 2 === 0 ? 'rgba(0, 128, 0, 0.2)' : 'rgba(0, 0, 128, 0.2)',
                                    showlegend: false,
                                  })),
                            ]}
                            
                            layout={{
                                width: 600,
                                height: 400,
                                title: 'Composite Simpson\'s Rule',
                                xaxis: { title: 'X' },
                                yaxis: { title: 'Y' },
                               
                                showlegend: true, // Show the legend
                                
                            }}
                        />
                    )



                }










            </Form>


        </Container>
    )


}

export default TestPage