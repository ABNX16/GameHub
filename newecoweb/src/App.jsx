import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './poji/Home'
import Page from './poji/Pages'
import Nav from './poji/Nav'
import Gta from './poji/Gta'
import Payment from './poji/Payment'
import Purchasesuccess from './poji/Purchasesuccess'
import Rdr2 from './poji/Rdr2'
import Soon from './poji/Soon'
import Footer from './poji/Footer'
import Cart from './poji/Cart'
import Sell from './poji/Address'
import Consol from './poji/Consol'
import Sellerpage from './poji/Sellerpage'
import Admin from './Admin c/Admin'
import Addpro from './Admin c/Addpro'
import Accx from './poji/Accx'
import Move from './poji/Move1'

function App() {
  return (
    <div>
       <Router>
        <Routes>
          <Route path='/' element={ <Home/>}/>
          <Route path='/page' element={ <Page/>}/>
          <Route path='/nav' element={ <Nav/>}/>
          <Route path='/move' element={ <Move/>}/>
          <Route path='/gta' element={ <Gta/>}/>
          <Route path='/pay' element={ <Payment/>}/>
          <Route path='/pur' element={ <Purchasesuccess/>}/>
          <Route path='/rdr' element={ <Rdr2/>}/>
          <Route path='/soon' element={ <Soon/>}/>
          <Route path='/foot' element={ <Footer/>}/>
          <Route path='/cart' element={ <Cart/>}/>
          <Route path='/sell' element={ <Sell/>}/>
          <Route path='/consol' element={ <Consol/>}/>
          <Route path='/sellpage' element={ <Sellerpage/>}/>
          <Route path='/admin12' element={ <Admin/>}/>
          <Route path='/addpro' element={ <Addpro/>}/>
          <Route path='/accx' element={ <Accx/>}/>


      





        </Routes>
      </Router>
    </div>
  )
}

export default App
