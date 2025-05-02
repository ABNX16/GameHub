import React from 'react'
import Page from './Pages'
import Nav from './Nav'
import Move from './move'
import page from './Pages'
import Soon from './Soon'
import './home.css'
import Footer from './Footer'
import Consol from './Consol'
import Accx from './Accx'

function Home() {
  return ( 
<div id='doko'>  
  <div> 
    <Nav/>
  </div>
  <br/>
   <div id='move321'> <Move/></div>
    <div> <h1 className='cs1'>GAMES ON SALE</h1>
      <Page showNav={false}/>

    </div> 
    <div> <h1 className='cs1'>CONSOLES ON SALE</h1>
      <Consol showNav={false}/>

    </div> 
    <div> <h1 className='cs1'>Accessories
    </h1>
      <Accx  showNav={false}/>
      </div>  
    
    <div> <h1 className='cs1'>COMING SOON</h1>
      <Soon  showNav={false}/>
      </div>  
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Home
