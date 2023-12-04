import React, { useEffect } from 'react'
import '../css/Home.css'
import MenuAppBar from './MenuAppBar' // Import the MenuAppBar component
import { Products } from './Products'

export const Home = ({ user }) => {

    return (
        <div className='wrapper'>
            <MenuAppBar/>
            <Products />
        </div>
    )
}