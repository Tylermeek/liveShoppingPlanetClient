import { ListItem, Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ProductCart from "./ProductCart";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useAppSelector } from "store/hooks";

const ShopCart: React.FC = () => {
    const { shops, products } = useAppSelector((state) => state.cartInfo)
    const [checkedShop, setCheckedShop] = useState(false);
    const count = useSelector((state: RootState) => state.counter.value)
    const handlePressShop = () => {
        setCheckedShop(!checkedShop)
    }

    useEffect(() => {
        // console.log(shops);

    }, [shops])
    return <>
        {
            shops && Object.keys(shops.byId).map((shopId) => {
                console.log(shopId);

                return (
                    <ListItem key={shopId}>
                        <ListItem.CheckBox
                            // Use ThemeProvider to change the defaults of the checkbox
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            checked={checkedShop}
                            onPress={handlePressShop}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{shops.byId[shopId].name}</ListItem.Title>
                            <ListItem.Title>{shops.byId[shopId].id}</ListItem.Title>

                        </ListItem.Content>
                        <ListItem.Chevron />
                        {
                            products && Object.keys(products.byId)
                                .filter(productId => products.byId[productId].shopId == shopId)
                                .map(productId => {
                                    console.log(products.byId[productId].title);
                                    return <ListItem.Title key={productId}>{products.byId[productId].title}</ListItem.Title>
                                })
                        }
                    </ListItem>
                )
            })
        }
    </>
}

const styles = StyleSheet.create({

})

export default ShopCart
