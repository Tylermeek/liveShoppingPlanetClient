import { Avatar, Image, ListItem, Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ProductCart from "./ProductCart";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useAppSelector } from "store/hooks";
import { Button, Icon } from "@rneui/base";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

const ShopCart: React.FC = () => {
    const { shops, products } = useAppSelector((state) => state.cartInfo)
    const [checkedShop, setCheckedShop] = useState(false);
    const count = useSelector((state: RootState) => state.counter.value)
    const handlePressShop = () => {
        setCheckedShop(!checkedShop)
    }
    const handleEdit = (shopId: string) => {
        console.log(shopId);

    }

    useEffect(() => {
        // console.log(shops);

    }, [shops])
    return <>
        {
            shops && Object.keys(shops.byId).map((shopId) => {
                // console.log(shopId);

                return (
                    <View style={{marginBottom:scaleSizeW(10)}}>
                        <ListItem.Accordion
                            isExpanded
                            noIcon
                            noRotation
                            content={
                                <>
                                    <ListItem.CheckBox
                                        // Use ThemeProvider to change the defaults of the checkbox
                                        iconType="material-community"
                                        checkedIcon="checkbox-marked"
                                        uncheckedIcon="checkbox-blank-outline"
                                        checked={checkedShop}
                                        onPress={handlePressShop}
                                    />
                                    <ListItem.Content>
                                        {/* <ListItem.Title style={{marginLeft:scaleSizeW(10)}}>{shops.byId[shopId].name}</ListItem.Title> */}
                                        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={{ marginLeft: scaleSizeW(10), fontWeight: "700", fontSize: scaleSizeW(13) }}>{shops.byId[shopId].name}</Text>
                                            <Button
                                                title={"编辑"}
                                                color={"transparent"}
                                                buttonStyle={{ height: scaleSizeH(20), padding: 0 }}
                                                titleStyle={{ fontSize: scaleSizeW(12), color: "rgba(128, 128, 128, 1)" }}
                                                onPress={() => handleEdit(shopId)}
                                            />
                                        </View>
                                    </ListItem.Content>
                                </>
                            }
                        >
                            {
                                products && Object.keys(products.byId)
                                    .filter(productId => products.byId[productId].shopId == shopId)
                                    .map(productId => {
                                        const product = products.byId[productId]
                                        return (
                                            <ProductCart key={productId} product={product} />
                                        )
                                    })
                            }
                        </ListItem.Accordion>
                    </View>
                )
            })
        }
    </>
}

const styles = StyleSheet.create({

})

export default ShopCart
