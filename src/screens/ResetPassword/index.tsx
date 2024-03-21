import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon, Text, Button, Image } from "@rneui/themed";
import { StatusBar } from "react-native";
import { authCaptcha, resetPass } from "axios/api/auth";
import { scaleSizeW } from "utlis/scaleSize";
import { useNavigation } from "@react-navigation/native";
import { Views } from "types/navigation";
import { useCountdown } from "hook/useCountDown";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ErrorTip from "components/ErrorTip";

interface FormData {
  mobile: string;
  code: string;
  password: string;
  secPass: string;
}

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [imgCode, setImgCode] = useState<string | null>(null);
  const navigation = useNavigation();
  const { count, start } = useCountdown(60);
  const handleLogin = async () => {
    navigation.navigate(Views.LogIn);
  };
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobile: "",
      code: "",
      password: "",
      secPass: "",
    },
  });

  const handleGetCode = async () => {
    if (count !== 0) {
      console.log("cant not");
    }
    const mobile = getValues("mobile");
    console.log(mobile);

    if (!mobile) {
      console.log("cant not");
      setError("mobile", {
        type: "required",
        message: "test",
      });
      return;
    }
    try {
      start();
      const res = (await authCaptcha()) as any;
      console.log(res.image);
      if (res.image) {
        setImgCode(res.image);
      }
    } catch (error) {}
  };

  const handleReset: SubmitHandler<FormData> = async ({
    mobile,
    code,
    password,
    secPass,
  }) => {
    if (password && mobile && code && password === secPass) {
      setLoading(true);
      try {
        console.log({ mobile, code, password });
        const res = await resetPass({ mobile, code, password });
        console.log(res);
        if (res.errno === 0) {
          navigation.navigate(Views.LogIn);
        }
      } catch (error) {
      } finally {
        setLoading(false);
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
            <Text h4>重置密码</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: scaleSizeW(15), color: "grey" }}>
                想起了密码?
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
                  {
                    <View style={{ alignItems: "center" }}>
                      {imgCode && (
                        <Image
                          source={{
                            uri: `data:image/jpeg;base64,${imgCode}`,
                          }}
                          style={{
                            height: 30,
                            width: 60,
                          }}
                        />
                      )}
                      <Button
                        title={count === 0 ? "获取验证码" : `${count}`}
                        onPress={handleGetCode}
                        disabled={!(count === 0)}
                        titleStyle={{ fontSize: scaleSizeW(12) }}
                        type="clear"
                      />
                    </View>
                  }
                </View>
              )}
            />

            {errors.code && <ErrorTip tip={"未输入验证码"} />}
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
              title="确认重置"
              onPress={handleSubmit(handleReset)}
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
}

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
