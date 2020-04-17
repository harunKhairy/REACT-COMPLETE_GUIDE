import React from 'react'

const authContext = React.createContext({
    aunthenticated: false,
    login: () => {}
})

export default authContext