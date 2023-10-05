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
