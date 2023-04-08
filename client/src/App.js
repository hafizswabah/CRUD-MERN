import react, { useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Signup from './pages/user/signup/signup';
import Login from './pages/user/login/login';
import Home from './pages/user/home/Home';
import AdminLogin from './pages/admin/adminLogin';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';


function App() {

  // axios.defaults.baseURL="http://localhost:8888/"
  axios.defaults.withCredentials = true
  const { user, refresh } = useSelector((state) => {
    return state
  })
  console.log(user);
  const dispatch = useDispatch()
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("http://localhost:8888/check-auth")
      console.log(data);
      dispatch({ type: "user", payload: { login: data.loggedIn, details: data.user } })
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
        } <Routes>
          <Route path='/admin/login' element={<AdminLogin />}></Route>
        </Routes>
      </div>

    </Router>
  );
}

export default App;
