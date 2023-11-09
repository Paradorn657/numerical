import { useState } from "react"
import { Button, Container, Form, FormGroup } from "react-bootstrap"
import Plot from "react-plotly.js";


const Test2 = () => {
    const [ndata, setnData] = useState(1);
    const [Xmatrix, setXMatrix] = useState([])
    const [Ymatrix, setYMatrix] = useState([])
    const [nofx, setnofx] = useState(2);

    const [graphdata, setgraphdata] = useState(null);

    const setDataGraph = (row) => {
        let xi = row;
        const data = []
        for (let i = 0; i < ndata; i++) {
            let x = Xmatrix[xi - 1][i];
            console.log(x);
            let fx = Ymatrix[i];
            data.push({ x, fx });
        }

        setgraphdata(data);
        console.log(data);
    }

    const generateinput = () => {

        const mutipleMatrix = [];

        for (let i = 0; i < nofx; i++) {
            const Matrix = [];
            for (let i = 0; i < ndata; i++) {
                Matrix.push('');
            }
            mutipleMatrix.push(Matrix);
        }

        setXMatrix(mutipleMatrix);
        console.log(mutipleMatrix)


        const newMatrix = [];

        for (let i = 0; i < ndata; i++) {
            newMatrix.push('');
        }

        setYMatrix(newMatrix);



    }
    const handelchange = (e) => {
        const { name, value } = e.target;
        if (name == 'N') {
            setnData(value);
            console.log(value);
        }
        else if (name == 'Nofx') {
            setnofx(value);
        }
    }

    const handleCellChange = (value, row, col) => {
        const updatedMatrix = [...Xmatrix];
        updatedMatrix[row][col] = value;;

        console.log(updatedMatrix)
        setXMatrix(updatedMatrix);
    };

    const handleYCellChange = (value, col) => {
        const updatedMatrix = [...Ymatrix];
        updatedMatrix[col] = value;;

        console.log(updatedMatrix)
        setYMatrix(updatedMatrix);
    };

    const renderXinput = () => {
        return (
            <div className="matrix-container">
                {<h4>X</h4>}

                <div>
                    {Xmatrix.map((row, rowIndex) => (


                        <div key={rowIndex} className="matrix-row" style={{ marginTop: "10px" }}>
                            <h4> x{rowIndex+1} </h4>
                            {row.map((cell, colIndex) => (
                                <input
                                    className="matrix-cell form-control"
                                    key={colIndex}
                                    type="text"
                                    value={cell}
                                    style={{ width: "100px" }}
                                    onChange={(e) => handleCellChange(e.target.value, rowIndex, colIndex)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderYinput = () => {
        return (
            <div className="matrix-container">
                {<h4>F(x)</h4>}
                <div className="matrix-row">
                    {Ymatrix.map((cell, colIndex) => (
                        <input
                            className="matrix-cell form-control"
                            key={colIndex}
                            type="text"
                            value={cell}
                            style={{ width: "100px" }}
                            onChange={(e) => handleYCellChange(e.target.value, colIndex)}
                        />
                    ))}
                </div>
            </div>



        );
    };

    const calculate = () => {

        console.log(Ymatrix)
        setDataGraph(3);

    }

    const loadOlddata = async () => {

        const res = await fetch('http://localhost:3001/getMutidata');
        const data = await res.json();

        console.log(data[0].x);

        setXMatrix(JSON.parse(data[0].x));

        setnofx(JSON.parse(data[0].x).length);

        setnData(JSON.parse(data[0].x)[0].length);
        setYMatrix(JSON.parse(data[0].fx));

    };

    const test = async () => {
        const res = await fetch("http://localhost:3001/jj");
        const data = await res.json();

        console.log(data)
    }



    return (
        <Container>
            <h1>mutilple linear</h1>
            <Form>

                <Form.Group>
                    <Form.Label>number of data</Form.Label>
                    <Form.Control
                        onChange={handelchange}
                        style={{ width: "20%" }}
                        value={ndata}
                        name="N" />

                </Form.Group>

                <div className="cal-button">
                    <Button onClick={generateinput} style={{ marginRight: "20px" }}>Generate</Button>
                    <Button onClick={calculate} style={{ marginleft: "20px" }}>cal</Button>

                    <Button onClick={loadOlddata} style={{ marginleft: "20px" }}>loadData</Button>

                    {/* <Button onClick = {test} style={{ marginleft: "20px" }}>test</Button> */}

                </div>

                <Form.Group>
                    <Form.Label>number of x</Form.Label>
                    <Form.Control value={nofx}
                        onChange={handelchange}
                        style={{ width: "20%" }}

                        name="Nofx" />

                </Form.Group>

            </Form>
            <div className="matrix-input-container">
                {renderXinput()}
            </div >

            <div className="matrix-input-container">
                {renderYinput()}
            </div >

            {
                graphdata && (
                    <Plot

                        data={[
                            {
                                x: graphdata.map((point) => point.x),
                                y: graphdata.map((point) => point.fx),
                                type: 'scatter',
                                mode: 'lines', // This line has only lines, no markers
                                line: { color: 'blue' },
                                name: 'Function', // Update the name
                            }]}

                        layout={{
                            width: 600,
                            height: 400,
                            title: 'test',
                            xaxis: { title: 'X' },
                            yaxis: { title: 'Y' },

                            showlegend: true, // Show the legend

                        }}



                    />

                )
            }


        </Container>


    )
}

export default Test2;
