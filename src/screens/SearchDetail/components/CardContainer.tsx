import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { Card, Icon, Text } from "@rneui/themed";
import { delAllSearchHistory, delSearchHistory } from "axios/api/search";
import { uniqueId } from "lodash-es";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Views } from "types/config";
import { isEmptyArr } from "utlis/method";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

export enum SearchCardType {
    SearchRecommend = "searchRecommend",
    SearchHistory = "searchHistory"
}

export enum SearchCardIcon {
    Delete = "delete",
    Refresh = "refresh"
}

export interface CardContainerProps {
    title: string
    type: SearchCardType
    contentList: string[]
    refreshList: Function
}

const CardContainer: React.FC<CardContainerProps> = ({ title, type, contentList = [], refreshList }) => {
    const [isDel, setIsDel] = useState<boolean>(false)
    const navigation = useNavigation()



    const handlePress = (content: string) => {
        // getSearchResultList
        navigation.navigate(Views.SearchResultList, {
            content
        })
    }

    const handlePressIcon = () => {
        // getSearchResultList
        console.log("icon", type);
        if (type === SearchCardType.SearchHistory) {
            setIsDel(true)

        }
    }

    const handleDel = (content: string) => {
        console.log("del", content);
        delSearchHistory(content)
            .then(res => {
                console.log(res.data);
                refreshList()

            }).catch((err) => {
                console.error(err);

            })
    }
    const handleDelAll = () => {
        console.log("handleDelAll");
        delAllSearchHistory()
            .then(res => {
                console.log(res.data);
            }).catch((err) => {
                console.error(err);

            })

    }
    return <>
        <Card containerStyle={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={{ fontSize: scaleSizeH(11), flex: 1 }}>{title}</Text>
                {
                    isDel
                        ?
                        <>
                            <Button
                                title={"全部删除"}
                                color={"transparent"}
                                containerStyle={[styles.button, { borderRightWidth: 1, borderRightColor: "grey", borderRadius: 0 }]}
                                buttonStyle={{ padding: scaleSizeH(2) }}
                                titleStyle={{
                                    color: "black",
                                    fontSize: scaleSizeH(10),
                                }}
                                onPress={handleDelAll}
                            />
                            <Button
                                title={"完成"}
                                color={"transparent"}
                                containerStyle={[styles.button, { borderRadius: 0 }]}
                                buttonStyle={{ padding: scaleSizeH(2) }}
                                titleStyle={{
                                    color: "black",
                                    fontSize: scaleSizeH(10),
                                }}
                                onPress={() => setIsDel(false)}
                            />
                        </>
                        :
                        <Button
                            color={"transparent"}
                            size="sm"
                            onPress={handlePressIcon}
                        >
                            <Icon
                                name={type === SearchCardType.SearchHistory ? SearchCardIcon.Delete : SearchCardIcon.Refresh}
                                size={15}
                                color={"grey"}

                            />
                        </Button>

                }
            </View>
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
                                        color={"#f9fafb"}
                                        radius="md"
                                        containerStyle={styles.button}
                                        buttonStyle={{ padding: scaleSizeH(2) }}
                                        titleStyle={{
                                            color: "grey",
                                            fontSize: scaleSizeH(10),
                                        }}
                                        onPress={() => !isDel && handlePress(content)}
                                    >
                                        {content.length <= 5 ? content : `${content.slice(0, 6)}...`}
                                        {
                                            isDel &&
                                            <Button
                                                color={"transparent"}
                                                size="sm"
                                                onPress={() => handleDel(content)}
                                            >
                                                <Icon name="close" size={10} style={{ marginLeft: scaleSizeW(5) }} />
                                            </Button>
                                        }
                                    </Button>
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
        marginTop: 0,
        marginLeft: scaleSizeW(10),
        borderColor: "transparent",
        shadowColor: "transparent"
    },
    titleWrapper: {
        height: scaleSizeH(30),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    listConatiner: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    button: {
        marginBottom: scaleSizeH(6),
        marginRight: scaleSizeW(6)
    }
})

export default CardContainer