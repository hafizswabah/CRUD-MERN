import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import AdminHeader from '../../component/AdminHeader.jsx';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';

function AdminHome() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [refresh, setRefreash] = useState(false)
    useEffect(() => {
        (async function () {
            let { data } = await axios.get("http://localhost:8888/admin/users?search=" + search)
            console.log(data);
            setUsers(data.users)
        })()
    }, [search, refresh])
    async function deleteUser(id){
        if(window.confirm('are you sure about delete this user'))
        await axios.post("http://localhost:8888/admin/delete-user",{id})
        setRefreash(!refresh)
    }
    return (
        <div>
            <AdminHeader setSearch={setSearch} search={search} />
         
            <Container className='mt-5'>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>PROFILE</th>
                            <th>USER NAME</th>
                            <th>PROFFESSION</th>
                            <th>MAIL ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td><img src={"http://localhost:8888/uploads/" + item.profile} alt="" style={{ height: "65px" }} /></td>
                                    <td>{item.name}</td>
                                    <td>{item.proffession}</td>
                                    <td>{item.email}</td>
                                    <td>    <DropdownButton
                                        id="dropdown-button-dark-example2"
                                        variant="secondary"
                                        menuVariant="dark"
                                        title="Actions"
                                        className="mt-2"
                                    >
                                        <Dropdown.Item href={"/admin/update-user/"+item._id} active>
                                           
                                            update
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={()=>deleteUser(item._id)}>Delete</Dropdown.Item>
                                    </DropdownButton></td>

                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>

        </div >
    );
}


export default AdminHome