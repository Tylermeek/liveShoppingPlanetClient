import { ListItem } from "@rneui/themed";
import { RootState } from "store";
import { increment } from "slice/counter/counterSlice";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ProductCart: React.FC = () => {
    const [checked, setChecked] = React.useState([false, false]);
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()
    return <>
        <ListItem>
            <ListItem.CheckBox
                // Use ThemeProvider to change the defaults of the checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checked={checked[0]}
                onPress={() => dispatch(increment())}
            />
            <ListItem.Content>
                <ListItem.Title>shop name</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    </>
}

const styles = StyleSheet.create({

})

export default ProductCart
