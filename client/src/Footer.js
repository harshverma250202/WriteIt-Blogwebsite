import React from 'react'

export const Footer = () => {
    return (
        
    <footer id="66">
    <div className="foot container mb-5" >
      <div className="main-menu">
            <h3 className="footer-div-title">Main Menu</h3>
            <ul >
              <li className="pt-2 litag"><a href="#">Home</a></li>
              <li className="pt-2 litag"><a href="#">About Us</a></li>
              <li className="pt-2 litag"><a href="#"target="_blank">TERMS AND <br/>CONDITION</a></li>
              <li className="pt-2 litag"><a href="#"target="_blank">DATA PRIVACY</a></li>
              <li className="pt-2 litag"><a href="#" >BACK TO TOP</a></li>
            </ul>
      </div>
      <div className="about-us">
            <h3 className="footer-div-title">About Us</h3>
            <p className="mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam dolores excepturi eos molestiae id voluptate quis reiciendis. Enim, laboriosam corporis?</p>
            <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis praesentium molestiae quam cumque. Maxime ad voluptas numquam sequi quasi iusto est nesciunt deleniti ipsam dolor ipsum voluptatum maiores, assumenda nisi.</p>
      </div>
      <div className="social">
            <h3 className="footer-div-title">Get Social</h3>
            <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est inventore maxime deleniti quibusdam architecto dolorem accusantium quas similique, repellendus saepe dignissimos nam reiciendis? Officiis aspernatur soluta, ab voluptatem harum facilis!</p>
        <div className="social-icons" >
              <a href="#" className="social-icon"><i className="fa fa-facebook"></i></a>
              <a href="#" className="social-icon"><i className="fa fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fa fa-linkedin"></i></a>
              <a href="#" className="social-icon"><i className="fa fa-youtube"></i></a>
              <a href="#" className="social-icon"><i className="fa fa-instagram"></i></a>
        </div>
      </div>      
    </div>
   
      <div className="foot-footer">
        <div className="copyright">
         <p>Made by Harsh verma 20CH10022
        </p>
       </div>  
     </div>
 
    </footer>
    )
}
