import React, { useState } from "react";
import { TextInput, View, Modal, ScrollView } from "react-native";
import CheckBoxCustom from "./CheckBox";
import Wave from "./Wave";
import { useStateCar } from "../context/stateCarContext";
import TextContent from "../assets/styles/components/TextContent";
import Header from "../components/Header";
import Container from "../assets/styles/components/Container";
import Column from "../assets/styles/components/Column";
import Arrow from "../assets/svg/arrowRight";
import { colors } from "../assets/styles/colors";
import Wrapper from "../assets/styles/components/Wrapper";

const InputSelectAdd = ({
  styleContainer,
  label,
  select,
  arrow,
  border
}) => {
  const [modal, setModal] = useState(false);
  const { param, carAdd, setCarAdd } = useStateCar();
  const [selectedItems, setSelectedItems] = useState({
    interior: [],
    exterior: [],
    media: [],
    safety: [],
    configuration: [],
  });

  const closeModal = () => setModal(false);

  const toggleItem = (id, category) => {
    setSelectedItems((prevState) => {
      const updated = {
        ...prevState,
        [category]: prevState[category]?.includes(id)
          ? prevState[category].filter((item) => item !== id)
          : [...(prevState[category] || []), id],
      };
      return updated;
    });
  };

  const saveSelection = () => {
    const updatedData = { ...carAdd };
    Object.keys(selectedItems).forEach((category) => {
      updatedData[category] = selectedItems[category];
    });
    setCarAdd(updatedData);
    closeModal();
  };

  const filterData = [
    { label: "Интерьер", category: "interior" },
    { label: "Экстерьер", category: "exterior" },
    { label: "Медиа", category: "media" },
    { label: "Безопасность", category: "safety" },
    { label: "Опции", category: "configuration" },
  ];

  const selectedNames = Object.keys(selectedItems)
    .flatMap((category) =>
      selectedItems[category]
        .map((id) => param?.[category]?.find((el) => el.id === id))
        .filter(Boolean)
        .map((item) => item?.name)
    )
    .join(", ");

  return (
    <View style={[
      { height: 50 },
      !border && {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
      },
      styleContainer,
    ]}>
      {select && (
        <View>
          <Wave handle={() => setModal(true)}>
            <View style={[styleContainer]}>
              <TextContent top={2} fontSize={12} fontWeight={400} color={colors.gray}>
                {label}
              </TextContent>
              <TextContent top={6} fontSize={16} fontWeight={400} color={colors.black} numberOfLines={1} ellipsizeMode="tail">
                {selectedNames || "Выберите"}
              </TextContent>
              {arrow && <Arrow />}
            </View>
          </Wave>
          {modal && (
            <Modal visible={modal} animationType="fade" onRequestClose={closeModal}>
              <Container none={true} phon={true}>
                <Header container={true} back={true} handleBack={saveSelection}>
                  {label}
                </Header>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Column gap={6}>
                    {filterData.map(({ label, category }, index) => (
                      <Wrapper padding={[16, 16]} key={category}>
                        <TextContent fontSize={20} fontWeight={600}>
                          {label}
                        </TextContent>
                        {(param?.[category] || []).map((el) => (
                          <CheckBoxCustom
                            key={el.id}
                            text={el.name}
                            active={selectedItems[category]?.includes(el.id)}
                            handle={() => toggleItem(el.id, category)}
                          />
                        ))}
                      </Wrapper>
                    ))}
                  </Column>
                </ScrollView>
              </Container>
            </Modal>
          )}
        </View>
      )}
    </View>
  );
};

export default InputSelectAdd;
