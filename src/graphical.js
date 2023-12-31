// import { useState } from "react"
// import { Button, Container, Form, Table } from "react-bootstrap";
// import { evaluate } from 'mathjs'
// import Plot from 'react-plotly.js';


// const Graphic = () => {


//     const [Equation, setEquation] = useState("(43*x)-180")

//     const [html, setHtml] = useState(null);
//     const [X_start, setX_start] = useState(0)
//     const [X, setX] = useState(0)
//     const [graphData, setGraphData] = useState(null);


//     const inputEquation = (event) => {
//         console.log(event.target.value)
//         setEquation(event.target.value)
//     }

//     const inputX_start = (event) => {
//         console.log(event.target.value)
//         setX_start(event.target.value)
//     }

//     const Calgraphical = (x_start) => {

//         var scope;


//         let x_old = 0;
//         let x = x_start;

//         const data = [];

//         scope = {
//             x:x,
//         }
//         let y = evaluate(Equation,scope);
        
        
//         while (y !== 0) {
//             let y_new = evaluate(Equation,{x:x});
//             data.push({ x, y_new});
//             x = x + 1;

//             console.log(x);

//             scope = {
//                 x:x,
//             }
//             y_new = evaluate(Equation,scope);
//             data.push({ x, y_new});
            
            
//             if (y_new * y < 0) {
//                 x = x - 1;
//                 while (Math.abs(x - x_old / x) * 100 > 0.000001) {
//                     console.log(x);
//                     x = x + 0.000001;
//                     scope = {
//                         x:x,
//                     }
//                     y_new = evaluate(Equation,scope);

//                     data.push({ x, y_new});

//                     if (y_new * y < 0) {
//                         break;
//                     }
        
//                     x_old = x;
//                 }
//                 break;
//             }
        
//             x_old = x;
//         }
//         setGraphData(data);
        
//         setX(x);



//     }

//     const calculateRoot = () =>{
//         const x_start = parseFloat(X_start)
//         Calgraphical(x_start);
//     }

//     return (
//         <Container>
//             <Form >
//                 <Form.Group className="mb-3">
//                     <Form.Label>Input f(x)</Form.Label>
//                     <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
//                     <Form.Label>Input X เริ่มต้น</Form.Label>
//                     <input type="number" id="X_start" onChange={inputX_start} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
//                 </Form.Group>
//                 <Button variant="dark" onClick={calculateRoot}>
//                     Calculate
//                 </Button>
//             </Form>
//             <br></br>
//             <h5>Answer = {X.toPrecision(7)}</h5>
//             {/* <Container>
//                 {html}
//             </Container> */}

//             <Container>
//         {graphData && (
//           <Plot
//             data={[
//               {
//                 x: graphData.map((point) => point.x),
//                 y: graphData.map((point) => point.y_new),
//                 type: 'scatter',
//                 mode: 'lines+points',
//                 marker: { color: 'blue' },
//               },
//             ]}
//             layout={{
//               width: 600,
//               height: 400,
//               title: 'Graph of the Equation',
//               xaxis: { title: 'X' },
//               yaxis: { title: 'Y' },
//             }}
//           />
//         )}
//       </Container>




//         </Container>

//     )



// }

// export default Graphic

import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Plot from 'react-plotly.js';
import { evaluate } from 'mathjs';

class Graphic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Equation: "(43*x)-180",
      X_start: 0,
      X: 0,
      graphData: null,
    };
  }

  inputEquation = (event) => {
    this.setState({ Equation: event.target.value });
  }

  inputX_start = (event) => {
    this.setState({ X_start: event.target.value });
  }

  Calgraphical = (x_start) => {
    let x_old = 0;
    let x = x_start;
    const data = [];

    let scope = {
      x: x,
    };
    let y = evaluate(this.state.Equation, scope);

    while (y !== 0) {
      let y_new = evaluate(this.state.Equation, { x: x });
      data.push({ x, y_new });
      x = x + 1;

      scope = {
        x: x,
      };
      y_new = evaluate(this.state.Equation, scope);
      data.push({ x, y_new });

      if (y_new * y < 0) {
        x = x - 1;
        while (Math.abs(x - x_old / x) * 100 > 0.000001) {
          x = x + 0.000001;
          scope = {
            x: x,
          };
          y_new = evaluate(this.state.Equation, scope);
          data.push({ x, y_new });

          if (y_new * y < 0) {
            break;
          }
          x_old = x;
        }
        break;
      }

      x_old = x;
    }
    this.setState({ graphData: data });

    this.setState({ X: x });
  }

  calculateRoot = () => {
    const x_start = parseFloat(this.state.X_start);
    this.Calgraphical(x_start);
  }

  render() {
    return (
      <Container>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Input f(x)</Form.Label>
            <input type="text" id="equation" value={this.state.Equation} onChange={this.inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control" />
            <Form.Label>Input X เริ่มต้น</Form.Label>
            <input type="number" id="X_start" onChange={this.inputX_start} style={{ width: "20%", margin: "0 auto" }} className="form-control" />
          </Form.Group>
          <Button variant="dark" onClick={this.calculateRoot}>
            Calculate
          </Button>
        </Form>
        <br></br>
        <h5>Answer = {this.state.X.toPrecision(7)}</h5>
        <Container>
          {this.state.graphData && (
            <Plot
              data={[
                {
                  x: this.state.graphData.map((point) => point.x),
                  y: this.state.graphData.map((point) => point.y_new),
                  type: 'scatter',
                  mode: 'lines+points',
                  marker: { color: 'blue' },
                },
              ]}
              layout={{
                width: 600,
                height: 400,
                title: 'Graph of the Equation',
                xaxis: { title: 'X' },
                yaxis: { title: 'Y' },
              }}
            />
          )}
        </Container>
      </Container>
    );
  }
}

export default Graphic;
