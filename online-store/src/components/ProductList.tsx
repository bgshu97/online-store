import { ButtonBase, Card, CardContent, CardMedia, Rating, Stack, Typography } from "@mui/material";
import React, { useState, useEffect, FunctionComponent } from "react";

const ProductList: FunctionComponent<{onClick: Function}> = (props) => {
    const [data, setData] = useState<any[]>([]); // API Data for all products
    const [selected, setSelected] = useState(0);

    useEffect(() => { // API Call
        fetch('https://fakestoreapi.com/products/')
            .then(response => response.json())
            .then(json => setData(json))
            .then(error => console.error(error));
    }, []);

    function onSelect(id: number) { // User selected product, fetch ID
        props.onClick(id);
        setSelected(id);
    }

    return(
        <div>
            <Stack spacing={2}>
                {data.map((product) => (
                    <div onClick={() => onSelect(product.id)} key={product.id}>
                        <Card sx={{ display: 'flex', width: {md: '100%', lg: 500}, cursor: 'pointer', border: product.id == selected ? 'slateblue solid 1px' : '', ':hover': { boxShadow: 20 } }}>
                            <div className="image-container">
                                <CardMedia 
                                    component="div" 
                                    sx={{ width: {xs: 60, sm: 60, md: 60, lg: 120}, height: {xs: 60, sm: 60, md: 60, lg: 120}, margin: 3, mixBlendMode: 'multiply', backgroundSize: 'contain', objectFit: 'contain' }}
                                    image={product.image}
                                />
                                <div className="mini-rating">
                                    <Rating max={1} defaultValue={1} />
                                    <Typography>{product.rating.rate} ({product.rating.count})</Typography>
                                </div>
                            </div>
                            <CardContent sx={{ width: 270, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                                <Typography className="purple" variant="subtitle1">{product.category}</Typography>
                                <Typography noWrap variant="h6">{product.title}</Typography>
                                <Typography noWrap variant="body1">{product.description}</Typography>
                                <Typography variant="h5">${(Math.round(product.price * 100) / 100).toFixed(2)}</Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </Stack>
        </div>
    );
}

export default ProductList;