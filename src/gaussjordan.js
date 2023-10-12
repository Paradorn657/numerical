import React, { useState } from 'react';
import { Container, Form, Button ,Alert} from 'react-bootstrap';


const Gauss_jordan = () => {
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
    } else {
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

        xMatrix.push("X"+(i+1));
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

  function determinant(matrix) {
    const n = matrix.length;
    if (n === 1) {
        return matrix[0][0];
    }
    if (n === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let det = 0;
    for (let col = 0; col < n; col++) {
        const subMatrix = new Array(n - 1).fill(0).map(() => new Array(n - 1));
        for (let i = 1; i < n; i++) {
            for (let j = 0, k = 0; j < n; j++) {
                if (j !== col) {
                    subMatrix[i - 1][k] = matrix[i][j];
                    k++;
                }
            }
        }
        det += Math.pow(-1, col) * matrix[0][col] * determinant(subMatrix);
    }
    return det;
}


function solveSystem(A, B) {
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

    console.log(augmentedMatrix);

    // Extract the solution from the last column of the augmented matrix
    const solution = new Array(rowCount);
    for (let i = 0; i < rowCount; i++) {
        solution[i] = augmentedMatrix[i][colCount];
    }

    return solution;
}


function swapRows(matrix, row1, row2) {
    const temp = matrix[row1];
    matrix[row1] = matrix[row2];
    matrix[row2] = temp;
}




  const calGauss_jordan = () => {
    

    const solutions = solveSystem(matrix, Bmatrix);

    setresult(solutions);

    


  }




  



  const handleCellChange = (value, row, col) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[row][col] = value;

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
      <h1>Gauss Jordan Method</h1>
      <Form>
        <Form.Group controlId="rowInput">
          <Form.Label style={{marginTop: "20px" }} >Number of Varieble</Form.Label>
          <Form.Control
            type="number"
            name="rows"
            value={rows}
            onChange={handleInputChange}
            style={{width:"20%"}}
          />
        </Form.Group>
      


        <div className="cal-button">
        <Button variant="primary" onClick={generateMatrix} style={{ marginTop: "20px" }} >
          Generate Matrix
        </Button>



        <Button variant="secondary" onClick={calGauss_jordan} style={{marginLeft: "20px" , marginTop: "20px" }}>
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
          result.map((x,index)=>
          <Alert style={{marginTop: "20px" }}>
            
            {`X${index+1}: ${x}`}
          
          </Alert>
          )
        }

        
      
      
    </Container>
  );
};



export default Gauss_jordan;
