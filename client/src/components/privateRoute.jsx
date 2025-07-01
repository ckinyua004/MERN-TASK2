import { outlet, navigate } from 'react-router-dom'
import { useUser } from '../context/userContext'

export default function privateRoute(){
    const { user } = useUser()
    return user ? <Outlet /> : <Navigate to='/signin' />
}