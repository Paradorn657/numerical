import React, { useState } from 'react';
import { Container, Form, Button ,Alert} from 'react-bootstrap';


const Gauss = () => {
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
    const n = A.length;
    const X = new Array(n).fill(0);

    // Augment the A matrix with the B matrix
    const augmentedMatrix = new Array(n);
    for (let i = 0; i < n; i++) {
        augmentedMatrix[i] = new Array(n + 1);
        for (let j = 0; j < n; j++) {
            augmentedMatrix[i][j] = A[i][j];
        }
        augmentedMatrix[i][n] = B[i];
    }

    // Gaussian elimination
    for (let i = 0; i < n; i++) {
        // Partial pivoting
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(augmentedMatrix[k][i]) > Math.abs(augmentedMatrix[maxRow][i])) {
                maxRow = k;
            }
        }
        [augmentedMatrix[i], augmentedMatrix[maxRow]] = [augmentedMatrix[maxRow], augmentedMatrix[i]];

        // Elimination
        for (let k = i + 1; k < n; k++) {
            const factor = augmentedMatrix[k][i] / augmentedMatrix[i][i];
            for (let j = i; j <= n; j++) {
                augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
            }
        }
    }
    // Back-substitution
    for (let i = n - 1; i >= 0; i--) {
        X[i] = augmentedMatrix[i][n];
        for (let j = i + 1; j < n; j++) {
            X[i] -= augmentedMatrix[i][j] * X[j];
        }
        X[i] /= augmentedMatrix[i][i];
    }

    return X;
}

function swapRows(matrix, i, j) {
    const temp = matrix[i];
    matrix[i] = matrix[j];
    matrix[j] = temp;
}




  const calGauss = () => {
    

    const solutions = solveSystem(matrix, Bmatrix);

    setresult(solutions);

    console.log(solutions);


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
      <h1>Gauss elimination Method</h1>
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



        <Button variant="secondary" onClick={calGauss} style={{marginLeft: "20px" , marginTop: "20px" }}>
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



export default Gauss;
