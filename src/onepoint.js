import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'


const Onepoint = () => {

    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueXold(data.map((x)=>x.Xold));
        setValueeq(data.map((x)=>x.equation));
        setValueXnew(data.map((x)=>x.Xnew));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">X OLD</th>
                            <th width="30%">Equation</th>
                            <th width="30%">X NEW</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xold}</td>
                                <td>{element.equation}</td>
                                <td>{element.Xnew}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
           
        );
    }
   

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueXold, setValueXold] = useState([]);
    const [valueequation, setValueeq] = useState([]);
    const [valueXnew, setValueXnew] = useState([]);
     
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x+1)/3")
    const [X,setX] = useState(0)
    const [X0,setX0] = useState(0)
    const [er,seter] = useState("0.000001")

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }

    const inputer = (event) =>{
        console.log(event.target.value)
        seter(event.target.value)
    }

    const calonepoint = (xstart, er) => {
        var obj={};
        var iter = 0;


        let x0 = xstart;
        let xold = 0;




        let xn = evaluate(Equation,{x:x0});

        obj = {
            iteration:iter,
            Xold:xold,
            equation:Equation.replace("x",xold),
            Xnew:xn
        }
        data.push(obj)
        
        console.log(xn);
        while (Math.abs((xn - xold) / xn) * 100 > er) {
          xold = xn;
          xn = evaluate(Equation,{x:xn});


        

          iter++;
          obj = {
            iteration:iter,
            Xold:xold,
            equation:Equation.replace("x",xold),
            Xnew:xn
        }
        data.push(obj)

          
        
          console.log(xn);
        }
        
        setX(xn);
    
    
    
    }

    const calculateRoot = () =>{
        const x0 = parseFloat(X0);
        const error = parseFloat(er)
        calonepoint(x0,error);
     
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

export default Onepoint

