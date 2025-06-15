import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    offer: 0,
    offerPrice: 0,
    category: '',
    image: ''
  });
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/admin/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in product) {
      formData.append(key, product[key]);
    }
    if (newImage) {
      formData.append('image', newImage);
    }

    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/admin/product/${id}`, formData);
    navigate('/allpro');
  };

  const styles = {
    container: {
      backgroundColor: '#e2dede',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    formWrapper: {
      backgroundColor: '#000',
      color: '#fff',
      padding: '30px',
      borderRadius: '10px',
      width: '100%',
      maxWidth: '500px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '5px',
      border: 'none',
      fontSize: '16px',
    },
    fileInput: {
      marginBottom: '15px',
      color: '#fff',
    },
    imagePreview: {
      width: '150px',
      marginBottom: '15px',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#6a0dad',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.formWrapper} encType="multipart/form-data">
        <h2>EDIT PRODUCTS</h2>

        <label style={styles.label}>Name:</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} style={styles.input} />

        <label style={styles.label}>Price:</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} style={styles.input} />

        <label style={styles.label}>Offer (%):</label>
        <input type="number" name="offer" value={product.offer} onChange={handleChange} style={styles.input} />

        <label style={styles.label}>Offer Price:</label>
        <input type="number" name="offerPrice" value={product.offerPrice} onChange={handleChange} style={styles.input} />

        <label style={styles.label}>Category:</label>
        <input type="text" name="category" value={product.category} onChange={handleChange} style={styles.input} />

        <label style={styles.label}>Current Image</label>
        <img src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`} alt="product" style={styles.imagePreview} />

        <label style={styles.label}>Change Image</label>
        <input type="file" name="image" onChange={handleImageChange} style={styles.fileInput} />

        <button type="submit" style={styles.button}>Save</button>
      </form>
    </div>
  );
};

export default EditProduct;
