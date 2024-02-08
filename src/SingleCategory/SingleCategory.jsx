import React from 'react';
import { Container, Box, Button, MenuItem, FormControl, Select } from '@mui/material';
// import Loading from '../Components/loading/Loading';
import { BiFilterAlt } from 'react-icons/bi';
import ProductCard from '../Components/Card/Product Card/ProductCard';
import CopyRight from '../Components/CopyRight/CopyRight';
import { useLocation, useParams ,Link} from 'react-router-dom';

const SingleCategory = () => {
    const { cat } = useParams();
    // const isLoading = false; // Set to true to simulate loading

    const productData = []; // Replace with your static product data
    const productFilter = ['All']; // Replace with your static product filters
    const location=useLocation()

    const handleChange = (e) => {
        // Implement handle change functionality
    };
    return (
        <>
            <Container maxWidth='xl' style={{ marginTop: 90, display: 'flex', justifyContent: "center", flexDirection: "column" }}>
                <Box sx={{ minWidth: 140 }}>
                    <FormControl sx={{ width: 140 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, width: "80vw" }}>
                            <Button endIcon={<BiFilterAlt />}>Filters</Button>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value='All'
                                sx={{ width: 200 }}
                                onChange={(e) => handleChange(e)}
                            >
                                {productFilter.map(prod => (
                                    <MenuItem key={prod} value={prod}>{prod}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </FormControl>
                </Box>
                {/* {loading} */}
                <Container maxWidth='xl' style={{ marginTop: 10, display: "flex", justifyContent: 'center', flexWrap: "wrap", paddingBottom: 20, marginBottom: 30, width: '100%' }}>
                    {/* {productData.map(prod => (
                        <ProductCard key={prod._id} prod={prod} />
                    ))} */
                    }
                    {console.log(location.state)}
                    {location.state.map((prod)=>(
                        <Link to={`/Detail/type/${cat}/${prod._id}`} key={prod._id}>
                        <ProductCard state={prod} />

                    </Link>
                    ))}
                    
                </Container>
            </Container>
            <CopyRight sx={{ mt: 8, mb: 10 }} />
        </>
    );
};

export default SingleCategory;



 {/* {productData.map(prod => (
                        <Link to={`/Detail/type/${cat}/${prod._id}`} key={prod._id}>
                            <ProductCard prod={prod} />

                        </Link>
))} */}