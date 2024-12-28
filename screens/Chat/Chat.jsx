import React from "react";
import Container from "../../assets/styles/components/Container";
import Header from "../../components/Header";
import LayoutTab from "../../layouts/tabs";
import { View } from "react-native";
import TextContent from "../../assets/styles/components/TextContent";
import { colors } from "../../assets/styles/colors";
import Not_Folder from "../../assets/svg/not_folder";
import ChatImg from '../../assets/svg/chatImg'

const Chat = () => {
  return (
    <LayoutTab>
      <Container>
        <Header back={true}>Чат</Header>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            paddingBottom: 200,
            gap: 12,
          }}
        >
          <ChatImg />
          <TextContent fontSize={18} fontWeight={500} color={colors.black}>
          Чат пуст
          </TextContent>
          <TextContent
            style={{
              width: 250,
            }}
            center={true}
            fontSize={16}
            fontWeight={400}
            color={colors.gray}
          >
        Ваши новые сообщения появятся здесь, как только вы начнёте разговор.
          </TextContent>
        </View>
      </Container>
    </LayoutTab>
  );
};

export default Chat;
