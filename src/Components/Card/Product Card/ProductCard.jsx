import { Card, CardActionArea, CardActions, Rating, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styles from './ProductCard.module.css'

export default function ProductCard(prod) {
    // const prod = {
    //     name: 'Sample Product',
    //     image: 'https://via.placeholder.com/150', // Placeholder image URL
    //     price: 99.99, // Sample price
    //     rating: 4.5, // Sample rating
    // };
    
    return (
        
        <Card className={styles.main_card}>
            {console.log(prod)}
            <CardActionArea className={styles.card_action}>
                <Box className={styles.cart_box}>
                    <img alt={prod.state.product_name} src={prod.state.image} loading='lazy' className={styles.cart_img} />
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                        {prod.state.product_name.length > 20 ? prod.name.slice(0, 20) + '...' : prod.state.product_name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                <Typography variant="h6" color="primary">
                    ₹{prod.state.price}
                </Typography>
                <Typography >
                    <Rating precision={0.5} name="read-only" value={prod.state.price} readOnly />
                </Typography>


            </CardActions>
        </Card >
    );
}