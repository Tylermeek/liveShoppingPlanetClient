import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { CompositeTabScreenParamList } from "navigators/RootStack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text, Button, Icon } from "@rneui/themed";
import { StatusBar } from "react-native";
import { login } from "axios/api/auth";
import storage from "storage";
import { scaleSizeW } from "utlis/scaleSize";
import { Views } from "types/config";
import { useNavigation } from "@react-navigation/native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type LogInProps = CompositeTabScreenParamList<"LogIn">;

interface FormData {
  username: string;
  password: string;
}

const LogIn: React.FC<LogInProps> = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLogin: SubmitHandler<FormData> = async ({ username, password }) => {
    if (username && password) {
      try {
        setLoading(true);
        console.log("post");
        const res = await login({ username, password });
        console.log(res);
        await storage.save({
          key: "userInfo", // 注意:请不要在key中使用_下划线符号!
          data: {
            nickName: res.data.userInfo.nickname,
            avatar: res.data.userInfo.avatar,
            gender: res.data.userInfo.gender,
            mobile: res.data.userInfo.mobile,
          },

          // 如果不指定过期时间，则会使用defaultExpires参数
          // 如果设为null，则永不过期
          expires: null,
        });
        await storage.save({
          key: "Token", // 注意:请不要在key中使用_下划线符号!
          data: {
            token: res.data.token,
          },

          // 如果不指定过期时间，则会使用defaultExpires参数
          // 如果设为null，则永不过期
          expires: null,
        });
        setLoading(false);
        navigation.navigate(Views.Mine);
      } catch (error) {
        console.log(error);
        
        setLoading(false);
      }
    }
  };

  const handleRegister = () => {
    // 处理注册逻辑
    navigation.navigate(Views.SignUp);
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
            <Text style={{ fontSize: scaleSizeW(25), fontWeight: "bold" }}>
              欢迎登录
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: scaleSizeW(15), color: "grey" }}>
                还没有账号
              </Text>
              <Button
                type="clear"
                title="立即注册"
                titleStyle={{ fontSize: scaleSizeW(16) }}
              />
            </View>
          </View>
          <View style={{ height: "60%", marginVertical: scaleSizeW(20) }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <Icon name="person" />
                  <TextInput
                    placeholder="请输入账号/手机号"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                  />
                </View>
              )}
              name="username"
            />
            {errors.username && <Text>请输入账号</Text>}
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <Icon name="lock" />
                  <TextInput
                    placeholder="请输入密码"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                  />
                </View>
              )}
              name="password"
            />
            {errors.password && <Text>请输入密码</Text>}

            <Button
              title="登录"
              size="md"
              loading={loading}
              radius={"lg"}
              onPress={handleSubmit(onLogin)}
              containerStyle={{ marginTop: scaleSizeW(60) }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: scaleSizeW(20),
            }}
          >
            <Button
              title={"忘记密码"}
              type="clear"
              titleStyle={{ fontSize: scaleSizeW(15) }}
            />
            <Button
              title={"注册"}
              type="clear"
              titleStyle={{ fontSize: scaleSizeW(15) }}
              onPress={handleRegister}
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

export default LogIn;
