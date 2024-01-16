import { Button, Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

const Camera: React.FC = () => {
    return <>
        <Button radius={"sm"} type="clear" style={styles.button}>
            <Icon name="qr-code-scanner" color="#cccedc" />
        </Button>
    </>
}

const styles = StyleSheet.create({
    button:{
        width:scaleSizeW(24),
        height:scaleSizeH(24),
    }
})

export default Camera
