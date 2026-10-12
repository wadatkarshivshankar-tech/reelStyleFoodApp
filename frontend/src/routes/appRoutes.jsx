import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ChooseRegister from '../pages/auth/chooseRegister';
import UserRegister from '../pages/auth/userRegister';
import UserLogin from '../pages/auth/userLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Home from "../pages/general/Home"
import Profile from "../pages/foodPartner/Profile"
import CreateFood from "../pages/foodPartner/CreateFood"


const AppRoutes = () => {
    return (
        <Router>
             <Routes>
                <Route path="/register"  element={<ChooseRegister/>}/>
                <Route path="/user/register" element={<UserRegister/>}/>
                <Route path="/user/login" element={<UserLogin/>}/>
                <Route path="/food-partner/register" element={<FoodPartnerRegister/>}/>
                <Route path="/food-partner/login" element={<FoodPartnerLogin/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path='/foodPartner/:id' element={<Profile/>} />
                <Route path="/create-food" element={<CreateFood/>}/>

            </Routes>   
        </Router>
    )
}

export default AppRoutes;