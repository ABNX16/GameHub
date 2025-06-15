import React,{useState} from 'react';
import axios from 'axios';
import './addpro.css'
import { useNavigate } from 'react-router-dom';
import Adminnav from './AdminNav';

function Addpro() {
  const navigate = useNavigate();
  const [name ,setName] = useState('')
  const [price, setPrice] = useState('')
  const [offer, setOffer] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);

  const categories = ['Game', 'Console', 'Accessories','soon'];


  const handleSubmit = async(e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('name',name);
    formData.append('price',price);
    formData.append('offer', offer);
    formData.append('offerPrice', offerPrice);
    formData.append('category', category);
    formData.append('image', file);  

    try{
      const res= await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/addpro`,formData,{
        headers:{
        'Content-Type': 'multipart/form-data',
        },
      });
      console.log("prodduct added",res.data);
      alert('Product added successfully!');
      navigate('/allpro');
    }
    catch(err){
      console.error('error',err.response?.data || err.message);
      alert('failed to add');

    }
  };
   return ( <div id='bgaddpro'>  <div><Adminnav/></div>
     <form className="addpro-form" onSubmit={handleSubmit} encType="multipart/form-data" id="add-product-form">
       <div className="form-group">
         <label htmlFor="product-name">Product Name</label>
         <input
           type="text"
           id="product-name"
           value={name}
           onChange={(e) => setName(e.target.value)}
         />
       </div>
 
       <div className="form-group">
         <label htmlFor="product-price">Price</label>
         <input
           type="text"
           id="product-price"
           value={price}
           onChange={(e) => setPrice(e.target.value)}
         />
       </div>
 
       <div className="form-group">
         <label htmlFor="product-offer">Offer %</label>
         <input
           type="text"
           id="product-offer"
           value={offer}
           onChange={(e) => setOffer(e.target.value)}
         />
       </div>
 
       <div className="form-group">
         <label htmlFor="product-offer-price">Offer Price</label>
         <input
           type="text"
           id="product-offer-price"
           value={offerPrice}
           onChange={(e) => setOfferPrice(e.target.value)}
         />
       </div>
 
       <div className="form-group">
         <label htmlFor="product-category">Category</label>
         <select
           id="product-category"
           value={category}
           onChange={(e) => setCategory(e.target.value)}
         >
           <option value="">-- Select Category --</option>
           {categories.map((cat) => (
             <option key={cat} value={cat}>{cat}</option>
           ))}
         </select>
       </div>
 
       <div className="form-group">
         <label htmlFor="product-image">Product Image</label>
         <input
           type="file"
           id="product-image"
           onChange={(e) => setFile(e.target.files[0])}
           accept="image/*"
         />
       </div>
 
       <button type="submit" className="submit-button">Submit</button>
     </form> </div>
   );
 };
 
 export default Addpro;
