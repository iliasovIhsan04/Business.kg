import React from "react";
import Header from "../../components/Header";
import ButtonLayouts from "../../layouts/buttonLayouts";
import { ScrollView, StyleSheet, View } from "react-native";
import Wrapper from "../../assets/styles/components/Wrapper";
import InputSelect from "../../customs/InputSelect";
import Column from "../../assets/styles/components/Column";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../assets/styles/colors";
import { useStateCar } from "../../context/stateCarContext";

const CarFilter = ({ route }) => {
  const {
    markData,
    modelData,
    generationData,
    filter,
    loading,
    result,
    setFilter,
  } = useStateCar();
  const navigation = useNavigation();
  const { id } = route.params || 0;

  const Sybmit = () => {
    console.log(id);
    if (id) {
      navigation.navigate("CarScreens", {
        screen: "CarResult",
      });
    } else {
      navigation.navigate("MainScreen");
    }
  };
  const SybmitFunc = () => {
    navigation.navigate("CarScreens", {
      screen: "CarResult",
    });
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header handleBack={Sybmit} container={true} back={true}>
        Поиск
      </Header>
      <ButtonLayouts
        handle={SybmitFunc}
        loading={loading}
        title={`Показать ${result.length} предложений`}
        color={colors.black}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <Column gap={6}>
              <Wrapper top={true} bottom={true} style={styles.wrapper}>
                <InputSelect
                  select={true}
                  label="Регион"
                  value="region"
                  placeholder="Выберите регион"
                  border={true}
                  car={true}
                />
              </Wrapper>
              <Wrapper top={true} bottom={true} style={styles.wrapper}>
                <Column gap={6}>
                  <InputSelect
                    select={true}
                    data={markData}
                    label="Марка"
                    value="mark"
                    placeholder="Марка"
                    car={true}
                  />
                  <InputSelect
                    select={true}
                    data={modelData}
                    label="Модель"
                    value="model"
                    placeholder="Модель"
                    car={true}
                  />
                  <InputSelect
                    select={true}
                    label="Год выпуска"
                    value="year"
                    placeholder="Год выпуска"
                    car={true}
                  />
                  <InputSelect
                    select={true}
                    label="Валюта"
                    value="currency"
                    placeholder="Выберите валюту"
                  />
                  <InputSelect
                    value={filter.price}
                    onChangeText={(text) =>
                      setFilter({ ...filter, price: text })
                    }
                    placeholder="цена"
                  />
                  <InputSelect
                    select={true}
                    data={generationData}
                    label="Поколение"
                    value="generation"
                    placeholder="Поколение"
                    car={true}
                  />
                </Column>
              </Wrapper>

              <Wrapper top={true} bottom={true} style={styles.wrapper}>
                <Column gap={6}>
                  <InputSelect
                    select={true}
                    label="Тип кузова"
                    value="car_type"
                    placeholder="Тип кузова"
                    car={true}
                  />
                  <InputSelect
                    select={true}
                    label="Руль"
                    value="steering_wheel"
                    placeholder="Руль"
                    car={true}
                  />
                  <InputSelect
                    select={true}
                    label="Двигатель"
                    value="fuel"
                    placeholder="Двигатель"
                    car={true}
                  />
                  <InputSelect
                    select={true}
                    label="Коробка передач"
                    value="gear_box"
                    placeholder="Коробка передач"
                    car={true}
                  />
                  <InputSelect
                    select={true}
                    label="Привод"
                    value="transmission"
                    placeholder="Привод"
                    car={true}
                  />
                  <InputSelect
                    select={true}
                    label="Состояние"
                    value="car_condition"
                    placeholder="Состояние"
                    car={true}
                  />
                  <InputSelect
                    select={true}
                    label="Цвет"
                    value="color"
                    placeholder="Цвет"
                    car={true}
                  />
                  <InputSelect
                    value={filter.mileage}
                    onChangeText={(text) =>
                      setFilter({ ...filter, mileage: text })
                    }
                    placeholder="Пробег"
                  />
                  <InputSelect
                    select={true}
                    label="Комплектация"
                    value="configuration"
                    placeholder="Комплектация"
                    car={true}
                    border={true}
                  />
                </Column>
              </Wrapper>
              {/* <Wrapper top={true} bottom={true} style={styles.wrapper}>
                <CheckBoxCustom
                  active={filter.is_urgent}
                  handle={() => {
                    setFilter({ ...filter, is_urgent: !filter.is_urgent });
                  }}
                  text="Срочно"
                />
                <CheckBoxCustom
                  active={filter.picture_exists}
                  handle={() => {
                    setFilter({
                      ...filter,
                      picture_exists: !filter.picture_exists,
                    });
                  }}
                  text="Есть фото"
                />
                <CheckBoxCustom
                  active={filter.video_exists}
                  handle={() => {
                    setFilter({
                      ...filter,
                      video_exists: !filter.video_exists,
                    });
                  }}
                  text="Есть видео"
                />
                <CheckBoxCustom
                  active={filter.exchange}
                  handle={() => {
                    setFilter({ ...filter, exchange: !filter.exchange });
                  }}
                  text="Возможен обмен"
                />
                <CheckBoxCustom
                  active={filter.installment}
                  handle={() => {
                    setFilter({ ...filter, installment: !filter.installment });
                  }}
                  text="Возможна рассрочка"
                />
                <CheckBoxCustom
                  active={filter.mortgage}
                  handle={() => {
                    setFilter({ ...filter, mortgage: !filter.mortgage });
                  }}
                  text="Возможна ипотека"
                />
              </Wrapper> */}
              <Wrapper top={true} style={{ paddingTop: 8, paddingBottom: 200 }}>
                <Column gap={6}>
                  <InputSelect
                    select={true}
                    label="От кого"
                    value="owner_type"
                    placeholder="Выберите от кого"
                  />
                  <InputSelect
                    select={true}
                    label="Правоустанавливающие документы"
                    value="document"
                    placeholder="Выберите правоустанавливающие документы"
                    border={true}
                  />
                </Column>
              </Wrapper>
            </Column>
          </View>
        </ScrollView>
      </ButtonLayouts>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 8,
    paddingTop: 8,
  },
  input_center1: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
  },
});

export default CarFilter;
