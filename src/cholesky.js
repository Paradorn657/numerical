import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';



const Cholesky = () => {
    const [matrix, setMatrix] = useState([]);
    const [result, setresult] = useState([]);

    const [Xmatrix, setXMatrix] = useState([]);


    const [Bmatrix, setBMatrix] = useState([]);


    const [rows, setRows] = useState(2);
    const [columns, setColumns] = useState(2);


    const [calbuttons, setcalButtons] = useState([]);


    const [showHeaders, setShowHeaders] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'rows') {
            setRows(value);
            setColumns(value);
        }


    };

    const generateMatrix = () => {
        const newMatrix = [];

        const xMatrix = [];

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < rows; j++) {
                row.push('');
            }
            newMatrix.push(row);
        }
        setMatrix(newMatrix);

        for (let i = 0; i < rows; i++) {

            xMatrix.push("X" + (i + 1));
        }
        setXMatrix(xMatrix);


        const bmatrix = [];

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < 1; j++) {
                row.push('');
            }
            bmatrix.push(row);
        }
        setBMatrix(bmatrix);

        setShowHeaders(true);


    };

    function choleskyDecomposition(matrix) {
        const n = matrix.length;
        const lowerTriangular = new Array(n).fill().map(() => new Array(n).fill(0));
    
        // Check if the matrix is square
        if (matrix.some(row => row.length !== n)) {
            throw new Error("Input matrix must be square.");
        }
    
        // Check if the matrix is symmetric
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < i; j++) {
                if (matrix[i][j] !== matrix[j][i]) {
                    throw new Error("Input matrix must be symmetric.");
                }
            }
        }
    
        for (let i = 0; i < n; i++) {
            for (let j = 0; j <= i; j++) {
                let sum = 0.0;
                if (j === i) {
                    for (let k = 0; k < j; k++) {
                        sum += Math.pow(lowerTriangular[j][k], 2);
                    }
                    const diagonalValue = matrix[j][j] - sum;
                    if (diagonalValue <= 0) {
                        throw new Error("Input matrix is not positive definite.");
                    }
                    lowerTriangular[j][j] = Math.sqrt(diagonalValue);
                } else {
                    for (let k = 0; k < j; k++) {
                        sum += lowerTriangular[i][k] * lowerTriangular[j][k];
                    }
                    lowerTriangular[i][j] = (matrix[i][j] - sum) / lowerTriangular[j][j];
                }
            }
        }
    
        return lowerTriangular;
    }
    

    function transpose(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const result = new Array(cols).fill().map(() => new Array(rows));

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                result[j][i] = matrix[i][j];
            }
        }

        return result;
    }
    function forwardSubstitution(L, b) {
        const n = L.length;
        const y = new Array(n).fill(0);

        for (let i = 0; i < n; i++) {
            let sum = 0.0;
            for (let j = 0; j < i; j++) {
                sum += L[i][j] * y[j];
            }
            y[i] = (b[i] - sum) / L[i][i];
        }

        return y;
    }

    function backwardSubstitution(LT, y) {
        const n = LT.length;
        const x = new Array(n).fill(0);

        for (let i = n - 1; i >= 0; i--) {
            let sum = 0.0;
            for (let j = i + 1; j < n; j++) {
                sum += LT[j][i] * x[j];
            }
            x[i] = (y[i] - sum) / LT[i][i];
        }

        return x;
    }



    const calGauss_jordan = () => {

        const L = choleskyDecomposition(matrix);

        console.log(L)
        const L_T = transpose(L);

        const Y = forwardSubstitution(L, Bmatrix);

        const X = backwardSubstitution(L_T, Y);


        setresult(X);
        




    }









    const handleCellChange = (value, row, col) => {
        const updatedMatrix = [...matrix];
        updatedMatrix[row][col] = value;;

        console.log(updatedMatrix)
        setMatrix(updatedMatrix);



    };

    const renderMatrix = () => {
        return (


            <div className="matrix-container">

                {showHeaders && <h1>A</h1>}

                {matrix.map((row, rowIndex) => (
                    <div key={rowIndex} className="matrix-row">
                        {row.map((cell, colIndex) => (
                            <input
                                className="matrix-cell form-control"
                                key={colIndex}
                                type="text"
                                value={cell}
                                onChange={(e) => handleCellChange(e.target.value, rowIndex, colIndex)}
                            />
                        ))}
                    </div>
                )
                )}


            </div>

        );
    };
    const handleBMatrixChange = (value, row, col) => {
        const updatedBMatrix = [...Bmatrix];
        updatedBMatrix[row][col] = value;
        setBMatrix(updatedBMatrix);
    };

    const renderBmatrix = () => {
        return (
            <div className="matrix-container">
                {showHeaders && <h1>B</h1>}
                {Bmatrix.map((row, rowIndex) => (
                    <div key={rowIndex} className="matrix-row">
                        {row.map((cell, colIndex) => (
                            <input
                                key={colIndex}
                                type="text"
                                className="matrix-cell form-control"
                                value={cell}
                                onChange={(e) => handleBMatrixChange(e.target.value, rowIndex, colIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    };


    const renderXmatrix = () => {
        return (
            <div className="matrix-container">
                {showHeaders && <h1>X</h1>}
                {Xmatrix.map((cell, colIndex) => (
                    <div key={colIndex} className="matrix-row">
                        <input
                            key={colIndex}
                            type="text"
                            className="matrix-cell form-control"
                            value={cell}
                        />
                    </div>
                )

                )}
            </div>
        );
    };


    return (
        <Container>
            <h1>Cholesky Decomposition Method</h1>
            <Form>
                <Form.Group controlId="rowInput">
                    <Form.Label style={{ marginTop: "20px" }} >Number of Varieble</Form.Label>
                    <Form.Control
                        type="number"
                        name="rows"
                        value={rows}
                        onChange={handleInputChange}
                        style={{ width: "20%" }}
                    />
                </Form.Group>



                <div className="cal-button">
                    <Button variant="primary" onClick={generateMatrix} style={{ marginTop: "20px" }} >
                        Generate Matrix
                    </Button>



                    <Button variant="secondary" onClick={calGauss_jordan} style={{ marginLeft: "20px", marginTop: "20px" }}>
                        Calculate Gauss elimination
                    </Button>

                </div>


            </Form>


            <div className="matrix-input-container">
                <div className="matrix-input">
                    {renderMatrix()}
                </div>
                <div className="matrix-input">
                    {renderXmatrix()}
                </div>
                <div className="matrix-input">
                    {renderBmatrix()}
                </div>



            </div >




            {
                result.map((x, index) =>
                    <Alert style={{ marginTop: "20px" }}>

                        {`X${index + 1}: ${x}`}

                    </Alert>
                )
            }




        </Container>
    );
};



export default Cholesky;
