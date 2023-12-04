import React, { createContext } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../config/config'

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {

    state = {
        products: []
    }

    componentDidMount = async () => {
        const prevProducts = this.state.products;
        const q = query(collection(db, 'products'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            prevProducts.push({
                ProductID: doc.data().ProductId,
                ProductName: doc.data().ProductName,
                ProductPrice: doc.data().ProductPrice,
                ProductImg: doc.data().ProductImg
            });
        });
        this.setState({
            products: prevProducts
        });
    }

    render() {
        return (
            <ProductsContext.Provider value={{ products: [...this.state.products] }}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}