import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon, Input, Text, Button } from "@rneui/themed";
import { StatusBar } from "react-native";
import { authRegisterCaptcha, login, signUp } from "axios/api/auth";
import { scaleSizeW } from "utlis/scaleSize";
import { useNavigation } from "@react-navigation/native";
import { Views } from "types/navigation";
import { useCountdown } from "hook/useCountDown";
import { useAppDispatch } from "store/hooks";
import { setToken, setUserInfo } from "slice/userInfo";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ErrorTip from "components/ErrorTip";

interface FormData {
  mobile: string;
  username: string;
  code: string;
  password: string;
  secPass: string;
}

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { count, start } = useCountdown(60);
  const handleLogin = async () => {
    navigation.navigate(Views.LogIn);
  };
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobile: "",
      username: "",
      code: "",
      password: "",
      secPass: "",
    },
  });

  const handleGetCode = async () => {
    const mobile = getValues("mobile");
    if (!mobile) {
      if (errors.mobile) {
        errors.mobile.type = "required";
      }
      return;
    }
    try {
      start();
      const res = await authRegisterCaptcha({ mobile });
      console.log(res);
    } catch (error) {}
  };

  const handleRegister: SubmitHandler<FormData> = async ({
    mobile,
    code,
    username,
    password,
    secPass,
  }) => {
    if (username && password && mobile && code && password === secPass) {
      setLoading(true);
      try {
        console.log({ mobile, code, username, password });

        const res = await signUp({ mobile, code, username, password });
        console.log(res);
        if (res.errno === 0) {
          dispatch(setToken(res.data.token));
          dispatch(setUserInfo(res.data.userInfo));
          navigation.navigate(Views.Home);
        }
      } catch (error) {
      } finally {
        setLoading(true);
      }
    }
  };

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: StatusBar.currentHeight,
            paddingLeft: scaleSizeW(40),
            paddingRight: scaleSizeW(40),
          }}
        >
          <View style={{ marginTop: "30%" }}>
            <Text h4>欢迎加入直播星球购</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: scaleSizeW(15), color: "grey" }}>
                已有账号？
              </Text>
              <Button
                type="clear"
                title="立即登录"
                titleStyle={{ fontSize: scaleSizeW(16) }}
                onPress={handleLogin}
              />
            </View>
          </View>
          <View style={{ padding: scaleSizeW(20) }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="mobile"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <Icon name="lock" />
                  <TextInput
                    placeholder="请输入手机号"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                  />
                </View>
              )}
            />
            {errors.mobile && <ErrorTip tip={"未输入手机号"} />}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="code"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <Icon name="lock" />
                  <TextInput
                    placeholder="请输入验证码"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                  />
                  <Button
                    title={count === 0 ? "获取验证码" : `${count}`}
                    onPress={handleGetCode}
                    disabled={!(count === 0)}
                    titleStyle={{ fontSize: scaleSizeW(12) }}
                    type="clear"
                  />
                </View>
              )}
            />
            {errors.code && <ErrorTip tip={"未输入验证码"} />}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="username"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <Icon name="lock" />
                  <TextInput
                    placeholder="请输入用户名"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                    secureTextEntry
                  />
                </View>
              )}
            />
            {errors.username && <ErrorTip tip={"未输入用户名"} />}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <Icon name="lock" />
                  <TextInput
                    placeholder="请输入密码"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                    secureTextEntry
                  />
                </View>
              )}
            />
            {errors.password && <ErrorTip tip={"未输入密码"} />}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="secPass"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <Icon name="lock" />
                  <TextInput
                    placeholder="请确认密码"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                    secureTextEntry
                  />
                </View>
              )}
            />
            {errors.secPass && <ErrorTip tip={"密码不一致"} />}
            <Button
              title="确认注册"
              onPress={handleSubmit(handleRegister)}
              size="md"
              loading={loading}
              radius={"lg"}
              containerStyle={{ marginTop: scaleSizeW(20) }}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    margin: scaleSizeW(10),
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: scaleSizeW(15),
    paddingLeft: scaleSizeW(10),
    paddingVertical: scaleSizeW(10),
    borderBottomWidth: 1,
    borderRadius: 10,
  },
});

export default SignUp;
