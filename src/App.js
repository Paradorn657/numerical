import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Bisec from './bisection.js';
import Graphic from './graphical';
import Navbar from './navbar';

import Falseposition from './falseposition';

import Onepoint from './onepoint';

import Newton from './newton_raphson';

import Secant from './secant';
import Cramer from './cramer';
import Gauss from './Gauss_elimination';
import Gauss_jordan from './gaussjordan';

import Matrix_inverse from './Matrix_inversion';

import LU_method from './Lu_decompose';
import Cholesky from './cholesky';

import Jacobi from './jacobbi';
import Seidel from './gauss_seidel';

import Conjugate from './conjugateGradient';


function App() {

  let component
  switch (window.location.pathname) {
    case "/bisection":
      component = <Bisec/>
      break;
    case "/graphical":
      component = <Graphic/>
      break;
    case "/false_position":
        component = <Falseposition/>
        break;

    case "/newton_raphson":
        component = <Newton/>
        break;

    case "/one_point_iteration":
          component = <Onepoint/>
          break;
    case "/secant":
            component = <Secant/>
            break;

    case "/cramer_rule":
              component = <Cramer/>
              break;
   case "/gauss_eliminate":
                component = <Gauss/>
                break;
   case "/gauss_jordan":
                component = <Gauss_jordan/>
                break;   
    case "/matrix_inversion":
                component = <Matrix_inverse/>
                break;               
    case "/LU_method":
                component = <LU_method/>
                break;       
    case "/Cholesky":
                component = <Cholesky/>
                break;    
    case "/jacobbi":
                component = <Jacobi/>
                break;    
    case "/gauss_seidel":
                component = <Seidel/>
                break;
    case "/Conjugate":
                component = <Conjugate/>
                break;
    

    

  }


  return (
    <>
     <Navbar/>

     <div className='bosscontainer'>

     {component}
     </div>
    

    </>
    

  );
}

export default App;
