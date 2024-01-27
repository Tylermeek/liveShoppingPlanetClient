import { Button, Input } from "@rneui/base";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

interface NumInputProps {
    num: number
    maxNum: number
    minNum: number
    setNum: (num: number) => void
}

const NumInput: React.FC<NumInputProps> = ({ num, maxNum, minNum, setNum }) => {
    const [input, setInput] = useState(`${num}`)

    const handleChange = (newVal: string) => {
        const parseNum = Number.parseInt(newVal)
        if (typeof parseNum === "number") {
            setNum(parseNum)
            setInput(newVal)
        } else {
            console.error("需要数字");
        }
    }

    const handleDecrease = () => {
        const parseNum = Number.parseInt(input)
        console.log(parseNum);
        
        if (parseNum - 1 >= minNum) {
            setInput(`${parseNum - 1}`)
            setNum(parseNum - 1)
        } else {
            console.error(`需要大于${minNum}`);

        }
    }

    const handleIncrease = () => {
        const parseNum = Number.parseInt(input)
        if (parseNum + 1 <= maxNum) {
            setInput(`${parseNum + 1}`)
            setNum(parseNum + 1)
        } else {
            console.error(`超过限购数量${maxNum}`);
        }
    }

    return <>
        <View style={styles.contanier}>
            <Button
                title={"-"}
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.button}
                color={"rgba(128, 128, 128, 0.1)"}
                onPress={handleDecrease}
            />
            <Input
                value={input}
                onChangeText={(newVal) => handleChange(newVal)}
                placeholder={"输入数量"}
                inputStyle={{ fontSize: scaleSizeW(10), height: scaleSizeH(10), minHeight: scaleSizeH(10), textAlign: "center" }}
                inputContainerStyle={{ height: scaleSizeH(10), width: scaleSizeW(20), borderBottomWidth: 0 }}
                containerStyle={{ paddingHorizontal: 0, width: scaleSizeW(20), flexDirection: "row", alignItems: "center" }}

            />
            <Button
                title={"+"}
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.button}
                color={"rgba(128, 128, 128, 0.1)"}
                onPress={handleIncrease}
            />
        </View>
    </>
}

const styles = StyleSheet.create({
    contanier: {
        width: scaleSizeW(60),
        height: scaleSizeH(20),
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    buttonTitle: {
        color: "grey",
        fontSize: scaleSizeW(8)
    },
    button: {
        padding: scaleSizeW(1)
    }
})

export default NumInput
