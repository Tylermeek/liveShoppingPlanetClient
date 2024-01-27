import { Image, ListItem, Text } from "@rneui/themed";
import { RootState } from "store";
import { increment } from "slice/counter/counterSlice";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { ProductsInfo, changeProductBuyCount, changeProductStatus } from "slice/cart/cartSlice";
import { Button } from "@rneui/base";
import NumInput from "components/NumInput";

interface ProductCartProps {
    product: ProductsInfo
}

const ProductCart: React.FC<ProductCartProps> = ({ product }) => {
    const dispatch = useDispatch()

    const handleCheck = () => {
        dispatch(changeProductStatus(product))
    }

    const handleEditCount = (number: number) => {
        dispatch(changeProductBuyCount({ number, productID: product.id }))
    }

    return <>
        <ListItem containerStyle={{ padding: scaleSizeW(10) }}>
            <ListItem.CheckBox
                // Use ThemeProvider to change the defaults of the checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checked={!!product.checked}
                onPress={handleCheck}
            />
            <ListItem.Content>
                <View style={styles.contanier}>
                    <View style={{ width: scaleSizeW(60), height: scaleSizeH(60) }}>
                        <Image source={{ uri: product.cover }} style={{ width: "100%", height: "100%", borderRadius: scaleSizeW(5) }} />
                    </View>
                    <View style={{ flex: 1, marginLeft: scaleSizeW(10) }}>
                        <Text style={{ color: "rgba(51, 51, 51, 1)", fontSize: scaleSizeW(11) }} numberOfLines={2} >{product.title}</Text>
                        <Text style={{ color: "rgba(128, 128, 128, 1)", fontSize: scaleSizeW(10), marginTop: scaleSizeW(5) }}>todo sku</Text>
                        <Text style={{ color: "#E36235", marginTop: scaleSizeW(5) }}>￥{product.price}</Text>
                    </View>
                    <View style={{ marginLeft: scaleSizeW(10), justifyContent: "center" }}>
                        {/* <Button
                            color={"rgba(128, 128, 128, 0.1)"}
                            radius={"md"}
                            title={`x${product.buyCount}`}
                            titleStyle={{ fontSize: scaleSizeW(8), color: "grey" }}
                            buttonStyle={{padding:scaleSizeW(5)}}
                            onPress={handleEditCount}
                        /> */}
                        <NumInput num={product.buyCount} minNum={0} maxNum={product.buyLimit} setNum={(num) => handleEditCount(num)}></NumInput>
                    </View>
                </View>
            </ListItem.Content>
        </ListItem>
    </>
}

const styles = StyleSheet.create({
    contanier: {
        flexDirection: "row",
    }
})

export default ProductCart
