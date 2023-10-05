import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'


const Falseposition = () => {

    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueXl(data.map((x)=>x.Xl));
        setValueXm(data.map((x)=>x.X1));
        setValueXr(data.map((x)=>x.Xr));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">X1</th>
                            <th width="30%">XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.X1}</td>
                                <td>{element.Xr}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
           
        );
    }
   

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [valueXr, setValueXr] = useState([]);
     
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [XL,setXL] = useState(0)
    const [XR,setXR] = useState(0)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputXL = (event) =>{
        console.log(event.target.value)
        setXL(event.target.value)
    }

    const inputXR = (event) =>{
        console.log(event.target.value)
        setXR(event.target.value)
    }

    const calfalseposition = (xl, xr) => {
        let xL = xl;
        let xR = xr;
        var scope;

        var iter = 0;
        var obj={};
    
        scope = {
            x:xL,
        }
        let f_xL = evaluate(Equation,scope);
    
        scope = {
            x:xR,
        }
        let f_xR = evaluate(Equation,scope);
    
        let x1_old = 0;
        let x1 = ((xL * f_xR) - (xR * f_xL)) / (f_xR - f_xL);
    
        while (Math.abs((x1 - x1_old) / x1) * 100 > 0.000001) {
            x1 = ((xL * f_xR) - (xR * f_xL)) / (f_xR - f_xL);
    
            scope = {
                x:x1,
            }
            let f_x1 = evaluate(Equation,scope);
    
            iter ++;
            if (f_x1 * f_xR > 0) {
                
                xR = x1;      
            } else if (f_x1 * f_xR < 0) {

                
                xL = x1;
            }


    
            x1_old = x1;
            x1 = ((xL * f_xR) - (xR * f_xL)) / (f_xR - f_xL);

            obj = {
                iteration:iter,
                Xl:xL,
                X1:x1,
                Xr:xR
            }
            data.push(obj)

        }
    
        setX(x1);
    
    
    
    }

    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        calfalseposition(xlnum,xrnum);
     
        setHtml(print());
           
        console.log(valueIter)
        console.log(valueXl)
    }

    return (
            <Container>
                <Form >
                    <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input XL</Form.Label>
                        <input type="number" id="XL" onChange={inputXL} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input XR</Form.Label>
                        <input type="number" id="XR" onChange={inputXR} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
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

export default Falseposition

