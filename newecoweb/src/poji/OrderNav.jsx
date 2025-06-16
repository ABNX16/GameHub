import React from 'react'
import './ordernav.css'
import Nav from './Nav'

function OrderNav() {
  return (
    <div> <div>  <Nav/> </div>
    <div id='navbody'>
      <nav id='nav33'>
        <a href='./orders' id='h33'> BUY </a>
        <a href='./sellusers' id='h45'> SELL </a>
      </nav>
    </div>  </div>
  )
}

export default OrderNav
