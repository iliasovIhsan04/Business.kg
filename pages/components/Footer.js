import React from "react";
import Wrapper from "../../assets/styles/components/Wrapper";
import Column from "../../assets/styles/components/Column";
import Button from "../../customs/Button";
import Copy from "../../assets/svg/copy";
import { colors } from "../../assets/styles/colors";
import GradientBackground from "../../customs/grad";
import Wave from "../../customs/Wave";
import { useNavigation } from "@react-navigation/native";

const Footer = ({ my, postId }) => {
  const navigation = useNavigation();

  const copyLink = () => {};
  const report = () => {};
  return (
    <Wrapper padding={[150, 16]}>
      <Column gap={10}>
        <Button
          handle={() => copyLink()}
          icon={<Copy />}
          color={colors.phon}
          textColor={colors.black}
        >
          Скопировать ссылку
        </Button>
        {my ? (
          <Wave handle={() =>  navigation.navigate("Tariffs", { objectId: postId })}>
            <GradientBackground>Продать быстрее</GradientBackground>
          </Wave>
        ) : (
          <Button
            handle={() => report()}
            color={colors.phon}
            textColor={colors.red}
          >
            Пожаловаться
          </Button>
        )}
      </Column>
    </Wrapper>
  );
};

export default Footer;
