import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';


const LU_method = () => {
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

 
    function luDecomposition(A, B) {
        const n = A.length;
        const L = new Array(n).fill().map(() => new Array(n));
        const U = new Array(n).fill().map(() => new Array(n));
    
        for (let i = 0; i < n; i++) {
            L[i][i] = 1;
    
            for (let j = i; j < n; j++) {
                let sum = 0;
                for (let k = 0; k < i; k++) {
                    sum += L[i][k] * U[k][j];
                }
                U[i][j] = A[i][j] - sum;
            }
    
            for (let j = i + 1; j < n; j++) {
                let sum = 0;
                for (let k = 0; k < i; k++) {
                    sum += L[j][k] * U[k][i];
                }
                L[j][i] = (A[j][i] - sum) / U[i][i];
            }
        }
    
        // Solve Ly = B for y using forward substitution
        const y = forwardSubstitution(L, B);
    
        // Solve Ux = y for x using backward substitution
        const x = backwardSubstitution(U, y);
    
        return [L, U, x];
    }
    
    function forwardSubstitution(L, B) {
        const n = L.length;
        const m = B[0].length;
        const y = new Array(n).fill().map(() => new Array(m));
    
        for (let j = 0; j < m; j++) {
            for (let i = 0; i < n; i++) {
                let sum = 0;
                for (let k = 0; k < i; k++) {
                    sum += L[i][k] * y[k][j];
                }
                y[i][j] = (B[i][j] - sum) / L[i][i];
            }
        }
    
        return y;
    }
    
    function backwardSubstitution(U, Y) {
        const n = U.length;
        const m = Y[0].length;
        const X = new Array(n).fill().map(() => new Array(m));
    
        for (let j = 0; j < m; j++) {
            for (let i = n - 1; i >= 0; i--) {
                let sum = 0;
                for (let k = i + 1; k < n; k++) {
                    sum += U[i][k] * X[k][j];
                }
                X[i][j] = (Y[i][j] - sum) / U[i][i];
            }
        }
    
        return X;
    }





    const calGauss_jordan = () => {
        
        const solutions = luDecomposition(matrix, Bmatrix);
        //0 คือ L Matrix
        //1 U Matrix
        // 2 Solution X:

        setresult(solutions[2])

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
            <h1>LU Decomposition Method</h1>
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
                        Calculate LU Decomposition Method
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



export default LU_method;
