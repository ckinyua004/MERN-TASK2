import { createContext, useContext, useState } from "react";

const userContext = createContext()

const userProvider = props => {
    const[user, setUser] = useState(null)

    const updateUser = user => {
        setUser(user)
    }

    const value = {
        user,
        updateUser
    }

    return(
        <UserContext.provider value={value}>{props.children}</UserContext.provider>
    )
}

const useUser = () => {
    const context = useContext(UserContext)
    if(context == undefined){
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}

export { userProvider, useUser}