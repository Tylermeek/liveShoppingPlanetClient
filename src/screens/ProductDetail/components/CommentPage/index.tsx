import { Avatar, Button, Icon } from "@rneui/base";
import { Divider, Image, Text } from "@rneui/themed";
import { useRequest } from "ahooks";
import { FliterType, getGoodsDetail } from "axios/api/goods";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IGoodComment, commentDetail } from "types/goods";
import { isEmptyArr } from "utlis/method";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

interface CommentPageProps {
  goodsId: number;
}

const CommentPage: React.FC<CommentPageProps> = ({ goodsId }) => {
  // todo 评论分享、留言、点赞功能
  const [comment, setComment] = useState<IGoodComment>();
  const [list, setList] = useState<commentDetail[]>([]);
  const [allComment, setAllComment] = useState<commentDetail[]>([]);
  const [withImgComment, setWithImgComment] = useState<commentDetail[]>([]);
  const [fliterType, setFliterType] = useState<FliterType>(FliterType.Default);
  const { loading } = useRequest(() => getGoodsDetail({ id: goodsId }), {
    onSuccess: (res) => {
      setComment(res?.data.comment);
      setList(res.data.comment.data);
      setAllComment(res.data.comment.data);
      setWithImgComment(fliteWithImg(res.data.comment.data));
    },
  });
  const fliteWithImg = (comment: commentDetail[]) => {
    return comment.filter((item) => {
      return item.picList && !isEmptyArr(item.picList);
    });
  };
  //   const getComment = () => {
  //     getProductCommentComment(productId).then((res) => {
  //       console.log(res.data);

  //       setComment(res.data);
  //       setAllComment(res.data);
  //       setWithImgComment(fliteWithImg(res.data));
  //     });
  //   };

  const handlePressFliter = (type: FliterType) => {
    if (type === fliterType) return;
    else {
      setFliterType(type);
      setList(type === FliterType.Default ? allComment : withImgComment);
    }
  };

  return (
    <>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            padding: scaleSizeW(5),
          }}
        >
          <Button
            color={"transparent"}
            onPress={() => handlePressFliter(FliterType.Default)}
            titleStyle={{
              fontSize: scaleSizeW(12),
              color: fliterType === FliterType.Default ? "#E36235" : "grey",
            }}
          >
            {`全部评论(${allComment.length})`}
          </Button>
          <Divider orientation="vertical" />
          <Button
            color={"transparent"}
            buttonStyle={{ backgroundColor: "transparent" }}
            onPress={() => handlePressFliter(FliterType.WithImg)}
            titleStyle={{
              fontSize: scaleSizeW(12),
              color: fliterType === FliterType.WithImg ? "#E36235" : "grey",
            }}
          >
            {`带图评论(${withImgComment.length})`}
          </Button>
        </View>
        <View
          style={{
            backgroundColor: "rgb(221, 221, 221)",
            borderTopLeftRadius: scaleSizeW(15),
            borderTopRightRadius: scaleSizeW(15),
          }}
        >
          {list.map((comment) => {
            return (
              <View key={comment.id} style={{ padding: scaleSizeW(10) }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginBottom: scaleSizeH(5),
                  }}
                >
                  <Avatar size={32} rounded source={{ uri: comment.avatar }} />
                  <Text
                    style={{
                      marginLeft: scaleSizeW(5),
                      fontSize: scaleSizeW(11),
                    }}
                  >
                    {comment.nickname}
                  </Text>
                </View>
                <View style={styles.contentContainer}>
                  <Text style={{ fontSize: scaleSizeW(10) }}>
                    {comment.content}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    {comment.picList &&
                      !isEmptyArr(comment.picList) &&
                      comment.picList.map((img, index) => {
                        return (
                          <Image
                            key={index}
                            source={{
                              uri: img,
                            }}
                            containerStyle={{
                              width: scaleSizeW(100),
                              height: scaleSizeH(100),
                              borderRadius: scaleSizeW(5),
                              marginTop: scaleSizeW(5),
                              marginRight: scaleSizeW(5),
                            }}
                          />
                        );
                      })}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: scaleSizeW(5),
                    }}
                  >
                    <Button
                      titleStyle={{
                        fontSize: scaleSizeW(8),
                        color: "black",
                        fontWeight: "800",
                      }}
                      color={"transparent"}
                    >
                      <Icon
                        name="share"
                        size={15}
                        iconStyle={{ marginRight: scaleSizeW(5) }}
                      />
                      分享
                    </Button>
                    <Button
                      titleStyle={{
                        fontSize: scaleSizeW(8),
                        color: "black",
                        fontWeight: "800",
                      }}
                      color={"transparent"}
                    >
                      <Icon
                        name="textsms"
                        size={15}
                        iconStyle={{ marginRight: scaleSizeW(5) }}
                      />
                      评论
                    </Button>
                    <Button
                      titleStyle={{
                        fontSize: scaleSizeW(8),
                        color: "black",
                        fontWeight: "800",
                      }}
                      color={"transparent"}
                    >
                      <Icon
                        name="recommend"
                        size={15}
                        iconStyle={{ marginRight: scaleSizeW(5) }}
                      />
                      点赞
                    </Button>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "white",
    marginLeft: scaleSizeW(10),
    padding: scaleSizeW(10),
    borderRadius: scaleSizeW(10),
  },
});

export default CommentPage;
