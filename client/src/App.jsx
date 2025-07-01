import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import { Toaster } from 'react-hot-toast'
import Profile from './pages/Profile'
import privateRoute from './components/privateRoute'
import NavBar from './components/navbar'

export default function App(){
  return(
    <ChakraProvider>
      <BrowserRouter>
        <Toaster position='bottom-right' />
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route element={<privateRoute />}>
            <Route path='/profile' element={<Profile />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}