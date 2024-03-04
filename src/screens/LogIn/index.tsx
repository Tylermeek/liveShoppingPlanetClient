import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CompositeTabScreenParamList } from "navigators/RootStack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon, Input, Text, Button } from "@rneui/themed";
import { StatusBar } from "react-native";
import { login } from "axios/api/account";
import storage from "storage";
import { scaleSizeW } from "utlis/scaleSize";
import { Views } from "types/config";
import { useNavigation } from "@react-navigation/native";

type LogInProps = CompositeTabScreenParamList<"LogIn">;

const LogIn: React.FC<LogInProps> = () => {
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [loading, setLoading] = useState(false)
    const [errorAccMessage, setErrorAccMessage] = useState<string>()
    const [errorPassMessage, setErrorPassMessage] = useState<string>()
    const navigation = useNavigation()
    const handleLogin = async () => {
        // 处理登录逻辑
        if (!username) {
            setErrorAccMessage("请输入账号")
        }
        if (!password) {
            setErrorPassMessage("请输入密码")
        }
        if (username && password) {
            try {
                setLoading(true)
                const res = await login({ username, password })
                console.log();
                await storage.save({
                    key: 'userInfo', // 注意:请不要在key中使用_下划线符号!
                    data: {
                        info: {
                            nickName: res.data.userInfo.nickName,
                            avatar: res.data.userInfo.avatarUrl
                        },
                        token: res.data.token,
                    },

                    // 如果不指定过期时间，则会使用defaultExpires参数
                    // 如果设为null，则永不过期
                    expires: 1000 * 3600,
                });
                setLoading(false)
                navigation.navigate(Views.Home)
            } catch (error) {
                setLoading(false)
            }
        }
    };

    const handleRegister = () => {
        // 处理注册逻辑
        navigation.navigate(Views.SignUp)
    }
    return <>
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ paddingTop: StatusBar.currentHeight, paddingLeft: scaleSizeW(40), paddingRight: scaleSizeW(40), }}>
                <View style={{ marginTop: "30%" }}>
                    <Text h3>欢迎登录</Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ fontSize: scaleSizeW(15), color: "grey" }}>还没有账号</Text>
                        <Button
                            type="clear"
                            title="立即注册"
                            titleStyle={{ fontSize: scaleSizeW(16) }}

                        />
                    </View>
                </View>
                <View style={{ marginTop: scaleSizeW(40) }}>
                    <Input
                        leftIcon={<Icon name="person" />}
                        value={username}
                        onChangeText={val => setUsername(val)}
                        errorMessage={errorAccMessage}
                        placeholder="请输入账号/手机号"
                        inputStyle={styles.input}
                    />
                    <Input
                        leftIcon={<Icon name="lock" />}
                        secureTextEntry
                        value={password}
                        onChangeText={val => setPassword(val)}
                        errorMessage={errorPassMessage}
                        placeholder="请输入密码"
                        inputStyle={styles.input}
                    />
                    <Button
                        title="登录"
                        onPress={handleLogin}
                        size="md"
                        loading={loading}
                        radius={"lg"}
                        style={{ marginTop: scaleSizeW(20) }}

                    />
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: scaleSizeW(20) }}>
                        <Button
                            title={"忘记密码"}
                            type="clear"
                            titleStyle={{fontSize: scaleSizeW(15)}}
                        />
                        <Button
                            title={"注册"}
                            type="clear"
                            titleStyle={{fontSize: scaleSizeW(15)}}
                            onPress={handleRegister}
                        />
                    </View>
                </View>
            </View>
        </GestureHandlerRootView>
    </>
}

const styles = StyleSheet.create({

    input: {
        fontSize: scaleSizeW(15),
        marginLeft:scaleSizeW(10)
    }

})

export default LogIn
