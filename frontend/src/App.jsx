import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/navbar'
import Homepage from './pages/homepage'
import Signuppage from './pages/signuppage'
import Loginpage from './pages/loginpage'  
import Settingspage from './pages/settingspage'
import Profilepage from './pages/profilepage'
import { axiosInstance } from './lib/axios'
import { useauthstore } from './store/useauthstore'
import { useEffect } from 'react'
import { Loader } from "lucide-react"
import { Toaster } from 'react-hot-toast'



const App = () => {
  const {authuser, checkauth, ischeckingauth} = useauthstore();

  useEffect(() => {
    checkauth()
  }, [checkauth])

  console.log({ authuser });

  if(ischeckingauth && !authuser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"/>
    </div>
  )

  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={authuser ? <Homepage /> : <Navigate to="/login"/>}/>
          <Route path='/signup' element={!authuser ? <Signuppage /> : <Navigate to="/" />}/>
          <Route path='/login' element={!authuser ? <Loginpage /> : <Navigate to="/" />}/>
          <Route path='/setting' element={<Settingspage />}/>
          <Route path='/profile' element={authuser ? <Profilepage /> : <Navigate to="/login" />}/>
        </Routes>

        <Toaster/>
      </div>
    </BrowserRouter>
  )
}

export default App;
