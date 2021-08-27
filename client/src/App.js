
import './App.css';
import { Dash } from './Dash';
// import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { Signin } from './Signin';
import { Signup } from './Signup';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import { Profile } from './Profile';
import $ from 'jquery'
import axios from 'axios'
import { useEffect, useState } from 'react'



function App() {
  const [user, setuser] = useState();
  const [valid,setvalid]=useState(false);
    
    
    const uservalid=()=>{

      console.log('validusercalled')
      axios.get('https://writeit-aquaregia.herokuapp.com/reacttodo',{ 
      credentials: "include",
            
      headers: {
          Accept: "application/json",
          "Content-Type": "application"
      }}).then((res)=>{
        console.log(res.data)
        if(!user) {setuser(res.data);
          console.log('reached here')
         setvalid(true)
        }
        else{
          setvalid(false)
          setuser()

        }


      }).catch((err)=>{console.log(err)
      setvalid(false)
      setuser()
      })
    };
    // window.onload=uservalid();
    // window.setInterval(uservalid(),5000);

    

  
  useEffect(()=>{
    uservalid()
  },[])
 

 

  return (




    <Router>

      <Navbar user={user} valid={valid} setvalid={setvalid} ></Navbar>
      <Switch>
       
     { valid? <Route exact path='/'><Profile user={user}></Profile></Route>: <Route exact path='/'><center className="mt-5"><h1>Sign in to view your Profile</h1></center></Route>}
       <Route exact path='/react-todo' ><Dash valid={valid} user={user}></Dash></Route>
        <Route exact path='/signin'> <Signin  user={user} setuser={setuser} setvalid={setvalid}  ></Signin></Route>
        <Route exact path='/signup'> <Signup></Signup></Route>

      </Switch>


    </Router>
  );
}

export default App;
