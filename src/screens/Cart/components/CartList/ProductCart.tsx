import { Image, ListItem, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import {
  checkProsThunk,
  updateProNumThunk,
} from "slice/cart/cartSlice";
import NumInput from "components/NumInput";
import { CartProductInfo } from "types/cart";
import { useAppDispatch } from "store/hooks";

interface ProductCartProps {
  product: CartProductInfo;
}

const ProductCart: React.FC<ProductCartProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleCheck = () => {
    dispatch(
      checkProsThunk({
        productIds: [product.productId],
        isChecked: product.checked ? 0 : 1,
      })
    );
  };

  const handleEditCount = (number: number) => {
    dispatch(
      updateProNumThunk({
        number,
        productId: product.productId,
        id: product.id,
        goodsId: product.goodsId,
      })
    );
  };

  return (
    <>
      <ListItem
        containerStyle={{
          padding: scaleSizeW(10),
          marginBottom:scaleSizeW(10),
          borderRadius: scaleSizeW(10),
        }}
      >
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
              <Image
                source={{ uri: product.picUrl }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: scaleSizeW(5),
                }}
              />
            </View>
            <View style={{ flex: 1, marginLeft: scaleSizeW(10) }}>
              <Text
                style={{
                  color: "rgba(51, 51, 51, 1)",
                  fontSize: scaleSizeW(11),
                }}
                numberOfLines={2}
              >
                {product.goodsName}
              </Text>
              <Text
                style={{
                  color: "rgba(128, 128, 128, 1)",
                  fontSize: scaleSizeW(10),
                  marginTop: scaleSizeW(5),
                }}
              >
                {/* {...product.specifications} */}
              </Text>
              <Text style={{ color: "#E36235", marginTop: scaleSizeW(5) }}>
                ￥{product.price}
              </Text>
            </View>
            <View
              style={{ marginLeft: scaleSizeW(10), justifyContent: "center" }}
            >
              {/* <Button
                            color={"rgba(128, 128, 128, 0.1)"}
                            radius={"md"}
                            title={`x${product.buyCount}`}
                            titleStyle={{ fontSize: scaleSizeW(8), color: "grey" }}
                            buttonStyle={{padding:scaleSizeW(5)}}
                            onPress={handleEditCount}
                        /> */}
              <NumInput
                num={product.number}
                minNum={0}
                maxNum={999}
                setNum={(num) => handleEditCount(num)}
              ></NumInput>
            </View>
          </View>
        </ListItem.Content>
      </ListItem>
    </>
  );
};

const styles = StyleSheet.create({
  contanier: {
    flexDirection: "row",
  },
});

export default ProductCart;
