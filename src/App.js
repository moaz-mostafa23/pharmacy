import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home'
import { AddProducts } from './components/AddProducts';
import { ProductsContext, ProductsContextProvider } from './global/ProductsContext';
export class App extends Component {
  render() {
    return (
      <ProductsContextProvider>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="addproducts" element={<AddProducts />} />
      </Routes>
    </Router>
    </ProductsContextProvider>
    )
  }
}

export default App