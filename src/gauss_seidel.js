import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';



const Seidel = () => {
    const [matrix, setMatrix] = useState([]);
    const [result, setresult] = useState([]);

    const [Xmatrix, setXMatrix] = useState([]);


    const [Bmatrix, setBMatrix] = useState([]);

    const [X0matrix, setx0Matrix] = useState([]);
    const [rows, setRows] = useState(2);
    const [columns, setColumns] = useState(2);




    const [showHeaders, setShowHeaders] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'rows') {
            setRows(value);
            setColumns(value);
        }




    };

    const generateMatrix = () => {
        const newX0Matrix = [];
        console.log(X0matrix)
        for (let i = 0; i < rows; i++) {
            newX0Matrix[i] = 0;
        }
        setx0Matrix(newX0Matrix);


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


    function gaussSeidelIteration(A, b, x0, maxIterations, tolerance) {
        const n = A.length;
        const x = new Array(n).fill(0);
    
        for (let iteration = 1; iteration <= maxIterations; iteration++) {
            for (let i = 0; i < n; i++) {
                let sum1 = 0.0;
                let sum2 = 0.0;
    
                for (let j = 0; j < i; j++) {
                    sum1 += A[i][j] * x[j];
                }
    
                for (let j = i + 1; j < n; j++) {
                    sum2 += A[i][j] * x0[j];
                }
    
                x[i] = (b[i] - sum1 - sum2) / A[i][i];
            }
    
            // Check for convergence
            let converged = true;
            for (let i = 0; i < n; i++) {
                if (Math.abs(x[i] - x0[i]) > tolerance) {
                    converged = false;
                    break;
                }
            }
    
            if (converged) {
                console.log(`Converged after ${iteration} iterations.`);
                break;
            }
    
            // Copy the new solution to x0 for the next iteration
            for (let i = 0; i < n; i++) {
                x0[i] = x[i];
            }
        }
    
        return x;
    }




    const calGauss_jordan = () => {

        const solution = gaussSeidelIteration(matrix, Bmatrix, X0matrix, 1000, 0.00001);


        setresult(solution);
        




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

    const handleX0MatrixChange = (value, row) => {

        console.log(X0matrix)
        const updatedx0Matrix = [...X0matrix];
        updatedx0Matrix[row]= value;
        setx0Matrix(updatedx0Matrix);

        
    };

    const renderXstartmatrix = () => {

        
        return (
            <div className="matrix-container" style={{marginTop:"40px"}}>
                {showHeaders && <h6>X เริ่มต้นของเเต่ละตัวแปร(default: 0)</h6>}
                {Xmatrix.map((cell, colIndex) => (
                    <div key={colIndex} style={{ width: "10%"}}>
                        <input type="text" class="form-control" placeholder={cell}
                        onChange={(e) => handleX0MatrixChange(e.target.value, colIndex)
                        }/>
                    </div>
                )

                )}
            </div>
        );
    };


    return (
        <Container>
            <h1>Gauss-seidel Iteration Method</h1>
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

            {renderXstartmatrix()}



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



export default Seidel;
