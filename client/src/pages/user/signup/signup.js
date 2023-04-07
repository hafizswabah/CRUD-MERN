import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux'
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
import './signup.css'
import { Link } from 'react-router-dom';


function Signup() {

  const [name, setName] = useState('')
  const [proffession, setProffession] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMessage, setErrMessage] = useState(null)
  const dispatch = useDispatch()

  async function handleSubmit(e) {
    e.preventDefault()
    let { data } = await axios.post('http://localhost:8888/sign-up',
      { name, email, password,proffession })
    console.log(data);
    if (!data.error) {
      dispatch({ type: "refresh" })
    } else {
      setErrMessage(data.message)
    }
  }
  return (

    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
      <Container>

        <MDBRow>

          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

            <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
              Sign Up Here <br />
              <span style={{ color: 'hsl(218, 81%, 75%)', fontSize: "43px" }}>To Your Proffessional Account</span>
            </h1>

            <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
            Join with us . Be with us ! We will help you to meet your destiny. We will travel all along your journey to find your dream carrier.
            </p>

          </MDBCol>

          <MDBCol md='6' className='position-relative'>

            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <MDBCard className='my-5 bg-glass'>
              <MDBCardBody className='p-5'>



                <MDBInput wrapperClass='mb-4' label='Your Name' id='form3' type='text' onChange={(e)=>{setName(e.target.value)}} value={name}/>
                <MDBInput wrapperClass='mb-4' label='Proffession' id='form3' type='text'  onChange={(e)=>{setProffession(e.target.value)}} value={proffession}/>
                <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' onChange={(e)=>{setEmail(e.target.value)}} value={email} />
                <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password'  onChange={(e)=>{setPassword(e.target.value)}} value={password} />

                <div className='d-flex justify-content-center mb-4'>
                  <p style={{ color: "red" }}>{errMessage}</p>
                </div>

                <MDBBtn onClick={handleSubmit} className='w-100 mb-4' size='md' style={{backgroundColor:'#870ccfd4'}}>sign up</MDBBtn>

                <div className="text-center">

                  <p><Link to="/login"> already have an account?.Please Login here !</Link></p>

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
    </MDBContainer>

  );
}

export default Signup;