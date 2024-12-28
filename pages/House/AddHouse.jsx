import React from "react";
import Container from "../../assets/styles/components/Container";
import Header from "../../components/Header";
import InputSelect from "../../customs/InputSelect";
import { useStateHouse } from "../../context/stateHouseContext";
import Wrapper from "../../assets/styles/components/Wrapper";
import Column from "../../assets/styles/components/Column";
import { ScrollView } from "react-native";
import ButtonLayouts from "../../layouts/buttonLayouts";
import { colors } from "../../assets/styles/colors";
import Loading from "../../ui/Loading";

const AddHouse = () => {
  const {
    param,
    paramLoad,
    reset,
    paramAdd,
    addHouse,
    setAddHouse,
    proLoading,
    postProduct,
    buildings,
  } = useStateHouse();

  console.log(param, paramAdd);

  if (paramLoad) {
    return <Loading />;
  }

  return (
    <Container none={true}>
      <Header back={true} iks={true} reset={reset} container={true}>
        Добавление объявления
      </Header>
      <ButtonLayouts
        handle={postProduct}
        loading={proLoading}
        title="Подать объявление"
        color={colors.green}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Wrapper top={true} padding={[200, 8]}>
            <Column gap={6}>
              {paramAdd &&
                paramAdd.map((el, id) => {
                  if (el.input) {
                    return (
                      <InputSelect
                        key={id}
                        value={addHouse[el.label].value}
                        onChangeText={(text) =>
                          setAddHouse({ ...addHouse, [el.label]: text })
                        }
                        placeholder={el.title}
                      />
                    );
                  } else {
                    return (
                      <InputSelect
                        key={id}
                        data={el.label == "building_id" ? buildings : false}
                        select={true}
                        label={el.title}
                        keys={el.label == "floor" ? "floor" : ""}
                        value={el.label == "floor" ? "floors" : el.label}
                        placeholder={el.placeholder}
                        add={true}
                      />
                    );
                  }
                })}
              <InputSelect
                value={addHouse.cadastre_number}
                onChangeText={(text) =>
                  setAddHouse({ ...addHouse, cadastre_number: text })
                }
                placeholder="Код ЕНИ: 0-00-00-0000-00000"
              />
              <InputSelect
                data={param.currency}
                select={true}
                label="Валюта"
                value="currency"
                placeholder="Валюта"
                add={true}
              />
              <InputSelect
                data={param.installment}
                select={true}
                label="Возможность рассрочки"
                value="installment"
                placeholder="Возможность рассрочки"
                add={true}
              />
              <InputSelect
                data={param.mortgage}
                select={true}
                label="Возможность ипотеки"
                value="mortgage"
                placeholder="Возможность ипотеки"
                add={true}
              />
              <InputSelect
                data={param.exchange}
                select={true}
                label="Возможность обмена"
                value="exchange"
                placeholder="Возможность обмена"
                add={true}
              />
              <InputSelect
                data={param.owner_type}
                select={true}
                label="Владелец"
                value="owner_type"
                placeholder="Владелец"
                add={true}
              />
              <InputSelect
                data={param.region}
                select={true}
                label="Регион"
                value="region"
                placeholder="Регион"
                add={true}
              />
              {/* <InputSelect
                data={towns}
                select={true}
                label="Город*"
                value="town"
                placeholder="Город*"
                add={true}
              /> */}
              <InputSelect
                data={param.district}
                select={true}
                label="Район"
                value="district"
                placeholder="Район"
                add={true}
              />
              <InputSelect
                value={addHouse.street}
                onChangeText={(text) =>
                  setAddHouse({ ...addHouse, street: text })
                }
                placeholder="Адрес"
              />
              <InputSelect
                value={addHouse.house_number}
                onChangeText={(text) =>
                  setAddHouse({ ...addHouse, house_number: text })
                }
                placeholder="Номер дома"
              />
              <InputSelect
                value={addHouse.crossing}
                onChangeText={(text) =>
                  setAddHouse({ ...addHouse, crossing: text })
                }
                placeholder="Пересечение с"
              />
              <InputSelect
                value={addHouse.youtube_url}
                onChangeText={(text) =>
                  setAddHouse({ ...addHouse, youtube_url: text })
                }
                placeholder="Номер дома"
              />
              <InputSelect
                value={addHouse.price}
                onChangeText={(text) =>
                  setAddHouse({ ...addHouse, price: text })
                }
                placeholder="Цена дома"
              />
            </Column>
          </Wrapper>
        </ScrollView>
      </ButtonLayouts>
    </Container>
  );
};

export default AddHouse;
