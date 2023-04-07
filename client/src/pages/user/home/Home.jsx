import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './home.css'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
  from 'mdb-react-ui-kit';
import { Container } from 'react-bootstrap'
import { FaEdit } from "react-icons/fa";
import EditProfile from '../../../modal/editProfile';

function Home() {
  const dispatch = useDispatch()
  async function logout() {
    await axios.get("http://localhost:8888/logout")
    dispatch({ type: "refresh" })
  }
  const user = useSelector((state) => {
    return state.user
  })
  const [open,setOpen]=useState()
  const baseImgUrl="http://localhost:8888/uploads/"

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
      <Container>

        <MDBRow>

          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

            <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
              Home <br />
              <span style={{ color: 'hsl(218, 81%, 75%)', fontSize: "22px" }}> Thank You for Joining Our Community </span>
            </h1>



          </MDBCol>

          <MDBCol md='6' className='position-relative'>

            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <MDBCard className='my-5 bg-glass'>
              <MDBCardBody className='p-5'>
                <div className="profile-area">
                  <div className="profilepic">
                    <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" alt=""
                      className='profileimg' />
                  </div>
                  <div className='edit-prodile'>
                  <button style={{textDecoration:"none",border:"none"}} onClick={()=>setOpen(true)} > <FaEdit /></button>
                    <div>
                      <p style={{margin:'0px',position:"relative",top:"3px"}}>Edit Profile</p>
                    </div>

              

                  </div>
                </div>

                <div className='name'>
                  <h3>{user.details.name}</h3>
                </div>

                <MDBInput wrapperClass='mb-4' label='Proffesion' id='form3' type='text' value={user.details.proffession}
                  style={{ marginTop: "17px", marginBottom: "40px" }} />
                <MDBInput wrapperClass='mb-4' label='Name' id='form4' type='text' value={user.details.name}
                  style={{ marginTop: "45px", marginBottom: "40px" }} />
                <MDBInput wrapperClass='mb-4' label='Email' id='form4' type='email' value={user.details.email} />


                <div className='d-flex justify-content-center mb-4'>
                  {/* <p style={{ color: "red" }}>{errMessage}</p> */}
                </div>

                <MDBBtn onClick={logout} className='w-100 mb-4' size='md' style={{ backgroundColor: '#870ccfd4' }}>Log Out</MDBBtn>

                <div className="text-center">



                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='facebook-f' size="sm" />
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='twitter' size="sm" />
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='google' size="sm" />
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='github' size="sm" />
                  </MDBBtn>

                </div>

              </MDBCardBody>
            </MDBCard>

          </MDBCol>

        </MDBRow>

      </Container>
      <EditProfile open={open} id={user.details._id} setOpen={setOpen}/>
    </MDBContainer>
  )
}

export default Home