import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




function EditProfile({open,setOpen,id}) {
  const[file,setFile]=useState()
  const[errMessage,setErrMessage]=useState(null)
  const dispatch=useDispatch()
  
async function handleSubmit(){
    let {data}=await axios.post('http://localhost:8888/edit-profile',{file,id},{
        headers:{
            'Content-Type':'multypart/form-data'
        }
    })
    if(data.error){
        setErrMessage(data.error)
    }else{
        dispatch({type:'refresh'})
    }
}

    return (
        <div>
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Edit Profile Picture</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Select an Image to update Profile Picture
                </DialogContentText>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} className='mt-4 mb-2' accept='image/*' />
                {
                    errMessage &&
                    <p className="text-danger">{errMessage}</p>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default EditProfile