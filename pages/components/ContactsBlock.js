import React, { useState } from "react";
import TitleBlock from "../ui/TitleBlock";
import Flex from "../../assets/styles/components/Flex";
import TextContent from "../../assets/styles/components/TextContent";
import Phone from "../../assets/svg/phone";
import { colors } from "../../assets/styles/colors";
import Wave from "../../customs/Wave";
import { Linking, View, Alert } from "react-native";
import ModalDown from "../../ui/ModalDown";
import Sms from "../../assets/svg/chat";
import Copy from "../../assets/svg/copyGray";
import Whatsapp from "../../assets/svg/whatsapp";
import * as Clipboard from 'expo-clipboard'; // Expo Clipboard

const ContactsBlock = ({ data, keyValue }) => {
  const [modal, setModal] = useState(false);
  const [stateNumber, setStateNumber] = useState("");

  const openModal = ({ number }) => {
    setModal(true);
    setStateNumber(number);
  };

  const CallOr = ({ call, copy, sms, whatsapp }) => {
    if (call) {
      Linking.openURL(`tel:${stateNumber}`);
    }
    if (copy) {
      Clipboard.setString(stateNumber); // Expo Clipboard API
      Alert.alert("Успешно", "Номер скопирован в буфер обмена!");
    }
    if (sms) {
      Linking.openURL(`sms:${stateNumber}`);
    }
    if (whatsapp) {
      Linking.openURL(`https://wa.me/${stateNumber}`);
    }
  };

  return (
    <View>
      <TitleBlock title="Контакты">
        {data?.map((el, id) => (
          <Wave key={id} handle={() => openModal({ number: el[keyValue] })}>
            <Flex gap={10}>
              <Phone />
              <TextContent
                fontSize={16}
                fontWeight={500}
                color={colors.blue}
                style={{
                  textDecorationLine: "underline",
                }}
              >
                {el[keyValue]}
              </TextContent>
            </Flex>
          </Wave>
        ))}
      </TitleBlock>
      <ModalDown modal={modal} setModal={setModal} paddingNone={true}>
        <TitleBlock
          handle={() => setModal(false)}
          closee={true}
          title="Контакты"
        >
          <Wave handle={async () => {
            try {
              const supported = await Linking.canOpenURL(`tel:${stateNumber}`);
              if (supported) {
                await Linking.openURL(`tel:${stateNumber}`);
              } else {
                Alert.alert("Ошибка", "Звонок не поддерживается.");
              }
            } catch (error) {
              Alert.alert("Ошибка", "Не удалось совершить звонок.");
            }
          }}>
            <Flex gap={10}>
              <Phone />
              <TextContent fontSize={16} fontWeight={400} color={colors.black}>
                Позвонить
              </TextContent>
            </Flex>
          </Wave>

          <Wave handle={() => CallOr({ copy: true })}>
            <Flex gap={10}>
              <Copy />
              <TextContent fontSize={16} fontWeight={400} color={colors.black}>
                Скопировать номер
              </TextContent>
            </Flex>
          </Wave>

          <Wave handle={() => CallOr({ sms: true })}>
            <Flex gap={10}>
              <Sms />
              <TextContent fontSize={16} fontWeight={400} color={colors.black}>
                Написать SMS
              </TextContent>
            </Flex>
          </Wave>

          <Wave handle={() => CallOr({ whatsapp: true })}>
            <Flex gap={10}>
              <Whatsapp />
              <TextContent fontSize={16} fontWeight={400} color={colors.black}>
                Написать в WhatsApp
              </TextContent>
            </Flex>
          </Wave>
        </TitleBlock>
      </ModalDown>
    </View>
  );
};

export default ContactsBlock;
