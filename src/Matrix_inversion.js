import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';


const Matrix_inverse = () => {
    const [matrix, setMatrix] = useState([]);
    const [result, setresult] = useState([]);

    const [Xmatrix, setXMatrix] = useState([]);


    const [Bmatrix, setBMatrix] = useState([]);


    const [rows, setRows] = useState(2);
    const [columns, setColumns] = useState(2);


    const [Inverse, setInverse] = useState([]);


    const [showHeaders, setShowHeaders] = useState(false);

    const [showHeadersInverse, setShowHeadersInverse] = useState(false);

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

    function Generatematrix_AI(A) {
        const rows = A.length;
        const columns = A[0].length;

        // Create the identity matrix I
        const I = new Array(rows).fill().map(() => new Array(columns));

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                I[i][j] = (i === j) ? 1 : 0;
            }
        }

        // Create the augmented matrix [A|I]
        const A_I = new Array(rows).fill().map(() => new Array(columns * 2));
        const columnsA_I = columns * 2;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                A_I[i][j] = A[i][j];
            }
            for (let j = 0; j < columns; j++) {
                A_I[i][j + columns] = I[i][j];
            }
        }

        console.log(A_I)

        return A_I;
    }

    function matrixmul(A_Invers, B) {
        const n = A_Invers.length;
        const m = B[0].length;

        const x = new Array(n).fill().map(() => new Array(m));

        for (let i = 0; i < B.length; i++) {
            let sum = 0;
            for (let j = 0; j < A_Invers.length; j++) {
                sum += A_Invers[i][j] * B[j][0];
            }
            x[i][0] = sum;
        }

        return x;
    }






    const calMatrix_inversion = () => {

        setShowHeadersInverse(true);
        const A_I = gaussjordan(Generatematrix_AI(matrix))

        const inverseMatrix = [];

        for (let i = 0; i < rows; i++) {
            inverseMatrix[i] = [];
            for (let j = columns; j < columns * 2; j++) {
                inverseMatrix[i].push(A_I[i][j]);
            }
        }


        console.log(A_I)


        console.log(inverseMatrix);
        setInverse(inverseMatrix);
        const solutions = matrixmul(inverseMatrix, Bmatrix);

        console.log(solutions);

        setresult(solutions)

    }


    function gaussjordan(A) {
        const rows = A.length; // Number of rows
        const columns = A[0].length;

        for (let k = 0; k < rows; k++) {
            const pivot = A[k][k];

            // Divide the entire row by the pivot
            for (let j = k; j < columns; j++) {
                A[k][j] /= pivot;
            }

            for (let i = 0; i < rows; i++) {
                if (i !== k) {
                    const factor = A[i][k];

                    for (let j = k; j < columns; j++) {
                        A[i][j] -= A[k][j] * factor;
                    }
                }
            }
        }

        console.log(A)

        return A;
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

    const renderAinversematrix = () => {
        return (


            <div className="matrix-container">

                {showHeadersInverse && <h3>A Inverse</h3>}

                {Inverse.map((row, rowIndex) => (
                    <div key={rowIndex} className="matrix-row">
                        {row.map((cell, colIndex) => (
                            <input
                                style={{ width:"50%" }}
                                className="matrix-cell form-control"
                                key={colIndex}
                                type="text"
                                value={cell}
                            />
                        ))}
                    </div>
                )
                )}


            </div>

        );
    };


    return (
        <Container>
            <h1>Matrix Inversion Method</h1>
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



                    <Button variant="secondary" onClick={calMatrix_inversion} style={{ marginLeft: "20px", marginTop: "20px" }}>
                        Calculate Matrix Inversion method
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


            <div className="matrix-input" style={{ marginTop: "40px" , marginBottom:"80px" }} >
                {renderAinversematrix()}
            </div>




        </Container>
    );
};



export default Matrix_inverse;
