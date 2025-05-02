import React, { useState } from 'react'
import { Link } from 'react-router-dom';


function Addpro() {
    const[name,setName]=useState('')
    const[price,setPrice]=useState('')
    const[offer,setOffer]=useState('')
    const[offerPrice,setOfferPrice]=useState('')
    const[file,setFile]=useState('')
 const handlSubmit = (e)=>{
    e.preventDefault()
    console.log({name,price,offer,offerPrice})
 }

    return (
        <div id='bbooddyy'>  <div>
        </div>
            <div id='deat'>
                <form onSubmit={handlSubmit}>
                    <fieldset>
                        <legend>ADD PRODUCTS</legend>
                        <label for="PRODUCT NAME">PRODUCT NAME</label>
                        <input type="text" id="PRODUCT NAME" name="PRODUCT NAME" placeholder="PRODUCT NAME" onChange={(e)=>setName(e.target.value)}/>

                        <label for="PRICE">PRICE</label>
                        <input type="text" id="PRICE" name="PRICE" placeholder="PRICE" onChange={(e)=>setPrice(e.target.value)}/>

                        <label for="OFFER %">OFFER %</label>
                        <input type="text" id="OFFER %" name="OFFER %" placeholder="OFFER %"onChange={(e)=>setOffer(e.target.value)} />

                        <label for="OFFER PRICE">OFFER PRICE</label>
                        <input type="text" id="zip" name="zip" placeholder="OFFER PRICE" onChange={(e)=>setOfferPrice(e.target.value)}/>

                        <label for="image">image</label>
                        <input type="file" id="image" name="image" placeholder="image"onChange={(e)=>setFile(e.target.file[0])} />


                    </fieldset>




                    <button type="submit">ADD</button>

                </form>


            </div>

        </div>
    )
}

export default Addpro

