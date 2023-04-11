import react, { useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Signup from './pages/user/signup/signup';
import Login from './pages/user/login/login';
import Home from './pages/user/home/Home';
import AdminLogin from './pages/admin/adminLogin';
import AdminHome from './pages/admin/adminHome';
import CreateUser from './pages/admin/CreateUser';
import EditUser from './pages/admin/EditUser';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';



function App() {

  // axios.defaults.baseURL="http://localhost:8888/"
  axios.defaults.withCredentials = true
  const { user, refresh, admin } = useSelector((state) => {
    return state
  })
  console.log(admin);
  console.log(user);
  const dispatch = useDispatch()
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("http://localhost:8888/check-auth")
      console.log(data);
      dispatch({ type: "user", payload: { login: data.loggedIn, details: data.user } })
      let { data: adminData } = await axios.get("http://localhost:8888/admin/check-auth")
      console.log('admin',adminData);

      dispatch({ type: "admin", payload: { login: adminData.loggedIn } })
    })()
  }, [refresh])


  return (
    <Router>
      <div className="App">
        {user.login == false &&
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace={true} />} />
          </Routes>
        }
        {user.login == true &&
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Navigate to="/" replace={true} />}></Route>
            <Route path="/signup" element={<Navigate to="/" replace={true} />}></Route>
          </Routes>
        }
        {admin.login == false &&
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />}></Route>
            <Route path="/admin" element={<Navigate to="/admin/login" replace={true} />}></Route>
          </Routes>
        }
        {admin.login==true &&
          <Routes>
            <Route path="/admin" element={<AdminHome />}></Route>
            <Route path="/admin/update-user/:id" element={<EditUser/>}></Route>
            <Route path="/admin/create-user" element={<CreateUser/>}></Route>
             <Route path="/admin/login" element={<Navigate to="/admin" replace={true} />}></Route>
    
          </Routes>
        }

      </div>

    </Router>
  );
}

export default App;
