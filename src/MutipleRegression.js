import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';


import { Alert } from "react-bootstrap";

const MutipleRegression = () => {
    const [Xmatrix, setXMatrix] = useState([]);

    const [result, setresult] = useState([]);

    const [Ymatrix, setYMatrix] = useState([]);

    const [usepoint, setusepoint] = useState([]);


    const [X, setX] = useState();
    const [nData, setnData] = useState(2);
    const [nOfx, setnOfx] = useState(2);

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


        else if (name === 'NofX') {
            console.log(value);
            setnOfx(value);

            const newMatrix = [];

            for (let i = 0; i < value; i++) {
                const newSubMatrix = [];
                for (let i = 0; i < nData; i++) {
                    newSubMatrix.push('');
                }
                newMatrix.push(newSubMatrix);
            }
            console.log(newMatrix);
            setXMatrix(newMatrix);






        }



    };

    const generateInput = () => {
        console.log(Xmatrix)
        console.log(Ymatrix)
        console.log(X)
        setShowHeaders(true)


        const mutipleMatrix = [];

        for (let i = 0; i < nOfx; i++) {
            const Matrix = [];
            for (let i = 0; i < nData; i++) {
                Matrix.push('');
            }
            mutipleMatrix.push(Matrix);
        }

        setXMatrix(mutipleMatrix);
        console.log(mutipleMatrix)




        const newMatrix = [];

        for (let i = 0; i < nData; i++) {
            newMatrix.push('');
        }


        setYMatrix(newMatrix);

        setresult([]);
        setX('');


        setShowHeaders(true);


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

    function multipleLinearRegression(X, Y) {
        const order = X.length + 1; // k
        const n = X[0].length;

        const coefficientMatrix = new Array(order).fill(0).map(() => new Array(order).fill(0));
        const constantMatrix = new Array(order).fill(0);

        coefficientMatrix[0][0] = n;
        for (let i = 1; i < order; i++) {
            let sumX = 0;
            for (let j = 0; j < n; j++) {
                sumX += X[i - 1][j];
            }
            coefficientMatrix[0][i] = sumX;
        }

        for (let i = 1; i < order; i++) {
            for (let j = 0; j < order; j++) {
                let sumX = 0;
                for (let k = 0; k < n; k++) {
                    if (j === 0) {
                        sumX += X[i - 1][k];
                    } else {
                        sumX += X[j - 1][k] * X[i - 1][k];
                    }
                }
                coefficientMatrix[i][j] = sumX;
            }
        }

        for (let i = 0; i < order; i++) {
            let sumXY = 0;
            for (let j = 0; j < n; j++) {
                if (i === 0) {
                    sumXY += Y[j];
                } else {
                    sumXY += Y[j] * X[i - 1][j];
                }
            }
            constantMatrix[i] = sumXY;
        }

        const coefficients = GaussJordan(coefficientMatrix, constantMatrix);

        return coefficients;
    }




    const predict_value = () => {
        console.log(Xmatrix);
        const x = Xmatrix;

        const y = Ymatrix;

        // Convert the elements of x to integers
        const xInt = x.map(row => row.map(value => Math.round(value)));

        // Convert the elements of y to integers
        const yInt = y.map(value => Math.round(value));


        const coefficients = multipleLinearRegression(xInt, yInt);
        
        for (let i = 0; i < coefficients.length; i++) {
            console.log(`Coefficient ${i}: ${coefficients[i]}`);

            

        }
        var equation = "("+coefficients[0]+")";
        for (let i = 1; i < coefficients.length; i++) {
            equation += " +"+"("+coefficients[i]+")"+`x${i}`;

        }

        console.log(equation);

        setresult([equation])




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
                {showHeaders && <h4>X</h4>}

                <div>

                    {Xmatrix.map((row, rowIndex) => (

                        <div key={rowIndex} className="matrix-row" style={{ marginTop: "10px" }}>

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

    const renderAmountXinput = () => {
        return (
            <Form.Group controlId="rowInput">
                <Form.Label style={{ marginTop: "20px" }} >Number of X</Form.Label>
                <Form.Control
                    type="number"
                    name="NofX"
                    value={nOfx}
                    onChange={handleCalInputChange}
                    style={{ width: "20%" }}
                />
            </Form.Group>


        );
    };

    const loadOlddata = async() => {
        setShowHeaders(true);

        const res = await fetch('http://localhost:3001/getMutidata');
        const data = await res.json();

        console.log(data[0].x);

        setXMatrix(JSON.parse(data[0].x));

        setnOfx(JSON.parse(data[0].x).length);

        setnData(JSON.parse(data[0].x)[0].length);
        setYMatrix(JSON.parse(data[0].fx));
        
    };



    return (
        <Container>
            <h1>Mutiple Linear Regression</h1>
            <Form>

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

                    <Button onClick = {loadOlddata} style={{ marginleft: "20px" }}>loadData</Button>


                </div>


            </Form>

            {showHeaders && renderAmountXinput()}


            <div className="matrix-input-container">
                {renderXinput()}
            </div >

            <div className="matrix-input" style={{ marginTop: "20px" }}>
                {renderYinput()}
            </div>



            {
                result.map((x) =>
                    <Alert style={{ marginTop: "20px" }}>
                        {`Equation is: ${x}`}

                    </Alert>
                )
            }






        </Container>
    );
};



export default MutipleRegression;
