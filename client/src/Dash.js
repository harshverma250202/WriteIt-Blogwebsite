import React from "react";
import { useState, useEffect } from "react";
import $ from 'jquery'
import swal from 'sweetalert';

import axios from "axios";

export const Dash = (props) => {

  const [data, setData] = useState('');
  const [textarea,settextarea]=useState();

  useEffect(() => {

  });

  const style = { display: "none" };

  //api reqs
  const all = () => {

    axios
      .get("/all", {
        
        headers: {
          Accept: "application/json",
          "Content-Type": "application"
        }
      })
      .then((res) => {
        // swal("registered success");
        let x = res.data;
        setData(x);


      })
      .catch((err) =>{         swal("Some error occurred","","error");    });
  };
  const [temp, settemp] = useState(false)
  const sub = (e) => {
    e.preventDefault();
    let formdatapost={ text: $('#text').val() };
    axios.post('/post', JSON.stringify(formdatapost), {
      
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include", 
    }).then((res) => {
      swal(res.data.message,"","success");
      if (temp) {
        settemp(false)
      }
      else {

        settemp(true)
      }
    }
    ).catch((err) => {         
      swal("Some error occurred","","error");
  })
  }



  useEffect(() => {
    all();
  }, [temp]);

  const like=(e)=>{
    
    axios.put(`/like/${e}`, {
      credentials: "include", headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(()=>{
        console.log('liked');
        if (temp) {
          settemp(false)
        }
        else {
          settemp(true)
        }
        
    }).catch((err)=>{
      console.log(err)
    })
  }
  const dislike=(e)=>{
    axios.put(`/dislike/${e}`, {
      credentials: "include", headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(()=>{
        console.log('liked');
        if (temp) {
          settemp(false)
        }
        else {
          settemp(true)
        }
        
    }).catch((err)=>{
      console.log(err)
    })
  }




  const deletepost=(e)=>{

    axios.delete(`/delete/${e}`,{
      credentials: "include", headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(()=>{
      swal('postdelete succesfully',"","success");
    if (temp) {
      settemp(false)
    }
    else {
      settemp(true)
    }
    }).catch((err)=>{
      swal("Some error occurred","","error");
    })

  }

    let edit = (e) => {
     
      console.log(e)
      
      document.getElementById(e+'1').style.display = "none";
      let str2=e +String(2);
      console.log(str2)
      let btn1 = document.getElementById(str2);
      btn1.style.display = "inline-block";
      document.getElementById(e+'div').style.display = "none";
      document.getElementById(e+'textarea').style.display = "block";

      
  };
  let saveedit = (e,k) => {
      document.getElementById(e+'1').style.display = "inline-block";
      let str2=e +String(2);
      console.log(str2)
      let btn1 = document.getElementById(str2);
      btn1.style.display = "none";
      let item=textarea?textarea:k;
      console.log(item)
      axios.put(`/update/${e}`,{"text": item },{
        credentials: "include", headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then((res)=>{
        swal("post updated","","success")
        if (temp) {
          settemp(false)
          settextarea();
        }
        else {
          settemp(true);
          settextarea();

        }
        document.getElementById(e+'div').style.display = "block";
      document.getElementById(e+'textarea').style.display = "none";

      }).catch((err)=>{ swal(err,"","error")})
  };








  return (

    <div className="container">
      {props.valid && <center>
        <form onSubmit={sub}
          id="mainform" className="mt-5 mb-5 postform" data-aos={"fade-down"}>
          <h1>Create Post</h1>
          <div className="mb-3">
            {/* <label for="username" className="form-label">Username</label> */}
            <input type="text" className="form-control" id="username" placeholder="UserName" value={props.user.name} required />
          </div>
          <div className="mb-3">
            {/* <label for="text" className="form-label">text</label><br /> */}
            <textarea name="text" className="form-control" id="text" placeholder="Message to Sent" required></textarea>
          </div>

          <button type="submit" className="btn" style={{border:"2px solid black"}}>
            <b>Share Post</b>
          </button>
        </form>
      </center>}

      <div className="posts ">
        {data &&
          data.map((info) => {
            return (
              <center  data-aos="zoom-in-down" data-aos-delay="100" data-aos-easing="ease-in-sine">

                <div className="mt-5 mb-5 postform">
                <div className="mb-3">
                      <h5>
                        {" "}
                        <span className="leftpost">
                          Name: {info.name}{" "}
                        </span>{" "}
                        <span className="rightpost">Emails:{info.owneremail}</span>{" "}
                      </h5>
                     </div>
                  <form className="">

                    
                     <br></br>
                     <br></br>
                     <br></br>
                     <div className="mb-3">
                      
                      <textarea name="text" className="form-control" 
                        value={(textarea||textarea=='')?textarea:info.text} style={style}
                        onChange={(e)=>{settextarea(e.target.value)}} id={info._id+"textarea"}
                      ></textarea>
                      <div   className="postdiv" id={info._id+"div"}  >{info.text}</div>
                    </div>
                  </form>
                  { !props.valid&&<><button className="btn me-3" btnidentity={info._id} onClick={()=>{swal('not Signed in',"","warning")}} >
                    
                    <i className="fa fa-thumbs-up sizeicon"></i>{" "}
                    {info.likes.number}
                    </button>
                    <button className="btn me-3" btnidentity={info._id} onClick={()=>{swal('not Signed in',"","warning")}}
                    >
                    <i className="fa fa-thumbs-down sizeicon"></i>{" "}
                    {info.dislikes.number}
                    </button></>}
                {  props.valid&&<>  <button className="btn me-3" btnidentity={info._id} onClick={()=>{like(info._id)}}>

                    <i className="fa fa-thumbs-up sizeicon"></i>{" "}
                    {info.likes.number}
                  </button>
                  <button className="btn me-3" btnidentity={info._id} onClick={()=>{dislike(info._id)}}
                  >
                    <i className="fa fa-thumbs-down sizeicon"></i>{" "}
                    {info.dislikes.number}
                  </button>
               {(props.user._id==info.ownerid) && <>  <button className="btn btn me-3" btnidentity={info._id} onClick={()=>{deletepost(info._id)}}
                  >
                    
                    <i className="fa fa-trash sizeicon" ></i>{" "}
                 </button>
                  <button className="btn btn me-3" btnidentity={info._id} id={info._id+String(1)} onClick={()=>edit(info._id)}

                  >
                    <i className="fa fa-edit sizeicon"></i>
                  </button>
                  <button className="btn btn me-3"  style={{border:"2px solid black",display:"none"}} btnidentity={info._id} id={info._id+String(2)}  onClick={()=>saveedit(info._id,info.text)}

                  >
                    Save
                  </button></>}</>}
                </div>
              </center>
            );
          })}{" "}
      </div>

      <button type="button" className="btn btn-primary" style={style} data-bs-toggle="modal" id="imaginaryclick"
        data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modaltitle">
                .
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" id="modalbody"></div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};







  // let sub = (e) => {
  //     e.preventDefault();
  //     // console.log('hiii')

  //     let obj = {};
  //     obj["name"] = document.getElementById("username").value;
  //     obj["text"] = document.getElementById("text").value;
  //     obj["sn"] = data[data.length - 1].sn + 1;
  //     obj["like"] = 0;
  //     obj["dislike"] = 0;

  //     setData([...data, obj]);
  //     document.getElementById("modaltitle").innerHTML =
  //         "Hello  " + obj.name + "!";
  //     document.getElementById("modalbody").innerHTML =
  //         "you have succesfully Shared Post with Post No. : " + obj.sn;
  //     document.getElementById("imaginaryclick").click();
  //     console.log(data);
  //     document.getElementById("mainform").reset();
  // };
  // let del = (item) => {
  //     document.getElementById("modaltitle").innerHTML =
  //         "Hello  " + item.name + "!";
  //     document.getElementById("modalbody").innerHTML =
  //         "you have succesfully deleted Post with Post No. : " + item.sn;
  //     document.getElementById("imaginaryclick").click();

  //     setData(
  //         data.filter((e) => {
  //             return e !== item;
  //         })
  //     );
  // };

  // let edit = (item) => {
  //     let id = "savebtn" + item.sn;
  //     let btn = document.getElementById(id);
  //     btn.style.display = "inline-block";
  //     let id1 = "editbtn" + item.sn;
  //     let btn1 = document.getElementById(id1);
  //     btn1.style.display = "none";
  //     let textid = "text" + item.sn;
  //     let selecttext = document.getElementById(textid);
  //     selecttext.disabled = false;
  // };
  // let saveedit = (item) => {
  //     document.getElementById("modaltitle").innerHTML =
  //         "Hello  " + item.name + "!";
  //     document.getElementById("modalbody").innerHTML =
  //         "you have succesfully Edited Post with Post No. : " + item.sn;
  //     document.getElementById("imaginaryclick").click();
  //     let id = "savebtn" + item.sn;
  //     let btn = document.getElementById(id);
  //     btn.style.display = "none";
  //     let id1 = "editbtn" + item.sn;
  //     let btn1 = document.getElementById(id1);
  //     btn1.style.display = "inline-block";
  //     let textid = "text" + item.sn;
  //     let selecttext = document.getElementById(textid);
  //     selecttext.disabled = true;
  // };

  // let like = (item) => {
  //     // console.log(item)
  //     let x = item.like + 1;
  //     // console.log(data)

  //     setData(
  //         data.map((initem) =>
  //             initem.sn === item.sn ? { ...initem, like: x } : initem
  //         )
  //     );
  //     // console.log(data)

  //     // setData( [{...item,'like':item.like}]);
  // };
  // let dislike = (item) => {
  //     let x = item.dislike + 1;

  //     setData(
  //         data.map((initem) =>
  //             initem.sn === item.sn ? { ...initem, dislike: x } : initem
  //         )
  //     );
  // };