import { Button, Icon, Input, Text } from "@rneui/themed";
import { useState } from "react";
import { View } from "react-native";
import { scaleSizeW } from "utlis/scaleSize";
import * as ImagePicker from 'expo-image-picker';

export default function InputBar() {
    const [openMoreDrawer, setOpenMoreDrawer] = useState(false)

    const moreOptList = [
        {
            type: "gallery",
            icon: "image",
            name: "相册",
        },
        {
            type: "gallery",
            icon: "image",
            name: "拍摄",
        },
        {
            type: "gallery",
            icon: "image",
            name: "文件",
        },
        {
            type: "gallery",
            icon: "image",
            name: "商品",
        },
        {
            type: "gallery",
            icon: "image",
            name: "订单",
        }
    ]

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
        //   setImage(result.assets[0].uri);
        }
      };

    //打开相机
    async function handleLaunchCamera() {
        pickImage()
    }

    return (

        <View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: scaleSizeW(10) }}>
                <Input
                    containerStyle={{
                        height: scaleSizeW(40),
                        overflow: "hidden",
                        flex: 1,
                        borderRadius: scaleSizeW(15),
                        backgroundColor: "white"
                    }}
                    inputStyle={{ height: scaleSizeW(40) }}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                />
                <Button
                    type="outline"
                    radius="lg"
                    size="sm"
                    icon={openMoreDrawer ? <Icon name="close" /> : <Icon name="add" />}
                    buttonStyle={{
                        borderColor: "transparent",
                        height: scaleSizeW(40),
                        width: scaleSizeW(40)
                    }}
                    containerStyle={{
                        marginLeft: scaleSizeW(10),
                    }}
                    onPress={() => setOpenMoreDrawer(!openMoreDrawer)}
                />
            </View>
            {
                openMoreDrawer && (
                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-evenly",
                        marginVertical: scaleSizeW(10)
                    }}>
                        {
                            moreOptList.map(opt => (
                                <View key={opt.name}>
                                    <Button
                                        icon={<Icon name={opt.icon} size={35} />}
                                        type="solid"
                                        buttonStyle={{ backgroundColor: "white" }}
                                        radius="lg"
                                        onPress={handleLaunchCamera}
                                    />
                                    <Text style={{ margin: scaleSizeW(10) }}>{opt.name}</Text>
                                </View>
                            ))
                        }
                    </View>
                )
            }
        </View>
    )
}
