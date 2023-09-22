import React from "react";
import Product from "./components/Producs";
import users from './components/users'
import carts from './components/carts'

export default function App() {
  return (
    <>
      <products />
      <users />
      <home />
      <carts />
    </>
  );
}
