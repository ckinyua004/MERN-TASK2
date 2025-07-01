import { Link as RouterLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useUser } from '../context/userContext'
import { API_BASE_URL } from '../util'
import {
    Flex,
    Box,
    Spacer,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Image
} from '@chakra-ui/react'

export default function NavBar(){
    const { user, updateUser } = useUser()
    const navigate = useNavigate()

    const handleSignout = async () => {
        try{
            const res = await fetch(`${API_BASE_URL}/auth/signout`, {
                credentials: 'include'
            })
            const message = await res.json()
            toast.sucess(message)
            updateUser(null)
            navigate('/')
        }catch(error){
            toast.error(error)
        }
    }
}