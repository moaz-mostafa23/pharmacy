import React, { useEffect } from 'react'
import '../css/Home.css'
import MenuAppBar from './MenuAppBar' // Import the MenuAppBar component

export const Home = ({ user }) => {

    return (
        <div className='wrapper'>
            <MenuAppBar/>
        </div>
    )
}