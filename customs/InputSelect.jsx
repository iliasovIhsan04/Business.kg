import React, { useState } from "react";
import { TextInput, StyleSheet, View, Modal, ScrollView } from "react-native";
import { colors } from "../assets/styles/colors";
import TextContent from "../assets/styles/components/TextContent";
import Wave from "./Wave";
import Header from "../components/Header";
import Container from "../assets/styles/components/Container";
import Column from "../assets/styles/components/Column";
import { useStateHouse } from "../context/stateHouseContext";
import RangeCustom from "./Range";
import { useStateCar } from "../context/stateCarContext";
import Arrow from "../assets/svg/arrowRight";
const InputSelect = React.memo(({
  styleContainer,
  style,
  value,
  data,
  onChangeText,
  placeholder,
  keys,
  label,
  border,
  select,
  car,
  add,
  arrow,
}) => {
  const [modal, setModal] = useState(false);
  const { param, filter, carAdd, setCarAdd, addHouse, setFilter, setAddHouse } =
    car ? useStateCar() : useStateHouse();
  const datas = React.useMemo(() => 
    data ? data : param[value], 
    [data, param, value]
  );
  const currentState = add ? (car ? carAdd : addHouse) : filter;
  const setCurrentState = add ? (car ? setCarAdd : setAddHouse) : setFilter;

  const selectedValue = currentState[keys ? keys : value]?.name || "";
  
  const handleSelect = React.useCallback((item) => {
    setCurrentState(prev => ({
      ...prev,
      [keys ? keys : value]: { id: item.id, name: item.name },
    }));
    setModal(false);
  }, [keys, value, setCurrentState]);
  const debouncedOnChangeText = React.useCallback(
    (text) => {
      if (onChangeText) {
        onChangeText(text);
      }
    },
    [onChangeText]
  );

  if (!select) {
    return (
      <TextInput
        style={[
          stylesInput.basa,
          !border && {
            borderBottomWidth: 1,
            borderBottomColor: colors.gray,
          },
          style,
        ]}
        value={value}
        onChangeText={debouncedOnChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
      />
    );
  }

  const closeModal = () => {
    setModal(false);
  };

  return (
    <View>
      <Wave handle={() => setModal(true)}>
        <View
          style={[
            { height: 50 },
            !border && {
              borderBottomWidth: 1,
              borderBottomColor: colors.gray,
            },
            styleContainer,
          ]}
        >
          <TextContent
            top={2}
            fontSize={12}
            fontWeight={400}
            color={colors.gray}
          >
            {label}
          </TextContent>
          <TextContent
            top={6}
            fontSize={16}
            fontWeight={400}
            color={colors.black}
          >
            {selectedValue}
          </TextContent>
          {arrow && <Arrow />}
        </View>
      </Wave>
      {modal && (
        <Modal visible={modal} animationType="fade" onRequestClose={closeModal}>
          <Container>
            <Header back={true} handleBack={closeModal}>
              {label}
            </Header>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Column
                style={{
                  flex: 1,
                  paddingBottom: 200,
                }}
                gap={16}
              >
                <RangeCustom
                  handle={() => handleSelect({ id: 0, name: "Любой" })}
                  active={selectedValue === "Любой"}
                  text="Любой"
                />
                {datas?.map((el, id) => (
                  <RangeCustom
                    color={value === "color" ? el.color : false}
                    key={id}
                    handle={() => handleSelect(el)}
                    active={selectedValue === el.name}
                    text={el.name}
                  />
                ))}
              </Column>
            </ScrollView>
          </Container>
        </Modal>
      )}
    </View>
  );
});

const stylesInput = StyleSheet.create({
  basa: {
    width: "100%",
    height: 50,
    fontSize: 16,
    fontWeight: "400",
    color: colors.black,
  },
});

export default InputSelect;
