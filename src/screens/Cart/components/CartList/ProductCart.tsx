import { Image, ListItem, Text } from "@rneui/themed";
import { RootState } from "store";
import { increment } from "slice/counter/counterSlice";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { ProductsInfo } from "slice/cart/cartSlice";
import { Button } from "@rneui/base";

interface ProductCartProps {
    product: ProductsInfo
}

const ProductCart: React.FC<ProductCartProps> = ({ product }) => {
    const [checked, setChecked] = React.useState(false);
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    const handleCheck = () => {
        // todo 更改商品勾选状态
    }

    const handleEditCount = () => {
        // todo 更改商品数量
    }

    return <>
        <ListItem>
            <ListItem.CheckBox
                // Use ThemeProvider to change the defaults of the checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checked={checked}
                onPress={handleCheck}
            />
            <ListItem.Content>
                <View style={styles.contanier}>
                    <View style={{ width: scaleSizeW(85), height: scaleSizeH(85) }}>
                        <Image source={{ uri: product.cover }} style={{ width: "100%", height: "100%", borderRadius: scaleSizeW(5) }} />
                    </View>
                    <View style={{ flex: 1, marginLeft: scaleSizeW(10) }}>
                        <Text style={{ color: "rgba(51, 51, 51, 1)", fontSize: scaleSizeW(11) }} numberOfLines={2} >{product.title}</Text>
                        <Text style={{ color: "rgba(128, 128, 128, 1)", fontSize: scaleSizeW(10), marginTop: scaleSizeW(5) }}>todo sku</Text>
                        <Text style={{ color: "#E36235", marginTop: scaleSizeW(5) }}>￥{product.price}</Text>
                    </View>
                    <View style={{ marginLeft: scaleSizeW(10), justifyContent: "center" }}>
                        <Button
                            color={"rgba(128, 128, 128, 0.1)"}
                            radius={"md"}
                            onPress={handleEditCount}
                        >
                            <Text>x{product.buyCount}</Text>
                        </Button>
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
