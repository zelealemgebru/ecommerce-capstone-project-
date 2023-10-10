/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { fetchAllProducts } from "../api-calls";
import { Link } from "react-router-dom"
import Grid from "@mui/material/Grid"
import { styled } from '@mui/material/styles';
import { Card } from "@mui/material";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '150px',
    maxHeight: '150px',
});

export function AllProducts(props) {
    const [productList, setProductList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const { filterKey, handleAddToCart } = props
    useEffect(() => {
        async function getAllProducts() {
            try {
                const products = await fetchAllProducts()
                console.log(products)
                setProductList(products)
                console.log(filterKey)
                if(filterKey){
                    const filtered = products.filter(product => product.name.includes(filterKey))
                setFilteredList(filtered)
                } else 
                setFilteredList(products)
            } catch (error) {
                console.log(error)
            }
        }
        getAllProducts()
    }, [])

    useEffect(() => {
        if(filterKey){
            const filtered = productList.filter(product => product.name.includes(filterKey))
        setFilteredList(filtered)
        } else  setFilteredList(productList)
    }, [filterKey])

    return <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {filteredList.map(product => {
            return <Grid item xs={2} sm={3} md={3}  key={product.id}>
                {/* <Link to={`products/${product.id}`} > */}
                    <Card >
                        <Img src={product.image} alt={product.title} />
                        <div>
                            <h3>{product.title}</h3>
                            <h3>${product.price}</h3>
                        </div>

                        <button
                            type="button"
                          onClick={event => handleAddToCart(event, product)}
                        >
                            Add to Cart
                        </button>
                    </Card>
                {/* </Link> */}
            </Grid>
        })}
    </Grid>
}