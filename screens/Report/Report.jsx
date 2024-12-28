import React from "react";
import Container from "../../assets/styles/components/Container";
import Header from "../../components/Header";
import LayoutTab from "../../layouts/tabs";
import { View } from "react-native";
import TextContent from "../../assets/styles/components/TextContent";
import Not_Folder from "../../assets/svg/not_folder";
import { colors } from "../../assets/styles/colors";

const Report = () => {
  return (
    <LayoutTab>
      <Container>
        <Header back={true}>Мои отчеты</Header>
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
          <Not_Folder />
          <TextContent fontSize={18} fontWeight={500} color={colors.black}>
            У вас нет отчетов
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
            Тут будут появляться ваши купленные отчеты
          </TextContent>
        </View>
      </Container>
    </LayoutTab>
  );
};

export default Report;
