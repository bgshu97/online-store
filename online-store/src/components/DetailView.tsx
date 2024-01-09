import { IconButton, Rating, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useState, useEffect, FunctionComponent } from "react";

const DetailView: FunctionComponent<{id: number, goBack: Function}> = (props) => {
    const [data, setData] = useState({'id': 0, 'title': '', 'price': 0, 'description': '', 'category': '', 'image': '', 'rating': {'rate': 0, 'count': 0}}); // Empty product object

    useEffect(() => { // API call from product ID, there is no ID '0' so I used it as the init and ruled it out for fetching data
        if (props.id !== 0) {
            fetch(`https://fakestoreapi.com/products/${props.id}`)
                .then(response => response.json())
                .then(json => setData(json))
                .then(error => console.error(error));
        }
    }, [props.id]);

    function goBack() { // Back button pressed
        props.goBack();
    }

    return(
        <div>
            {props.id == 0 && (
                <div>
                    <Typography className="purple" variant="subtitle1">Nothing to display...</Typography>
                    <Typography variant="h3">Select an item to display</Typography>
                    <Typography variant="body1">Select an item from the master view to display details in the detail view.</Typography>
                </div>
            )}
            {props.id > 0 && (
                <div>
                    <div className="arrow-back-icon">
                        <IconButton onClick={goBack}>
                            <ArrowBackIcon />
                        </IconButton>
                    </div>
                    <div className="image-container big-image">
                        <img src={data.image} className="opaque-bg" />
                    </div>
                    <div className="product-info">
                        <Typography align="left" className="purple">{data.category}</Typography>
                        <Typography align="left" sx={{ typography: {xs: 'h4', sm: 'h4', md: 'h4', lg: 'h3'}}}>{data.title}</Typography>
                        <Typography align="left" variant="subtitle1">{data.description}</Typography>
                        <div className="rating">
                            <Rating name="rating" value={data.rating.rate} precision={0.1} readOnly />
                            <Typography fontWeight={700}>{data.rating.rate}</Typography>
                            <Typography>{data.rating.count} Reviews</Typography>
                        </div>
                        <Typography align="left" variant="h5">${(Math.round(data.price * 100) / 100).toFixed(2)}</Typography>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetailView;