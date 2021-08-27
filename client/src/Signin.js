import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import $ from 'jquery'
import axios from 'axios'

export const Signin = (props) => {
     
  const history=useHistory();
  const signin = (e) => {
    e.preventDefault();
    let stform= {email: $('#loginemail').val(),

    password: $('#loginpassword').val(),}
    document.getElementById('signinform').reset();
    // console.log( $('#loginemail').val(),"hii")
    axios.post(

      "/login",

      JSON.stringify(
          stform
       
      ), 
      
      {withCredentials: true,
      headers: {
        "Content-type": "application/json",
        "xhrFields": { "withCredentials": true },

      }
    }
    ).then((res) => {
      
      alert('login success');
      
      history.push('/react-todo')
      
      props.setuser(res.data.userexist)
      props.setvalid(true)
      
      
   
      
      
      console.log(props.user)
    })
      .catch((err, res) => {
        console.log(err, res);

       
        
        alert(err);
      })


  }



    return (
    
<>

<h3 className="mt-5"><center>Share Your Thought  Throw WriteIT<br></br>Register Now </center></h3>
    
    <center className='mainform' > 
        <div className="container" >
          
          <h1>Sign In</h1>

<form onSubmit={signin} id="signinform" >
  <div className="mb-3">
    <input type="email" className="form-control" name="email" id="loginemail" placeholder='Email address' />
  </div>
  <div className="mb-3"> 
    <input type="password" className="form-control" name="password" id="loginpassword"  placeholder='Password'/>
    </div>

  <button type="submit" className="btn " style={{border:"2px solid black"}} >Submit</button>
</form>

 <Link className="nav-link m-2 linkclass " to="/Signup"><h5>if not registered <p style={{color:"black"}} >SignUp</p></h5></Link>
</div></center></>
    )
}
