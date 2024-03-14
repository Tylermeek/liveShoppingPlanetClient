import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CompositeTabScreenParamList } from "navigators/RootStack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon, Input, Text, Button } from "@rneui/themed";
import { StatusBar } from "react-native";
import { authRegisterCaptcha, login, signUp } from "axios/api/auth";
import storage from "storage";
import { scaleSizeW } from "utlis/scaleSize";
import { useNavigation } from "@react-navigation/native";
import { Views } from "types/config";
import { useCountdown } from "hook/useCountDown";


const SignUp: React.FC = () => {
    const [mobile, setMobile] = useState<string>()
    const [username, setUsername] = useState<string>()
    const [code, setCode] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [secPass, setSecPass] = useState<string>()
    const [loading, setLoading] = useState(false)
    const [errorAccMessage, setErrorAccMessage] = useState<string>()
    const [errorMobileMessage, setErrorMobileMessage] = useState<string>()
    const [errorPassMessage, setErrorPassMessage] = useState<string>()
    const [errorCodeMessage, setErrorCodeMessage] = useState<string>()
    const [errorSecPassMessage, setErrorSecPassMessage] = useState<string>()
    const navigation = useNavigation()
    const { count, start } = useCountdown(60)
    const handleLogin = async () => {
        navigation.navigate(Views.LogIn)
    };

    const handleGetCode = async () => {
        if (!mobile) {
            setErrorMobileMessage("输入正确手机号")
            return
        }
        try {
            start()
            const res = await authRegisterCaptcha({ mobile })
            console.log(res);
        } catch (error) {

        }

    }

    const handleRegister = async () => {
        // 处理注册逻辑
        if (!mobile) {
            setErrorMobileMessage("请输入手机号")
        }
        if (!username) {
            setErrorAccMessage("请输入账号")
        }
        if (!password) {
            setErrorPassMessage("请输入密码")
        }
        if (!code) {
            setErrorCodeMessage("请输入验证码")
        }
        if (password && password !== secPass) {
            setErrorSecPassMessage("两次密码不一致")
        }
        if (username && password && mobile && code && password === secPass) {
            try {
                const res = await signUp({ mobile, code, username, password })
                console.log(res);
            } catch (error) {

            }
        }
    }
    return <>
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ paddingTop: StatusBar.currentHeight, paddingLeft: scaleSizeW(40), paddingRight: scaleSizeW(40), }}>
                <View style={{ marginTop: "30%" }}>
                    <Text h4>欢迎加入直播星球购</Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ fontSize: scaleSizeW(15), color: "grey" }}>已有账号？</Text>
                        <Button
                            type="clear"
                            title="立即登录"
                            titleStyle={{ fontSize: scaleSizeW(16) }}
                            onPress={handleLogin}
                        />
                    </View>
                </View>
                <View style={{ marginTop: scaleSizeW(40) }}>
                    <Input
                        leftIcon={<Icon name="person" />}
                        value={mobile}
                        onChangeText={val => {
                            setMobile(val)
                            !val && setErrorMobileMessage("请输入手机号")
                        }}
                        errorMessage={errorMobileMessage}
                        placeholder="请输入手机号"
                        inputStyle={styles.input}
                    />
                    <Input
                        leftIcon={<Icon name="lock" />}
                        secureTextEntry
                        value={code}
                        onChangeText={val => {
                            setCode(val)
                            !val && setErrorCodeMessage("请输入验证码")
                        }}
                        errorMessage={errorCodeMessage}
                        placeholder="请输入验证码"
                        inputStyle={styles.input}
                        rightIcon={
                            <Button
                                title={(count === 0) ? "获取验证码" : `${count}`}
                                onPress={handleGetCode}
                                disabled={!(count === 0)}
                                titleStyle={{ fontSize: scaleSizeW(12) }}
                                type="clear"
                            />}
                    />
                    {
                        code &&
                        <>
                            <Input
                                leftIcon={<Icon name="person" />}
                                value={username}
                                onChangeText={val => {
                                    setUsername(val)
                                    !val && setErrorAccMessage("请输入用户名")
                                }}
                                errorMessage={errorAccMessage}
                                placeholder="请输入用户名"
                                inputStyle={styles.input}
                            />
                            <Input
                                leftIcon={<Icon name="lock" />}
                                secureTextEntry
                                value={password}
                                onChangeText={val => {
                                    setPassword(val)
                                    !val && setErrorPassMessage("请输入密码")
                                }}
                                errorMessage={errorPassMessage}
                                placeholder="请输入密码"
                                inputStyle={styles.input}
                            />
                            <Input
                                leftIcon={<Icon name="lock" />}
                                secureTextEntry
                                value={secPass}
                                onChangeText={val => {
                                    setSecPass(val)
                                    if (!val || val !== password) setErrorAccMessage("请确认密码")
                                }}
                                errorMessage={errorSecPassMessage}
                                placeholder="请确认密码"
                                inputStyle={styles.input}
                            />
                        </>
                    }

                    <Button
                        title="确认注册"
                        onPress={handleRegister}
                        size="md"
                        loading={loading}
                        radius={"lg"}
                        style={{ marginTop: scaleSizeW(20) }}
                    />
                </View>
            </View>
        </GestureHandlerRootView>
    </>
}

const styles = StyleSheet.create({

    input: {
        fontSize: scaleSizeW(15),
        marginLeft: scaleSizeW(10)
    }

})

export default SignUp
