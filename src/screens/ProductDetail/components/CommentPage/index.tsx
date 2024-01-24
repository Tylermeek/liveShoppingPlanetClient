import { Avatar, Button, Icon } from "@rneui/base";
import { Divider, Image, Text } from "@rneui/themed";
import { FliterType, getProductCommentList } from "axios/api/product";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CommentInfo } from "types/info";
import { isEmptyArr } from "utlis/method";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

interface CommentPageProps {
    productId: number
}

const CommentPage: React.FC<CommentPageProps> = ({ productId }) => {
    const [list, setList] = useState<CommentInfo[]>([])
    const [allList, setAllList] = useState<CommentInfo[]>([])
    const [withImgList, setWithImgList] = useState<CommentInfo[]>([])
    const [fliterType, setFliterType] = useState<FliterType>(FliterType.Default)

    const fliteWithImg = (list: CommentInfo[]) => {
        return list.filter((item) => {
            return item.imgList && !isEmptyArr(item.imgList)
        })
    }
    const getList = () => {
        getProductCommentList(productId)
            .then(res => {
                console.log(res.data);

                setList(res.data)
                setAllList(res.data)
                setWithImgList(fliteWithImg(res.data))
            })
    }

    const handlePressFliter = (type: FliterType) => {
        if (type === fliterType) return
        else {
            setFliterType(type)
            setList(type === FliterType.Default ? allList : withImgList)
        }
    }
    useEffect(() => {
        getList()
    }, [])
    return <>
        <ScrollView >
            <View style={{ flexDirection: "row", justifyContent: "flex-start", padding: scaleSizeW(5) }}>
                <Button
                    color={"transparent"}
                    onPress={() => handlePressFliter(FliterType.Default)}
                    titleStyle={{ fontSize: scaleSizeW(12), color: fliterType === FliterType.Default ? "#E36235" : "grey" }}
                >
                    {`全部评论(${allList.length})`}
                </Button>
                <Divider orientation="vertical" />
                <Button
                    color={"transparent"}
                    buttonStyle={{ backgroundColor: "transparent" }}
                    onPress={() => handlePressFliter(FliterType.WithImg)}
                    titleStyle={{ fontSize: scaleSizeW(12), color: fliterType === FliterType.WithImg ? "#E36235" : "grey" }}
                >
                    {`带图评论(${withImgList.length})`}
                </Button>
            </View>
            <View style={{ backgroundColor: "rgb(221, 221, 221)", borderTopLeftRadius: scaleSizeW(15), borderTopRightRadius: scaleSizeW(15) }}>
                {
                    list.map(comment => {
                        return (
                            <View key={comment.id} style={{ padding: scaleSizeW(10) }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: scaleSizeH(5) }}>
                                    {/* todo 匿名头像地址 */}
                                    <Avatar size={32} rounded source={{ uri: comment.userInfo.avatar }} />
                                    <Text style={{ marginLeft: scaleSizeW(5), fontSize: scaleSizeW(11) }}>{comment.isHide ? "匿名评论" : comment.userInfo.name}</Text>
                                </View>
                                <View style={styles.contentContainer}>
                                    <Text style={{ fontSize: scaleSizeW(10) }}>{comment.commentContent}</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                        {
                                            comment.imgList && !isEmptyArr(comment.imgList)
                                            && comment.imgList.map((img, index) => {
                                                return (
                                                    <Image
                                                        key={index}
                                                        source={{
                                                            uri: img
                                                        }}
                                                        containerStyle={{
                                                            width: scaleSizeW(100),
                                                            height: scaleSizeH(100),
                                                            borderRadius: scaleSizeW(5),
                                                            marginTop: scaleSizeW(5),
                                                            marginRight: scaleSizeW(5)
                                                        }}
                                                    />
                                                )

                                            })
                                        }
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: scaleSizeW(5), }}>
                                        <Button titleStyle={{ fontSize: scaleSizeW(8), color: "black", fontWeight: "800" }} color={"transparent"}>
                                            <Icon name="share" size={15} iconStyle={{ marginRight: scaleSizeW(5) }} />
                                            分享
                                        </Button>
                                        <Button titleStyle={{ fontSize: scaleSizeW(8), color: "black", fontWeight: "800" }} color={"transparent"}>
                                            <Icon name="textsms" size={15} iconStyle={{ marginRight: scaleSizeW(5) }} />
                                            评论
                                        </Button>
                                        <Button titleStyle={{ fontSize: scaleSizeW(8), color: "black", fontWeight: "800" }} color={"transparent"}>
                                            <Icon name="recommend" size={15} iconStyle={{ marginRight: scaleSizeW(5) }} />
                                            点赞
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    </>
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: "white",
        marginLeft: scaleSizeW(10),
        padding: scaleSizeW(10),
        borderRadius: scaleSizeW(10)
    }
})

export default CommentPage
