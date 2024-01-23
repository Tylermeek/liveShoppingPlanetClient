import { Divider, Icon, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ProductInfo } from "types/info";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

interface IntroCardProps {
    info: ProductInfo | undefined
}

const IntroCard: React.FC<IntroCardProps> = ({ info }) => {
    return <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={{ color: "rgba(51, 51, 51, 1)", fontSize: scaleSizeW(13) }} numberOfLines={2} ellipsizeMode="clip">{info?.title}</Text>
            <Text style={{ color: "#E36235", fontSize: scaleSizeW(18), marginTop: scaleSizeW(5) }}>￥{info?.price}</Text>
            <View style={styles.subTitleContainer}>
                <Text style={styles.subTitle}>月销:{info?.sold}</Text>
            </View>
        </View>
        <View style={{ backgroundColor: "transparent", marginTop:scaleSizeW(5)}}>
            <View style={styles.list}>
                <Icon name="local-shipping" style={{ marginRight: scaleSizeW(10) }} />
                <Text style={styles.listItem}>快递邮费: {info?.expressInfo.cost}</Text>
                <Text style={styles.listItem}>{info?.expressInfo.source}</Text>
            </View>
            {/* <Divider style={{ marginLeft: scaleSizeW(5), marginRight: scaleSizeW(5) }} /> */}
            <View style={[styles.list, { marginTop: scaleSizeW(2.5)}]}>
                <Icon name="verified" style={{ marginRight: scaleSizeW(10) }} />
                {
                    info?.supportServices.map((service, index) => {
                        return <>
                            {index !== 0 &&
                                <Text key={`service${index}`} style={styles.listItem}>|</Text>
                            }
                            <Text key={service} style={styles.listItem}>{service}</Text>
                        </>
                    })
                }
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
    },
    titleContainer: {
        padding: scaleSizeW(10),
        backgroundColor: "white"

    },
    subTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: scaleSizeW(5)
    },
    subTitle: {
        color: "rgba(153, 153, 153, 1)",
        fontSize: scaleSizeW(10),
    },
    list: {
        height: scaleSizeH(50),
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
        padding: scaleSizeW(10)
    },
    listItem: {
        padding: scaleSizeW(5),
        fontSize: scaleSizeW(10)
    }
})

export default IntroCard
