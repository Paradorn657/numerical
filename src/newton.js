import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';


import { Alert } from "react-bootstrap";

const Newton_interpolation = () => {
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

            const indicesToSelect = usepoint;

            const xdata = new Array(indicesToSelect.length);
            const yData = new Array(indicesToSelect.length);

            for (let i = 0; i < indicesToSelect.length; i++) {
                const index = indicesToSelect[i] - 1;

                xdata[i] = parseFloat(Xmatrix[index]);
                yData[i] = parseFloat(Ymatrix[index]);
            }

            console.log(xdata);
            console.log(yData);

            const x = X; // Value to interpolate at

            const coefficients = [...yData]; // Create a copy of the yDataUsePoint array
            for (let j = 1; j < usepoint.length; j++) {
                for (let i = usepoint.length - 1; i >= j; i--) {
                    coefficients[i] = (coefficients[i] - coefficients[i - 1]) / (xdata[i] - xdata[i - j]);
                }
            }

            let result = coefficients[0];

            for (let i = 1; i < usepoint.length; i++) {
                result += coefficients[i] * (x - xdata[i - 1]);
            }

            console.log("Interpolated value" + result);

            setresult([result])

        }
        else if (splineType == "Quadratic") {

            console.log(usepoint)

            // const xdata = [0, 20000, 40000, 60000, 80000];
            // const yData = [9.81, 9.7487, 9.6879, 9.6879, 9.5682];

            const indicesToSelect = usepoint;

            const xdata = new Array(indicesToSelect.length);
            const yData = new Array(indicesToSelect.length);

            for (let i = 0; i < indicesToSelect.length; i++) {
                const index = indicesToSelect[i] - 1;

                xdata[i] = parseFloat(Xmatrix[index]);
                yData[i] = parseFloat(Ymatrix[index]);
            }

            console.log(xdata);
            console.log(yData);

            const x = X; // Value to interpolate at

            const coefficients = [...yData]; // Create a copy of the yDataUsePoint array
            for (let j = 1; j < usepoint.length; j++) {
                for (let i = usepoint.length - 1; i >= j; i--) {
                    coefficients[i] = (coefficients[i] - coefficients[i - 1]) / (xdata[i] - xdata[i - j]);
                }
            }

            let result = coefficients[0];

            for (let i = 1; i < usepoint.length; i++) {
                result += coefficients[i] * (x - xdata[i - 1]);
            }

            console.log("Interpolated value" + result);

            setresult([result])

        }
        else if (splineType == "Polynomial") {

            console.log(usepoint)

            // const xdata = [0, 20000, 40000, 60000, 80000];
            // const yData = [9.81, 9.7487, 9.6879, 9.6879, 9.5682];

            const indicesToSelect = usepoint;

            const xdata = new Array(indicesToSelect.length);
            const yData = new Array(indicesToSelect.length);

            for (let i = 0; i < indicesToSelect.length; i++) {
                const index = indicesToSelect[i] - 1;

                xdata[i] = parseFloat(Xmatrix[index]);
                yData[i] = parseFloat(Ymatrix[index]);
            }

            console.log(xdata);
            console.log(yData);

            const x = X; // Value to interpolate at

            const coefficients = [...yData]; // Create a copy of the yDataUsePoint array
            for (let j = 1; j < usepoint.length; j++) {
                for (let i = usepoint.length - 1; i >= j; i--) {
                    coefficients[i] = (coefficients[i] - coefficients[i - 1]) / (xdata[i] - xdata[i - j]);
                }
            }

            let result = coefficients[0];

            for (let i = 1; i < usepoint.length; i++) {
                result += coefficients[i] * (x - xdata[i - 1]);
            }

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

    const renderUsepointpolyinput = () => {
        return (
            <Form.Group controlId="rowInput">
                <Form.Label style={{ marginTop: "20px" }} >Number of usepoint</Form.Label>
                <Form.Control
                    type="number"
                    name="usepoint"
                    onChange={handleCalInputChange}
                    style={{ width: "20%" }}
                />
            </Form.Group>


        );
    };

    const renderUsepointinput = () => {
        return (
            <div className="matrix-container">
                {showHeaders && <h6>Use point (between 1-{nData})</h6>}
                <div className="matrix-row">
                    {usepoint.map((cell, colIndex) => (
                        <input
                            className="matrix-cell form-control"
                            key={colIndex}
                            type="text"
                            value={cell}
                            onChange={(e) => handleUSepointChange(e.target.value, colIndex)}
                        />
                    ))}
                </div>


            </div>

        );
    };

    const sendDataToServer = () => {
        // Prepare the data to send to the server
        // const dataToSend = [1,2]

        // Send the data to the server
        fetch('http://localhost:3001/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({Xmatrix,Ymatrix}),
        })
            .then((response) => {
                if (response.status === 201) {
                    console.log('Data sent successfully');
                } else {
                    console.error('Failed to send data to the server');
                }
            })
            .catch((error) => {
                console.error('Error sending data:', error);
            });
    };

    const loadOlddata = async() => {

        const res = await fetch('http://localhost:3001/get');
        const data = await res.json();

        console.log(data[data.length-1]);
        
        generateInput();
        setnData(JSON.parse(data[data.length-1].x).length);
        console.log(JSON.parse(data[data.length-1].x).length);
        setXMatrix(JSON.parse(data[data.length-1].x));
        setYMatrix(JSON.parse(data[data.length-1].fx))

        

        

       
    };


    return (
        <Container>
            <h1>Newton divided-differences</h1>
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

                    <Button variant="secondary" onClick={sendDataToServer} style={{ marginLeft: "20px", marginTop: "20px" }}>
                        Send Data to Server
                    </Button>

                    <Button variant="secondary" onClick={loadOlddata} style={{ marginLeft: "20px", marginTop: "20px" }}>
                        load old Data
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

            {showUsepoint_inp && renderUsepointpolyinput()}

            <div className="matrix-input" style={{ marginTop: "20px" }}>
                {showHeaders && renderUsepointinput()}
            </div>


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



export default Newton_interpolation;
