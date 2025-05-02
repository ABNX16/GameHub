import React from 'react'
import { Link } from 'react-router-dom';
import'./sell.css'

function Address() {
  return (
    <div id='bbooddyy'>  <div>
        <h1>Enter Your Deatils</h1> </div>
         <div id='deat'>
          <form> <label>Name</label>
            <input type='text' placeholder='Enter Your Name' /> 
            <fieldset>
  <legend>Address</legend>
  <label for="House Name/NO:">House Name/NO:</label>
  <input type="text" id="House Name/NO:" name="House Name/NO:" placeholder="House Name/NO:" />

  <label for="street">Street Address</label>
  <input type="text" id="street" name="street" placeholder="Street address" />

  <label for="city">City</label>
  <input type="text" id="city" name="city" placeholder="City" />

  <label for="zip">PIN Code</label>
  <input type="text" id="zip" name="zip" placeholder="PIN Code" />

  <label for="district">District</label>
  <input type="text" id="district" name="district" placeholder="District" />

  <label for="state">State</label>
  <select id="state" name="state">
    <option value="">-- Select State --</option>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
    <option value="Delhi">Delhi</option>
    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
    <option value="Ladakh">Ladakh</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Puducherry">Puducherry</option>
  </select>
</fieldset>

   
    <label>Contact info</label>
    <input type='text' placeholder='Give Your Email ID / Phone Number'/>
  
    <button type="submit">submit</button> 

          </form>


         </div>
         
    </div>
  )
}

export default Address
