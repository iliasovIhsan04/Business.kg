import React, { useState } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Modal,
  Pressable,
} from "react-native";
import TitleBlock from "../ui/TitleBlock";
import Wave from "../../customs/Wave";
import Between from "../../assets/styles/components/Between";
import Flex from "../../assets/styles/components/Flex";
import More from "../../assets/svg/more";
import Icon from "../../assets/svg/chat";
import TextContent from "../../assets/styles/components/TextContent";
import { colors } from "../../assets/styles/colors";
import Column from "../../assets/styles/components/Column";
import ImageCustom from "../../customs/Image";
import Close from "../../assets/svg/clode";
import InputCustom from "../../customs/Input";

const timeAgo = (date) => {
  const now = new Date();
  const secondsAgo = Math.floor((now - new Date(date)) / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo === 0) return "сейчас";
  if (minutesAgo < 60) return `${minutesAgo} минут назад`;
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo} час${hoursAgo > 1 ? "ов" : ""} назад`;
  const daysAgo = Math.floor(hoursAgo / 24);
  return daysAgo < 7
    ? `${daysAgo} ${daysAgo > 1 ? "дней" : "день"} назад`
    : `${Math.floor(daysAgo / 7)} недел${
        Math.floor(daysAgo / 7) > 1 ? "и" : "ю"
      } назад`;
};

const CommentBox = ({ data, handleAnswer, handleReport }) => {
  const [showAllReplies, setShowAllReplies] = useState(false);
  const visibleReplies = showAllReplies
    ? data?.replies
    : data?.replies?.slice(0, 1);
  const remainingRepliesCount = data?.replies?.length - visibleReplies?.length;

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <ImageCustom uri={data.ava} width={40} height={40} borderRadius={50} />
      <Column gap={6}>
        <TextContent fontSize={12} fontWeight={600} color={colors.black}>
          {data.name}
        </TextContent>
        <TextContent fontSize={14} fontWeight={400} color={colors.black}>
          {data.text}
        </TextContent>
        <Flex gap={20}>
          <TextContent fontSize={12} fontWeight={400} color={colors.gray}>
            {timeAgo(data.date)}
          </TextContent>
          <Wave handle={() => handleAnswer(data)}>
            <TextContent fontSize={12} fontWeight={500} color={colors.gray}>
              Ответить
            </TextContent>
          </Wave>
          <Wave handle={() => handleReport(data)}>
            <TextContent fontSize={12} fontWeight={500} color={colors.gray}>
              Пожаловаться
            </TextContent>
          </Wave>
        </Flex>

        {visibleReplies?.length > 0 && (
          <Column top={20} gap={20}>
            {visibleReplies.map((reply) => (
              <CommentBox
                key={`${data.id}-${reply.id}`}
                data={reply}
                handleAnswer={handleAnswer}
                handleReport={handleReport}
              />
            ))}
            {data.replies.length > 1 && (
              <View
                style={{
                  width: "100%",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Wave handle={() => setShowAllReplies(!showAllReplies)}>
                  <TextContent
                    fontSize={12}
                    fontWeight={500}
                    color={colors.gray}
                  >
                    {showAllReplies
                      ? "Скрыть"
                      : `Читать дальше${
                          remainingRepliesCount > 0
                            ? ` (еще ${remainingRepliesCount} ответ${
                                remainingRepliesCount > 1 ? "а" : ""
                              })`
                            : ""
                        }`}
                  </TextContent>
                </Wave>
              </View>
            )}
          </Column>
        )}
      </Column>
    </View>
  );
};

const CommentsBlock = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentsData, setCommentsData] = useState(data);
  const [replyingTo, setReplyingTo] = useState(null);

  const handleAnswer = (comment) => {
    setReplyingTo(comment);
    setCommentText(`@${comment.name} `);
  };

  const handleReport = (comment) => {
    alert(`Reported comment by ${comment.name}`);
  };

  const handleSendComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: `${commentsData.length + 1}-${new Date().getTime()}`,
      name: "Your Name",
      text: commentText,
      date: new Date(),
      answer: !!replyingTo,
      ava: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSZjVzaO_Q0LtpXJ1-tei8FXiuuieXdB_5g&s",
      replies: [],
    };

    if (replyingTo) {
      setCommentsData(
        commentsData.map((comment) =>
          comment.id === replyingTo.id
            ? { ...comment, replies: [newComment, ...comment.replies] }
            : comment
        )
      );
    } else {
      setCommentsData([newComment, ...commentsData]);
    }

    setCommentText("");
    setReplyingTo(null);
  };

  const totalCommentsCount = commentsData.reduce(
    (count, comment) =>
      count + 1 + comment.replies ? comment.replies.length : 0,
    0
  );

  const closeModal = () => {
    setModal(false);
  };

  return (
    <View>
      <TitleBlock title="Комментарии">
        <Wave handle={() => setModal(true)}>
          <Between center="center">
            <Flex gap={10}>
              <Icon />
              <TextContent fontSize={16} fontWeight={500} color={colors.gray}>
                {totalCommentsCount === 0
                  ? "Оставьте первый коментарий!"
                  : `${totalCommentsCount} комментариев`}
              </TextContent>
            </Flex>
            <More />
          </Between>
        </Wave>
      </TitleBlock>

      <Modal
        visible={modal}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "column",
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <Pressable
            onPress={closeModal}
            style={{
              flex: 1,
            }}
          ></Pressable>
          <View
            style={{
              width: "100%",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              paddingHorizontal: 16,
              paddingBottom: Platform.OS === "ios" ? 40 : 20,
              backgroundColor: colors.white,
            }}
          >
            <Between top={10} center="center">
              <View style={{ width: 24 }} />
              <TextContent fontSize={16} fontWeight={500} color={colors.black}>
                {totalCommentsCount} комментариев
              </TextContent>
              <Wave handle={() => setModal(false)}>
                <Close />
              </Wave>
            </Between>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                marginTop: 20,
                width: "100%",
                height: "60%",
              }}
              bounces={false}
              overScrollMode="never"
            >
              <Column
                style={{
                  paddingBottom: 20,
                }}
                gap={20}
              >
                {commentsData.length > 0 ? (
                  commentsData.map((comment, index) => (
                    <CommentBox
                      data={comment}
                      key={`comment-${comment.id + index}`}
                      handleAnswer={handleAnswer}
                      handleReport={handleReport}
                    />
                  ))
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextContent
                      fontSize={16}
                      fontWeight={500}
                      color={colors.gray}
                    >
                      Оставьте первый коментарий!
                    </TextContent>
                  </View>
                )}
              </Column>
            </ScrollView>

            <KeyboardAvoidingView
              style={{
                paddingTop: 20,
              }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Flex gap={10}>
                <ImageCustom
                  uri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSZjVzaO_Q0LtpXJ1-tei8FXiuuieXdB_5g&s"
                  width={40}
                  height={40}
                  borderRadius={50}
                />
                <InputCustom
                  styleContainer={{
                    flex: 1,
                  }}
                  send={true}
                  style={{ paddingHorizontal: 16, borderRadius: 50 }}
                  handle={handleSendComment}
                  validate={true}
                  value={commentText}
                  onChangeText={setCommentText}
                  placeholder="Добавить комментарий"
                />
              </Flex>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CommentsBlock;
