import React from "react";
import Container from "../../assets/styles/components/Container";
import Header from "../../components/Header";
import LayoutTab from "../../layouts/tabs";
import { View } from "react-native";
import NotificationImg from '../../assets/svg/Notif'
import TextContent from "../../assets/styles/components/TextContent";
import { colors } from "../../assets/styles/colors";

const Notif = () => {
  return (
    <LayoutTab>
      <Container>
        <Header back={true}>Уведомления</Header>
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
          <NotificationImg />
          <TextContent fontSize={18} fontWeight={500} color={colors.black}>
          Нет уведомлений
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
         Здесь вскоре появятся ваши уведомления.
          </TextContent>
        </View>
      </Container>
    </LayoutTab>
  );
};

export default Notif;
