import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"


export default function navbar() {



  return (
    



  <Navbar bg="dark" data-bs-theme="dark">
    <Container>


      <Navbar.Brand href="#home">Numerical method</Navbar.Brand>
      <Nav className="me-auto">


      <NavDropdown title= "Root of Equation">

        <NavDropdown.Item href="/graphical">graphical</NavDropdown.Item>
        <NavDropdown.Item href="/bisection">bisection</NavDropdown.Item>
        <NavDropdown.Item href="/false_position">false position</NavDropdown.Item>
        <NavDropdown.Item href="/one_point_iteration">one point iteration</NavDropdown.Item>
        <NavDropdown.Item href="/newton_raphson">Newton raphson</NavDropdown.Item>
        <NavDropdown.Item href="/secant">Secant</NavDropdown.Item>



      </NavDropdown>

      <NavDropdown title= "Matrix">

        <NavDropdown.Item href="/graphical">graphical</NavDropdown.Item>
        <NavDropdown.Item href="/bisection">bisection</NavDropdown.Item>
        <NavDropdown.Item href="/false_position">false position</NavDropdown.Item>
        <NavDropdown.Item href="/one_point_iteration">one point iteration</NavDropdown.Item>
        <NavDropdown.Item href="/newton_raphson">Newton raphson</NavDropdown.Item>
        <NavDropdown.Item href="/secant">Secant</NavDropdown.Item>



      </NavDropdown>


      </Nav>
    </Container>
  </Navbar>
  )

}
