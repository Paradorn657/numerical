import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';


import { Alert } from "react-bootstrap";

const LinearRegression = () => {
    const [Xmatrix, setXMatrix] = useState([]);

    const [result, setresult] = useState([]);
    const [equation, setequation] = useState([]);

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
        setequation([])
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

    function findcoefPolynomial(x, y, degree) {
        const n = x.length;
    
        // Create arrays for the coefficient sums
        const sumX = new Array(2 * degree + 1).fill(0);
        const sumY = new Array(degree + 1).fill(0);
    
        // Calculate the sums of powers of x and xy
        for (let i = 0; i < n; i++) {
            const xVal = x[i];
            const yVal = y[i];
            for (let j = 0; j <= 2 * degree; j++) {
                sumX[j] += Math.pow(xVal, j);
            }
            for (let j = 0; j <= degree; j++) {
                sumY[j] += yVal * Math.pow(xVal, j);
            }
        }
    
        // Create and solve the coefficient matrix
        const coefficients = new Array(degree + 1).fill(null).map(() => new Array(degree + 1));
    
        for (let i = 0; i <= degree; i++) {
            for (let j = 0; j <= degree; j++) {
                coefficients[i][j] = sumX[i + j];
            }
        }
    
        for (let i = 0; i <= degree; i++) {
            for (let j = 0; j <= degree; j++) {
                console.log(coefficients[i][j] + " ");
            }
            console.log("");
        }
    
        const rightHandSide = new Array(degree + 1);
    
        for (let i = 0; i <= degree; i++) {
            rightHandSide[i] = sumY[i];
        }
    
        return GaussJordan(coefficients, rightHandSide);
    }

    function GaussJordan(A, B) {
        const rowCount = A.length;
        const colCount = A[0].length;
    
        // Augment the A matrix with the B matrix
        const augmentedMatrix = new Array(rowCount);
        for (let i = 0; i < rowCount; i++) {
            augmentedMatrix[i] = new Array(colCount + 1);
            for (let j = 0; j < colCount; j++) {
                augmentedMatrix[i][j] = A[i][j];
            }
            augmentedMatrix[i][colCount] = B[i];
        }
    
        // Perform Gauss-Jordan elimination
        for (let pivotRow = 0; pivotRow < rowCount; pivotRow++) {
            const pivot = augmentedMatrix[pivotRow][pivotRow];
    
            // Ensure the pivot is non-zero; if it's zero, swap rows if possible
            if (pivot === 0) {
                let swapped = false;
                for (let i = pivotRow + 1; i < rowCount; i++) {
                    if (augmentedMatrix[i][pivotRow] !== 0) {
                        swapRows(augmentedMatrix, pivotRow, i);
                        swapped = true;
                        break;
                    }
                }
                if (!swapped) {
                    // The system is singular (no unique solution)
                    return null;
                }
            }
    
            // Normalize the pivot row
            for (let j = pivotRow; j < colCount + 1; j++) {
                augmentedMatrix[pivotRow][j] /= pivot;
            }
    
            // Eliminate non-zero entries above and below the pivot
            for (let i = 0; i < rowCount; i++) {
                if (i !== pivotRow) {
                    const factor = augmentedMatrix[i][pivotRow];
                    for (let j = pivotRow; j < colCount + 1; j++) {
                        augmentedMatrix[i][j] -= factor * augmentedMatrix[pivotRow][j];
                    }
                }
            }
        }
    
        // Extract the solution from the last column of the augmented matrix
        const solution = new Array(rowCount);
        for (let i = 0; i < rowCount; i++) {
            solution[i] = augmentedMatrix[i][colCount];
        }
    
        return solution;
    }
    
    // Define the swapRows function for swapping rows in a 2D array
    function swapRows(matrix, row1, row2) {
        const temp = matrix[row1];
        matrix[row1] = matrix[row2];
        matrix[row2] = temp;
    }




    const predict_value = () => {

        if (splineType == "Linear") {

            const x = Xmatrix;
            const y = Ymatrix;
            const degree = 1;
        
            const coefficients = findcoefPolynomial(x, y, degree);
        
            let result = 0.0;
            for (let i = 0; i < coefficients.length; i++) {
                console.log(coefficients[i]);
                result += coefficients[i] * Math.pow(65, i);
            }
        
            console.log(result);

            console.log("Interpolated value" + result);

            var equation = "("+coefficients[0]+")" + " +"+"("+coefficients[1]+")"+`x`;;

            setresult([result])
            setequation([equation])

        }
        else if (splineType == "Polynomial") {

            const x = Xmatrix;

            console.log(x);
            const y = Ymatrix;
            const degree = 2;
        
            const coefficients = findcoefPolynomial(x, y, degree);
        
            let result = 0.0;
            for (let i = 0; i < coefficients.length; i++) {
                console.log(coefficients[i]);
                result += coefficients[i] * Math.pow(65, i);
            }
        
            console.log(result);

            console.log("Interpolated value" + result);
            var equation = "("+coefficients[0]+")" + " +"+"("+coefficients[1]+")"+`x`+"("+coefficients[1]+")"+`x^2`


            setresult([result])
            setequation([equation])

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
                <Form.Label style={{ marginTop: "20px" }} >Prediction value</Form.Label>
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

    const renderNXinput = () => {
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


    return (
        <Container>
            <h1>Regression</h1>
            <Form>

                <Form.Group>
                    <ToggleButtonGroup type="radio" name="splineType" onChange={handleSplineTypeChange} defaultValue={splineType} style={{ width: "50%", marginTop: "20px" }}>
                        <ToggleButton id="linear-radio" value={"Linear"} variant="outline-primary">Linear</ToggleButton>
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
                        Calculate
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
{/* 
            <div className="matrix-input" style={{ marginTop: "20px" }}>
                {showHeaders && renderNXinput()}
            </div> */}


            {
                result.map((x) =>
                    <Alert style={{ marginTop: "20px" }}>
                        {`Linear Regression value is: ${x}`}

                    </Alert>
                )
            }

             {
                equation.map((x) =>
                    <Alert style={{ marginTop: "20px" }}>
                        {`Equation is: ${x}`}

                    </Alert>
                )
            }






        </Container>
    );
};



export default LinearRegression;
