import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Paper } from '@mui/material';
import { db, storage } from '../config/config';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const AddProducts = () => {
  const [product, setProduct] = useState({
    id: uuidv4(),
    name: '',
    price: '',
    quantity: '',
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

      if (!allowedTypes.includes(selectedFile.type)) {
        setErrors({
          ...errors,
          image: 'Only PNG, JPEG, or JPG images are allowed',
        });
        return;
      }

      setProduct({
        ...product,
        image: selectedFile,
      });
      setErrors({
        ...errors,
        image: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!product.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!product.price.trim()) {
      newErrors.price = 'Product price is required';
    } else if (isNaN(product.price) || +product.price < 0) {
      newErrors.price = 'Price must be a non-negative number';
    }
    if (!product.quantity.trim()) {
      newErrors.quantity = 'Product quantity is required';
    } else if (isNaN(product.quantity) || +product.quantity < 0) {
      newErrors.quantity = 'Quantity must be a non-negative number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Handle image upload to Firebase Storage
      const storageRef = ref(storage, `product-images/${product.id}`);
      await uploadBytes(storageRef, product.image).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });

      // Get the download URL for the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Add product data to Firestore with the generated UUID and image URL
      await addDoc(collection(db, "products"), {
        ProductId: product.id,
        ProductName: product.name,
        ProductPrice: product.price,
        Product_quantity: product.quantity,
        ProductImage: imageUrl,
      });

      // Clear the form
      setProduct({
        id: uuidv4(),
        name: '',
        price: '',
        quantity: '',
        image: null,
      });

      // Clear file input
      document.getElementById('file').value = null;
    } catch (err) {
      // Update error state correctly
      setErrors({ ...errors, image: err.message });
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Product Form
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Product Name" name="name" value={product.name} onChange={handleChange} error={Boolean(errors.name)} helperText={errors.name} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Product Price" name="price" value={product.price} onChange={handleChange} error={Boolean(errors.price)} helperText={errors.price} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Product Quantity" name="quantity" value={product.quantity} onChange={handleChange} error={Boolean(errors.quantity)} helperText={errors.quantity} />
            </Grid>
            <Grid item xs={12}>
              <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageChange} />
              {errors.image && <Typography color="error" variant="caption" sx={{ mt: 1 }}>{errors.image}</Typography>}
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
