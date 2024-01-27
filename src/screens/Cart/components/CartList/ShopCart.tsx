import { Avatar, Image, ListItem, Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ProductCart from "./ProductCart";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Button, Icon } from "@rneui/base";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { ShopsInfo, changeShopStatus } from "slice/cart/cartSlice";

const ShopCart: React.FC = () => {
    const { shops, products } = useAppSelector((state) => state.cartInfo)
    const dispatch = useAppDispatch()
    const handlePressShop = (shop: ShopsInfo) => {
        // todo 更改店铺勾选状态 更新商品勾选状态
        // setCheckedShop(!checkedShop)
        dispatch(changeShopStatus(shop))
    }
    const handleEdit = (shopId: string) => {
        // todo 编辑店铺商品
        console.log(shopId);

    }

    return <>
        {
            shops && Object.keys(shops.byId).map((shopId) => {
                // console.log(shopId);
                const shop = shops.byId[shopId]
                return (
                    <View key={shopId} style={{ marginBottom: scaleSizeW(10), borderRadius: scaleSizeW(10), overflow: "hidden", backgroundColor: "white" }}>
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
                                        checked={shop.buyProducts && shop.buyProducts.length === shop.buyProducts.filter((proID) => {
                                            return products?.byId[proID].checked
                                        }).length}
                                        onPress={() => handlePressShop(shop)}
                                    />
                                    <ListItem.Content>
                                        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={{ marginLeft: scaleSizeW(10), fontWeight: "700", fontSize: scaleSizeW(13) }}>{shop.name}</Text>
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
