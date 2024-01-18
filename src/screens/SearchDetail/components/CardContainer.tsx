import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { Card, Text } from "@rneui/themed";
import { uniqueId } from "lodash-es";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Views } from "types/config";
import { isEmptyArr } from "utlis/method";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

export interface CardContainerProps {
    title: string
    contentList: string[]
}

const CardContainer: React.FC<CardContainerProps> = ({ title, contentList = [] }) => {

    const navigation = useNavigation()


    const handlePress = (content: string) => {
        // getSearchResultList
        navigation.navigate(Views.SearchResultList,{
            content
        })
    }
    return <>
        <Card containerStyle={styles.container}>
            <Card.Title style={{ textAlign: "left", fontSize: scaleSizeH(11) }}>{title}</Card.Title>
            <Card.Divider></Card.Divider>
            <View style={styles.listConatiner}>
                {
                    !isEmptyArr(contentList) &&
                    <>
                        {
                            contentList.map((content) => {
                                return (
                                    <Button
                                        key={uniqueId()}
                                        title={content.length <= 5 ? content : `${content.slice(0, 6)}...`}
                                        color={"#f9fafb"}
                                        radius="md"
                                        containerStyle={styles.button}
                                        buttonStyle={{padding:scaleSizeH(2)}}
                                        titleStyle={{
                                            color: "grey",
                                            fontSize: scaleSizeH(10),
                                        }}
                                        onPress={() => handlePress(content)}
                                    ></Button>
                                )
                            })
                        }
                    </>
                }
            </View>
        </Card>
    </>
}

const styles = StyleSheet.create({
    container: {
        // height: scaleSizeH(120),
        width: "95%",
        marginTop:0,
        marginLeft: scaleSizeW(10),
        borderColor: "transparent",
        shadowColor: "transparent"
    },
    listConatiner: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    button: {
        height:scaleSizeH(28),
        marginBottom: scaleSizeH(6),
        marginRight: scaleSizeW(6)
    }
})

export default CardContainer