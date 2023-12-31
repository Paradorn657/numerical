import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { CalCubicSpline, CalLinearSpline, CalQuadraticSpline } from "./calspline";

import { Alert } from "react-bootstrap";

const Spline_interpolation = () => {
    const [Xmatrix, setXMatrix] = useState([]);

    const [result, setresult] = useState([]);

    const [Ymatrix, setYMatrix] = useState([]);

    const [usepoint, setusepoint] = useState([]);


    const [X, setX] = useState();
    const [nData, setnData] = useState(2);

    const [showHeaders, setShowHeaders] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'Ndata') {
            setnData(value);
        }
    };

    const [nUsepoint, setnUsepoint] = useState(2);

    const handleCalInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'data') {
            setX(value);
        }
        else if (name === 'usepoint') {
            setnUsepoint(value)
            const newMatrix = [];

            for (let i = 0; i < value; i++) {
                newMatrix.push('');
            }
            setusepoint(newMatrix);
        }



    };

    const generateInput = () => {
        console.log(splineType)
        console.log(Xmatrix)
        console.log(Ymatrix)
        console.log(X)
        setShowHeaders(true)

        const newMatrix = [];

        for (let i = 0; i < nData; i++) {
            newMatrix.push('');
        }

        setXMatrix(newMatrix);
        setYMatrix(newMatrix);

        setresult([]);
        setX('');


        setShowHeaders(true);

        if (splineType == "Linear") {
            const usepointnewMatrix = [];

            for (let i = 0; i < 2; i++) {
                usepointnewMatrix.push('');
            }

            setusepoint(usepointnewMatrix);

            setshowUsepoint_inp(false);
        }
        else if (splineType == "Quadratic") {
            const usepointnewMatrix = [];

            for (let i = 0; i < 3; i++) {
                usepointnewMatrix.push('');
            }

            setusepoint(usepointnewMatrix);

            setshowUsepoint_inp(false);

        }
        else if (splineType == "Polynomial") {
            const usepointnewMatrix = [];

            for (let i = 0; i < nUsepoint; i++) {
                usepointnewMatrix.push('');
            }

            setusepoint(usepointnewMatrix);

            setshowUsepoint_inp(true);
        }



    };
    const [showUsepoint_inp, setshowUsepoint_inp] = useState(false);


    const predict_value = () => {

        if (splineType == "Linear") {

            console.log(usepoint)

            // const xdata = [0, 20000, 40000, 60000, 80000];
            // const yData = [9.81, 9.7487, 9.6879, 9.6879, 9.5682];

            // const indicesToSelect = usepoint;

            // const xdata = new Array(indicesToSelect.length);
            // const yData = new Array(indicesToSelect.length);

            // for (let i = 0; i < indicesToSelect.length; i++) {
            //     const index = indicesToSelect[i] - 1;

            //     xdata[i] = parseFloat(Xmatrix[index]);
            //     yData[i] = parseFloat(Ymatrix[index]);
            // }

            // console.log(xdata);
            // console.log(yData);

            // console.log(xdata.length)



            const x = X; // Value to interpolate at

            var result = CalLinearSpline(Xmatrix,Ymatrix,x);

            console.log(result);

            console.log("Interpolated value" + result);

            setresult([result])

        }
        else if (splineType == "Quadratic") {

            console.log(usepoint)

            // const xdata = [0, 20000, 40000, 60000, 80000];
            // const yData = [9.81, 9.7487, 9.6879, 9.6879, 9.5682];

            // const indicesToSelect = usepoint;

            // const xdata = new Array(indicesToSelect.length);
            // const yData = new Array(indicesToSelect.length);

            // for (let i = 0; i < indicesToSelect.length; i++) {
            //     const index = indicesToSelect[i] - 1;

            //     xdata[i] = parseFloat(Xmatrix[index]);
            //     yData[i] = parseFloat(Ymatrix[index]);
            // }

            // console.log(xdata);
            // console.log(yData);

            const x = X; // Value to interpolate at

            let result = CalQuadraticSpline(Xmatrix,Ymatrix,x);
            

            console.log(result);


            console.log("Interpolated value" + result);

            setresult([result])

        }
        else if (splineType == "Polynomial") {

            console.log(usepoint)

            // const xdata = [0, 20000, 40000, 60000, 80000];
            // const yData = [9.81, 9.7487, 9.6879, 9.6879, 9.5682];

            // const indicesToSelect = usepoint;

            // const xdata = new Array(indicesToSelect.length);
            // const yData = new Array(indicesToSelect.length);

            // for (let i = 0; i < indicesToSelect.length; i++) {
            //     const index = indicesToSelect[i] - 1;

            //     xdata[i] = parseFloat(Xmatrix[index]);
            //     yData[i] = parseFloat(Ymatrix[index]);
            // }

            

            const x = X; // Value to interpolate at
            let result = CalCubicSpline(Xmatrix,Ymatrix,x);
            console.log(result);

            console.log("Interpolated value" + result);

            setresult([result])

        }



    }




    const handleCellChange = (value, col) => {
        const updatedMatrix = [...Xmatrix];
        updatedMatrix[col] = value;;

        console.log(updatedMatrix)
        setXMatrix(updatedMatrix);
    };

    const handleUSepointChange = (value, col) => {
        const updatedMatrix = [...usepoint];
        updatedMatrix[col] = value;;

        console.log(updatedMatrix)
        setusepoint(updatedMatrix);
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

                {showHeaders && <h4>X</h4>}
                <div className="matrix-row">
                    {Xmatrix.map((cell, colIndex) => (
                        <input
                            className="matrix-cell form-control"
                            key={colIndex}
                            type="text"
                            value={cell}
                            style={{ width: "100px" }}
                            onChange={(e) => handleCellChange(e.target.value, colIndex)}
                        />
                    ))}
                </div>


            </div>

        );
    };

    const renderYinput = () => {
        return (
            <div className="matrix-container">
                {showHeaders && <h4>F(x)</h4>}
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



    const [splineType, setsplineType] = useState("Linear");

    const handleSplineTypeChange = (value) => {
        setsplineType(value);
    };

    const renderCalinput = () => {
        return (
            <Form.Group controlId="rowInput">
                <Form.Label style={{ marginTop: "20px" }} >Interpolation value</Form.Label>
                <Form.Control
                    type="number"
                    name="data"
                    value={X}
                    onChange={handleCalInputChange}
                    style={{ width: "20%" }}
                />
            </Form.Group>


        );
    };




    return (
        <Container>
            <h1>Spline Interpolation</h1>
            <Form>

                <Form.Group>
                    <ToggleButtonGroup type="radio" name="splineType" onChange={handleSplineTypeChange} defaultValue={splineType} style={{ width: "50%", marginTop: "20px" }}>
                        <ToggleButton id="linear-radio" value={"Linear"} variant="outline-primary">Linear</ToggleButton>
                        <ToggleButton id="quadratic-radio" value={"Quadratic"} variant="outline-primary">Quadratic</ToggleButton>
                        <ToggleButton id="cubic-radio" value={"Polynomial"} variant="outline-primary">Polynomial</ToggleButton>
                    </ToggleButtonGroup>
                </Form.Group>
                <Form.Group controlId="rowInput">
                    <Form.Label style={{ marginTop: "20px" }} >Number of Data</Form.Label>
                    <Form.Control
                        type="number"
                        name="Ndata"
                        value={nData}
                        onChange={handleInputChange}
                        style={{ width: "20%" }}
                    />
                </Form.Group>





                <div className="cal-button">
                    <Button variant="primary" onClick={generateInput} style={{ marginTop: "20px" }} >
                        Generate Data Form
                    </Button>



                    <Button variant="secondary" onClick={predict_value} style={{ marginLeft: "20px", marginTop: "20px" }}>
                        Interpolated
                    </Button>

                </div>


            </Form>


            <div className="matrix-input-container">
                <div className="matrix-input">
                    {renderXinput()}
                </div>
            </div >

            <div className="matrix-input" style={{ marginTop: "20px" }}>
                {renderYinput()}
            </div>

            {showHeaders && renderCalinput()}

            {/* {showUsepoint_inp && renderUsepointpolyinput()} */}

            {/* <div className="matrix-input" style={{ marginTop: "20px" }}>
                {showHeaders && renderUsepointinput()}
            </div> */}


            {
                result.map((x) =>
                    <Alert style={{ marginTop: "20px" }}>
                        {`Interpolated value is: ${x}`}

                    </Alert>
                )
            }






        </Container>
    );
};



export default Spline_interpolation;
