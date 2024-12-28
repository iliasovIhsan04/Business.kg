import React, { useState } from "react";
import Container from "../../assets/styles/components/Container";
import Header from "../../components/Header";
import Wave from "../../customs/Wave";
import TextContent from "../../assets/styles/components/TextContent";
import { colors } from "../../assets/styles/colors";
import { View } from "react-native";
import Button from "../../customs/Button";
import Flex from "../../assets/styles/components/Flex";
import Column from "../../assets/styles/components/Column";
import Icon_1 from "./images/icon_1";
import Icon_2 from "./images/icon_2";
import Icon_3 from "./images/icon_3";
import Icon_4 from "./images/icon_4";
import Icon_5 from "./images/icon_5";
import Icon_6 from "./images/icon_6";
import Icon_7 from "./images/icon_7";
import { useStateHouse } from "../../context/stateHouseContext";
import { useNavigation } from "@react-navigation/native";

const cateData = [
  {
    id: 1,
    name: "квартира",
    icon: <Icon_1 />,
  },
  {
    id: 2,
    name: "дом",
    icon: <Icon_2 />,
  },
  {
    id: 3,
    name: "коммерческая недвижимость",
    icon: <Icon_3 />,
  },
  {
    id: 4,
    name: "комната",
    icon: <Icon_4 />,
  },
  {
    id: 5,
    name: "участок",
    icon: <Icon_5 />,
  },
  {
    id: 6,
    name: "дача",
    icon: <Icon_6 />,
  },
  {
    id: 7,
    name: "паркинг/гараж",
    icon: <Icon_7 />,
  },
];

const AddCategory = () => {
  const { getParam } = useStateHouse();
  const [type, setType] = useState({ id: 0, value: "" });
  const [category, setCategory] = useState({ id: 0, value: "" });
  const navigation = useNavigation();

  const title = type.value ? type.value : "Выберите тип";

  return (
    <Container>
      <Header
        handleBack={() => {
          if (type.id !== 0) {
            setType({ ...type, id: 0, value: "" });
          } else {
            navigation.goBack();
          }
        }}
        back={true}
      >
        {title}
      </Header>
      {type.id == 0 ? (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            gap: 16,
            paddingTop: 20,
          }}
        >
          <Wave>
            <Button
              handle={() => setType({ ...type, id: 1, value: "Продажа" })}
              color={colors.house}
            >
              Продажа
            </Button>
          </Wave>
          <Wave>
            <Button
              handle={() => setType({ ...type, id: 2, value: "Аренда" })}
              color={colors.house}
            >
              Аренда
            </Button>
          </Wave>
        </View>
      ) : (
        <Column top={16} gap={16}>
          {cateData.map((el, id) => (
            <Wave
              key={id}
              handle={() => {
                getParam({
                  type_id: type.id,
                  category: el.id,
                });
                navigation.navigate("HouseScreens", {
                  screen: "AddHouse",
                });
                setCategory({ ...category, id: el.id, value: el.name });
              }}
            >
              <Flex gap={10}>
                {el.icon}
                <TextContent
                  fontSize={16}
                  fontWeight={400}
                  color={colors.black}
                >
                  {el.name}
                </TextContent>
              </Flex>
            </Wave>
          ))}
        </Column>
      )}
    </Container>
  );
};

export default AddCategory;
