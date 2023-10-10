//import React from 'react';
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AllProducts, Cart, LoginSignUp } from './components'
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [cart, setCart] = useState([])

useEffect(() => {
  const token = localStorage.getItem('token');
  const savedCart = localStorage.getItem('card')
  if(savedCart){
     const parsedCart = JSON.parse(savedCart)
    setCart(parsedCart)
  }
  if(token) {
    setIsLoggedIn(true)
   
  } 
  if(token && !savedCart){
    // grab cart from server
    // const parsedCart = 
    // setCard(parsedCart)
  } 
}, [])
function handleAddToCart(evt, product){
  evt.preventDefault()
  const cartCopy = [...cart]
  const alreadyInCard = cartCopy.filter(item => item.id == product.id)
  console.log(cartCopy)
  if(alreadyInCard.length){
    alreadyInCard[0].count = alreadyInCard[0].count + 1
  } else {
    cartCopy.push({...product, count: 1})
  }
  localStorage.setItem("cart", JSON.stringify(cartCopy))
 setCart(cartCopy)
}
  return (
    <BrowserRouter>
    <nav>
      <Link to="/">All Products</Link>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Sign up</Link>
      <Link to='/cart'>Cart {cart.length}</Link>
    </nav>
    <Routes>
      <Route path="/" element={<AllProducts cart={cart} handleAddToCart={handleAddToCart}/>} />
      <Route path='/login' element={<LoginSignUp form="login" setIsLoggedIn={setIsLoggedIn}/>} />
      <Route path='/signup' element={<LoginSignUp form="signup" setIsLoggedIn={setIsLoggedIn} />} />
   <Route path='/cart' element={<Cart cart={cart} handleAddToCart={handleAddToCart} setCart={setCart}/>}/>
   </Routes>
</BrowserRouter>
  )
}

export default App
