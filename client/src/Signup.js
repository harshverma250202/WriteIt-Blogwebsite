import React from 'react'
import $ from 'jquery'
import axios from 'axios'

export const Signup = () => {
  // const signup=
  //  (e)=>{

  //   e.preventDefault();

  //   axios({

  //     url:"http://127.0.0.1:8000/register",
  //     method:"POST",
  //     headers:
  //    { "Content-Type": "application/json"},    


  //     body: JSON.stringify({
  //                 name:"frthyjkhgf", email:"sdfghj", phone:456, password:"fdsghj",
  //             })
  //   }).then((res)=>console.log('hiii')).catch((err)=>console.log(err))


  // }
  const signup =

    (e) => {
      let signupdata={ name: $('#signupname').val(),
      email: $('#signupemail').val(),
      phone: $('#signupmobile').val(),
      password: $('#signuppassword').val()}
      e.preventDefault();

      axios.post(

        "/register",

        JSON.stringify(signupdata), {
        headers: {
          "Content-type": "application/json"
        }
      }
      ).then((res) => {
                       alert('registered success') ;
                       document.getElementById('SignUpForm').reset();}).catch(err=>{alert(err);
                        document.getElementById('SignUpForm').reset();})


    }



  //   const signup = async (e)=>{
  //     e.preventDefault();
  //     // const {name, email, phone,, password} = {"harsh","sdf",45,"1222"};
  //     const res = await fetch("http://127.0.0.1:8000/register",{
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  // body: JSON.stringify({
  //     name:"frthyjkhgf", email:"sdfghj", phone:456, password:"fdsghj",
  // })
  //     });
  //     const data = await res.json();
  //     console.log(data, res)
  //     if(res.status === 422 || !data)
  //     {
  //         window.alert("Invalid registration");
  //         console.log("Invalid reg");
  //     }
  //     else{
  //         window.alert("successful registration");
  //         console.log("success reg");
  //         
  //     }

  // }
  return (

    <center className="container mt-5 mb-5 mainform">
      <h1>Sign Up</h1>
      <form id="SignUpForm" onSubmit={signup}>
        <div className="mb-3">
          {/* <label htmlFor="signupname" className="form-label">Name:</label> */}
          <input type="text" className="form-control" id="signupname" name="signupname" placeholder='Name' />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="signupemail" className="form-label">Email address</label> */}
          <input type="email" className="form-control" id="signupemail" name="signupemail" placeholder='Email address' />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="loginemail" className="form-label">Email address</label> */}
          <input type="number" className="form-control" id="signupmobile" placeholder='Mobile' />
        </div>

        <div className="mb-3">
          {/* <label htmlFor="loginpassword" className="form-label">Password</label> */}
          <input type="password" className="form-control" name="signuppassword" id="signuppassword" placeholder='Password' />
        </div>


        <button type="submit" className="btn " style={{border:"2px solid black"}}>Submit</button>
      </form>
    </center>
  )
}
