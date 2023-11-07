//import React from 'react';
import { useState, useEffect } from 'react'
import './App.css'
import { AllProducts, Cart, LoginSignUp } from './components'
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      setCart(parsedCart)
    }
    if (token) {
      setIsLoggedIn(true)
    }
    if (token && !savedCart) {
      // grab cart from server
      // const parsedCart =
      // setCard(parsedCart)
    }
  }, [])
  function handleAddToCart(evt, product) {
    evt.preventDefault()

    const isAddToCart = evt.target.id === 'addToCartBtn'
    const changeQty = evt.target.id === `changeQty${product.id}`
    const alreadyInCart = cart.filter((item) => item.id == product.id).length
    if (isAddToCart && !alreadyInCart) {
      setCart([...cart, { ...product, count: 1 }])
    }
    if (changeQty && alreadyInCart) {
      setCart(
        cart.map((item) => {
          if (item.id === product.id) {
            return { ...product, count: Number(evt.target.value) }
          }
          return item
        })
      )
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  // JR: Why add BrowserRouter here instead of main.jsx? It will rerender/rebuild every time App state changes.
  return (
    <div>
      <nav>
        <Link to="/">All Products</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign up</Link>
        <Link to="/cart">Cart {cart.length}</Link>
      </nav>
      <Routes id="outlet">
        <Route path="/" element={<AllProducts cart={cart} handleAddToCart={handleAddToCart} />} />
        <Route path="/login" element={<LoginSignUp form="login" setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/signup"
          element={<LoginSignUp form="signup" setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} handleAddToCart={handleAddToCart} setCart={setCart} />}
        />
      </Routes>
    </div>
  )
}

export default App
