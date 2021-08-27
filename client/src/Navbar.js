import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

export const Navbar = (props) => {
 const history=useHistory();
    let validation=props.valid  
    const logoutclick = () => {

        axios.get('https://writeit-aquaregia.herokuapp.com/logout',{ 
            headers: {
            Accept: "application/json",
            "Content-Type": "application"
        }, credentials: "include"})
        .then((res) => {
            
            props.setvalid(false);
            history.push('/signin')


        }).catch(() => {
            props.setvalid(false);
            history.push('/signin')
        })
    }
    

    const logout=(  <>
    <li className="nav-item"><Link className="nav-link active m-2" id='signin' to="/react-todo">HI {props.user? props.user.name:'demo'}!!</Link></li>
    <li className="nav-item">
    <a className="nav-link active m-2"  onClick={logoutclick}>Logout</a>
</li></>)
    

    const signblock=(<>
    <li className="nav-item">
        <Link className="nav-link active m-2" to="/Signup">Signup</Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link active m-2" id='signin' to="/Signin">SignIn</Link>
    </li></>
   )
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand m-2 " to="/react-todo">WriteIT</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">

                        <li className="nav-item">
                                <Link className="nav-link active m-2" aria-current="page" to="/">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active m-2" aria-current="page" to="/react-todo">Posts</Link>
                            </li>
                            {validation ? logout:signblock}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
