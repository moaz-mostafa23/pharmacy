import React, { useContext } from 'react';
import { ProductsContext } from '../global/ProductsContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea,CardActions,Button} from '@mui/material';

export const Products = () => {
    const { products } = useContext(ProductsContext);
    // const { dispatch } = useContext(CartContext);

    return (
        // <>
        //     {products.length !== 0 && <h1>Products</h1>}
        //     <div className='products-container'>
        //         {products.length === 0 && <div>slow internet...no products to display</div>}
        //         {products.map(product => (
        //             <div className='product-card' key={product.ProductID}>
        //                 <div className='product-img'>
        //                     <img src={product.ProductImg} alt="not found" />
        //                 </div>
        //                 <div className='product-name'>
        //                     {product.ProductName}
        //                 </div>
        //                 <div className='product-price'>
        //                     Rs {product.ProductPrice}.00
        //             </div>
        //                 <button className='addcart-btn'>ADD TO CART</button>
        //                 {/* onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })} */}
        //             </div>
        //         ))}
        //     </div>
        // </>
        <>
        {products.map(product => (
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={product.ProductImage}
            alt={product.ProductImage}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.ProductName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {`$${product.ProductPrice}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        <Button size="small" color="primary">
          Add to Cart
        </Button>
      </CardActions>
      </Card>
      ))}
      </>
    );
};
