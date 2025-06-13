import React from 'react'
import Page from './Pages'
import Nav from './Nav'
import Move from './Move1'
import page from './Pages'
import Soon from './Soon'
import './home.css'
import Footer from './Footer'
import Consol from './Consol'
import Accx from './Accx'
import Games from './Games'

function Home() {
  return ( 
<div id='doko'>  
  <div> 
    <Nav/>
  </div>
  <br/>
   <div id='move321'> <Move/></div>
    <div> 
    <Games showNav={false} showFoot={false}/>

    </div> 
    <div> 
      <Consol showNav={false} showFoot={false}/>

    </div> 
    <div> 
      <Accx  showNav={false} showFoot={false}/>
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
