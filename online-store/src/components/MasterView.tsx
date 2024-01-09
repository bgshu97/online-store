import React, { useState, useEffect } from 'react';

import ProductList from './ProductList';
import DetailView from './DetailView';

const MasterView = () => {
    const [selected, setSelected] = useState(0); // State for getting selected ID
    const [mobileSelected, setMobileSelected] = useState(false) // State for adding a css class to mobile to show/hide the detail view and product list

    const onSelect = (id: number) => { // User selected a product from the list
        setSelected(id);
        setMobileSelected(true);
    }

    const revert = () => { // Back button pressed
        setMobileSelected(false);
    }

    return(
        <div className='container'>
            <div className={'product-list ' + (mobileSelected ? 'mobile-select' : '')}>
                <ProductList onClick={onSelect}/>
            </div>
            <div className={'detail-view ' + (mobileSelected ? 'mobile-select' : '')}>
                <DetailView id={selected} goBack={revert}/>
            </div>
        </div>
    );
}

export default MasterView;