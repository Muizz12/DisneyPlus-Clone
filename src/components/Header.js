import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase.js'
import {useDispatch,useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import {
    selectUserName,
    selectUserEmail,
    selectUserPhoto,
    setUserLoginDetails,
    setSignOutState,

} from "../features/users/userSlice"
function Header() {
    const dispatch=useDispatch()
    const history=useHistory()
    const username=useSelector(selectUserName);
    const userPhoto=useSelector(selectUserPhoto);
    const handleAuth=()=>{
        if(!username){
            auth.signInWithPopup(provider)
            .then((result)=>{
                console.log(result.user);
                setUser(result.user)
            }).catch((error)=>{
                console.log(error);
            })
        }else if(username){
            auth.signOut().then((result)=>{
                dispatch(setSignOutState())
                history.push('/')
            }).catch((error)=>{
                console.log(error);
            })
        }
        
    }
    
    const setUser=(user)=>{
        dispatch(
            setUserLoginDetails({
                name:user.displayName,
                email:user.email,
                photo:user.photoURL,
            })
        
        )
    
}
   useEffect(() => {
       auth.onAuthStateChanged(async(user)=>{
if(user){
    setUser(user);
    history.push('./home')
}

       })
      
   }, [username])
    return (
        <NAV>
            <Logo>
                <img src= "/Images/logo.svg"/> 
            </Logo>
            {
                !username?<Login onClick={handleAuth} >Login</Login>
                :
                <>
                 <NavMenu>
               <a href='/home' >
                   <img src="/Images/home-icon.svg"/>
               <span>HOME</span>
               </a>
               <a href='/Search' >
                   <img src="/Images/Search-icon.svg"/>
               <span>SEARCH</span>
               </a>
               <a href='/Watchlist' >
                   <img src="/Images/watchlist-icon.svg"/>
               <span>WATCHLIST</span>
               </a>
               <a href='/MOVIES' >
                   <img src="/Images/Movie-icon.svg"/>
               <span>MOVIES</span>
               </a>
               <a href='/SERIES' >
                   <img src="/Images/Series-icon.svg"/>
               <span>SERIES</span>
               </a>
            </NavMenu>
            <SignOut>
                    <UserImg src={userPhoto} alt={userPhoto}/>
                    <DropDown><span onClick={handleAuth}>Sign Out</span></DropDown>
               </SignOut>
                </>
            }
        </NAV>
    )
}
const UserImg=styled.img`
height: 100%;
`;
const DropDown=styled.div`
 position: absolute;
    top: 48px;
    right: 0px;
    background-color:rgb(19,19,19);
    border: 1px solid rgba(151,151,151,0.34);
    border-radius: 4px;
    box-shadow:rgb(000/50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;

`;
const SignOut=styled.div`
position: relative;
height: 48px;
width: 48px;
display: flex;
cursor: pointer;
align-items: center;
justify-content: center;
${UserImg}{
    border-radius: 50%;
    width: 100%;
    height: 100%;

}
&:hover{
    ${DropDown}{
        opacity: 1;
        transition-duration:1s;

    }
}

`;
const NAV=styled.nav`
position: fixed;
top: 0;
left: 0;
right: 0;
height: 70px;
background-color:#090b13 ;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 36px;
letter-spacing: 16px;
z-index:3;
`;
const Logo=styled.a`
padding: 0;
width: 80px;
margin-top: 4px;
max-height: 70px;
font-size: 0;
display: inline-block;
img{
    display: block;
    width: 100%;
}
`;
const Login=styled.a`
background-color: rgb(0,0,0,0.6);
padding: 8px 16px;
margin-left: 10px;
text-transform: uppercase;
letter-spacing: 1.5px;
border: 1px solid #f9f9f9;
border-radius: 4px;
transition: all 0.2s ease 0s;
&:hover{
    background-color: #f9f9f9;
    color: rgb(0,0,0,0.6);

}
`;
const NavMenu=styled.div`
 align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;
      &:before
    {
        
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        left: 0px;
        bottom: -6px;
        content: " ";
        height: 2px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center ;
        transform: scaleX(0);
        transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        visibility: hidden;
        width: auto;


    }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
      
}



/* @media (max-width:768px){
    display: none;
} */
`;




export default Header
