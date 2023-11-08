import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"


export default function navbar() {



  return (
    



  <Navbar bg="dark" data-bs-theme="dark">
    <Container>


      <Navbar.Brand href="/home">Numerical method</Navbar.Brand>
      <Nav className="me-auto">


      <NavDropdown title= "Root of Equation">

        <NavDropdown.Item href="/graphical">graphical</NavDropdown.Item>
        <NavDropdown.Item href="/bisection">bisection</NavDropdown.Item>
        <NavDropdown.Item href="/false_position">false position</NavDropdown.Item>
        <NavDropdown.Item href="/one_point_iteration">one point iteration</NavDropdown.Item>
        <NavDropdown.Item href="/newton_raphson">Newton raphson</NavDropdown.Item>
        <NavDropdown.Item href="/secant">Secant</NavDropdown.Item>



      </NavDropdown>

      <NavDropdown title= "Linear Algebra">

        <NavDropdown.Item href="/cramer_rule">Cramer rule</NavDropdown.Item>
        <NavDropdown.Item href="/gauss_eliminate">Gauss elimination method</NavDropdown.Item>
        <NavDropdown.Item href="/gauss_jordan">Gauss jordan method</NavDropdown.Item>
        <NavDropdown.Item href="/matrix_inversion">Matrix Inversion Method</NavDropdown.Item>
        <NavDropdown.Item href="/LU_method">LU Decomposition Method</NavDropdown.Item>
        <NavDropdown.Item href="/Cholesky">Cholesky Decomposition Method</NavDropdown.Item>
        <NavDropdown.Item href="/jacobbi">Jacobi Iteration Method</NavDropdown.Item>
        <NavDropdown.Item href="/gauss_seidel">Gauss seidel Iteration Method</NavDropdown.Item>
        <NavDropdown.Item href="/Conjugate">Conjugate Gradient Method</NavDropdown.Item>


      </NavDropdown>

      <NavDropdown title= "Interpolation">

        <NavDropdown.Item href="/newton">Newton divided-differences</NavDropdown.Item>
        <NavDropdown.Item href="/Lagrance">Lagrange polynomials</NavDropdown.Item>
        <NavDropdown.Item href="/Spline">Spline Interpolation</NavDropdown.Item>
        


      </NavDropdown>

      <NavDropdown title= "Least Square Regression">
        <NavDropdown.Item href="/LinearRegression">Linear Regression</NavDropdown.Item>
        <NavDropdown.Item href="/MutipleRegression">Mutiple Linear Regression</NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title= "Integration">
        <NavDropdown.Item href="/Integration_singleTrape">Single Trapezoidal Rule</NavDropdown.Item>
        <NavDropdown.Item href="/Integration_CompositeTrape">Composite Trapezoid Rule</NavDropdown.Item>

        <NavDropdown.Item href="/Integration_simpson">Simpsons Rule</NavDropdown.Item>
        <NavDropdown.Item href="/Integration_compositeSimpsons">Composite Simpsons Rule</NavDropdown.Item>

      </NavDropdown>

      <NavDropdown title= "Difference">
        <NavDropdown.Item href="/Difference_first">First Divide-Differences</NavDropdown.Item>
        <NavDropdown.Item href="/Difference_second">Second Divide-Differences</NavDropdown.Item>
        
        <NavDropdown.Item href="/test">testpage</NavDropdown.Item>

      </NavDropdown>



      </Nav>
    </Container>
  </Navbar>
  )

}
