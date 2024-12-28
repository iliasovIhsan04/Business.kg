import React from "react";
import Header from "../../components/Header";
import { colors } from "../../assets/styles/colors";
import ButtonLayouts from "../../layouts/buttonLayouts";
import { ScrollView, View } from "react-native";
import Wrapper from "../../assets/styles/components/Wrapper";
import InputSelect from "../../customs/InputSelect";
import { useStateHouse } from "../../context/stateHouseContext";
import Column from "../../assets/styles/components/Column";
import CheckBoxCustom from "../../customs/CheckBox";
import { useNavigation } from "@react-navigation/native";

const HouseFilter = ({ route }) => {
  const { filter, loading, result, setFilter } = useStateHouse();
  const navigation = useNavigation();
  const { id } = route.params || 0;

  const Sybmit = () => {
    if (id) {
      navigation.navigate("HouseScreens", {
        screen: "HouseResult",
      });
    } else {
      navigation.navigate("MainScreen");
    }
  };

  const SybmitFunc = () => {
    navigation.navigate("HouseScreens", {
      screen: "HouseResult",
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
        title={`Показать ${result?.length} предложений`}
        color={colors.black}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Wrapper top={true} padding={[200, 8]}>
            <Column gap={6}>
              <InputSelect
                select={true}
                label="Регион"
                value="region"
                placeholder="Выберите регион"
              />
              <InputSelect
                select={true}
                label="Выберите тип"
                value="type_id"
                placeholder="Выберите тип"
              />
              <InputSelect
                select={true}
                label="Город"
                value="town"
                placeholder="Выберите город"
              />
              <InputSelect
                select={true}
                label="Тип недвижимости"
                value="category"
                placeholder="Выберите тип недвижимости"
              />
              <InputSelect
                select={true}
                label="Количество комнат"
                value="rooms"
                placeholder="Выберите тип недвижимости"
              />
              <InputSelect
                select={true}
                label="Валюта"
                value="currency"
                placeholder="Выберите валюту"
              />
              <InputSelect
                select={true}
                label="Этаж от"
                value="floors"
                keys="floor"
                placeholder="Выберите этаж от"
              />
              <InputSelect
                select={true}
                label="Этаж до"
                value="floors"
                keys="floors"
                placeholder="Выберите этаж до"
              />
              <CheckBoxCustom
                active={filter.floors_not_end}
                handle={() => {
                  setFilter({
                    ...filter,
                    floors_not_end: !filter.floors_not_end,
                  });
                }}
                text="Не последний этаж"
              />
              <CheckBoxCustom
                active={filter.floors_last}
                handle={() => {
                  setFilter({ ...filter, floors_last: !filter.floors_last });
                }}
                text="Только последний этаж"
              />
              <InputSelect
                select={true}
                label="Серия"
                value="serie"
                placeholder="Выберите серию"
              />
              <InputSelect
                select={true}
                label="Состояние"
                value="condition"
                placeholder="Выберите состояние"
              />
              <InputSelect
                select={true}
                label="Отопление"
                value="heating"
                placeholder="Выберите отопление"
              />
              <InputSelect
                select={true}
                label="Мебель"
                value="furniture"
                placeholder="Выберите мебель"
              />
              <InputSelect
                select={true}
                label="Тип строения"
                value="building_type"
                placeholder="Выберите тип строения"
              />
              <InputSelect
                value={filter.ceiling_height}
                onChangeText={(text) =>
                  setFilter({ ...filter, ceiling_height: text })
                }
                placeholder="Высота потолков от, м"
              />
              <InputSelect
                value={filter.square}
                onChangeText={(text) => setFilter({ ...filter, square: text })}
                placeholder="Площадь от, м²"
              />
              <InputSelect
                value={filter.land_square}
                onChangeText={(text) =>
                  setFilter({ ...filter, land_square: text })
                }
                placeholder="Площадь земли от, м²"
              />
              <InputSelect
                value={filter.living_square}
                onChangeText={(text) =>
                  setFilter({ ...filter, living_square: text })
                }
                placeholder="Жилая площадь от, м²"
              />
              <InputSelect
                value={filter.kitchen_square}
                onChangeText={(text) =>
                  setFilter({ ...filter, kitchen_square: text })
                }
                placeholder="Площадь кухни от, м²"
              />
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
                  setFilter({ ...filter, video_exists: !filter.video_exists });
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
              />
              <InputSelect
                select={true}
                label="Сортировать по"
                value="owner_type"
                placeholder="Выберите cортировать по"
              />
              <InputSelect
                select={true}
                label="Время размещения"
                value="owner_type"
                placeholder="Выберите время размещения"
              />
            </Column>
          </Wrapper>
        </ScrollView>
      </ButtonLayouts>
    </View>
  );
};

export default HouseFilter;
