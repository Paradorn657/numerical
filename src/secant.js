import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { derivative } from 'mathjs'

const Secant = () => {

    const print = () =>{

    
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueX0(data.map((x)=>x.X0));
        setValuefx0(data.map((x)=>x.fx0));
        setValueX1(data.map((x)=>x.X1));
        setValueX2(data.map((x)=>x.X2));
        setValueeq(data.map((x)=>x.equation));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>

                            <th width="20%">Equation</th>

                            <th width="10%">X0</th>
                            <th width="20%">fx0</th>
                            <th width="10%">X1</th>
                            <th width="20%">fx1</th>
                            <th width="10%">X2</th>


                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.equation}</td>
                                <td>{element.X0}</td>
                                <td>{element.fx0}</td>
                                <td>{element.X1}</td>
                                <td>{element.fx1}</td>
                                <td>{element.X2}</td>
                                
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
           
        );
    }
   

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueX0, setValueX0] = useState([]);
    const [valuefx0, setValuefx0] = useState([]);

    const [valueX1, setValueX1] = useState([]);
    const [valuefx1, setValuefx1] = useState([]);
    const [valueX2, setValueX2] = useState([]);

    const [valueequation, setValueeq] = useState([]);
    const [valueXnew, setValueXnew] = useState([]);
     
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^2)-7")
    const [X,setX] = useState(0)
    const [X0,setX0] = useState(0)
    const [X1,setX1] = useState(0)
    const [er,seter] = useState("0.000001")

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }
    const inputX1 = (event) =>{
        console.log(event.target.value)
        setX1(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }

    const inputer = (event) =>{
        console.log(event.target.value)
        seter(event.target.value)
    }

    const calonepoint = (xzero,xone,er) => {

        var obj;
        var iter=0;

        let x0 = xzero;
        let x1 = xone;
        let x2 = x0 - (f(x0) * (x0 - x1) / (f(x0) - f(x1)));


        obj = {
            iteration:iter,
            X0:x0,
            fx0:f(x0),
            X1:x1,
            fx1:f(x1),

            X2:x2,
            equation:Equation,
            }
        data.push(obj)
      
        while (Math.abs(((x2 - x1) / x2) * 100) > er) {
          x0 = x1;
          x1 = x2;
          x2 = x0 - (f(x0) * (x0 - x1) / (f(x0) - f(x1)));



          iter++;  
          obj = {
            iteration:iter,
            X0:x0,
            fx0:f(x0),
            X1:x1,
            fx1:f(x1),
            X2:x2,
            equation:Equation,
            }
        data.push(obj)
        }

        



      
        setX(x2);
    
    
    
    }

    function f(x_input) {
        return evaluate(Equation,{x:x_input});;
      }
    
    

    const calculateRoot = () =>{
        const x0 = parseFloat(X0);
        const x1 = parseFloat(X1);
        const error = parseFloat(er)
        calonepoint(x0,x1,error);
     
        setHtml(print());
    }

    return (
            <Container>
                <Form >
                    <Form.Group className="mb-3">
                    <Form.Label>Input f(x) ย้ายข้างแล้ว</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input X เริ่มต้น (x0)</Form.Label>
                        <input type="number" id="X0"  onChange={inputX0} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>

                        <Form.Label>Input X เริ่มต้น (x1)</Form.Label>
                        <input type="number" id="X1"  onChange={inputX1} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>

                        <Form.Label>ค่า error ที่ยอมรับได้</Form.Label>
                        <input type="number" id="er" value={er} onChange={inputer} style={{width:"20%", margin:"0 auto"}} className="form-control" ></input>
                    </Form.Group>

                    <Button variant="dark" onClick={calculateRoot}>
                        Calculate
                    </Button>
                </Form>
                <br></br>
                <h5>Answer = {X}</h5>
                <Container>
                {html}
                </Container>
               
            </Container>
           
    )
}

export default Secant

