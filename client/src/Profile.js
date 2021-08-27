import React from 'react'

export const Profile = (props) => {
    return (
       
            <center>
            <div className="card">
            {/* <img src="team2.jpg" alt="John" style="width:100%"/> */}
             <h1> Name : { props.user.name}</h1>
            
               {/* <h3>Harvard University</h3> */}
            
            <h3>Email :  { props.user.email}</h3>
            <h3>Phone :  { props.user.phone}</h3>
            <div style={{margin: "24px 0"}}>
              </div>
          
              </div>





            

        
            </center>
       
    )
}
