import React, { useEffect } from "react";
import Container from "../../assets/styles/components/Container";
import Header from "../../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import Characteristic from "../components/Characteristic";
import Column from "../../assets/styles/components/Column";
import ProfileBlock from "../components/ProfileBlock";
import Description from "../components/Description";
import { ScrollView } from "react-native";
import CommentsBlock from "../components/CommentsBlock";
import ButtonLayouts from "../../layouts/buttonLayouts";
import ContactsBlock from "../components/ContactsBlock";
import Additionally from "../components/Additionally";
import Footer from "../components/Footer";
import MainBlock from "../components/MainBlock";
import Loading from "../../ui/Loading";
import { useStateCar } from "../../context/stateCarContext";
import { useСondition } from "../../context/stateContext";

const safeValue = (value) => value || "";
const CarDetail = ({ route }) => {
  const navigation = useNavigation();
  const { postId } = route.params;
  const routeTo = () => {
    navigation.navigate("CarPrivateProfile", {
      id: item.id,
    });
  };
  
  const { deLoading, detail, getDetail, param } = useStateCar();
  const { userData } = useСondition();
  const { id } = route.params;

  useEffect(() => {
    getDetail({ id: id });
  }, []);

  if (deLoading) {
    return <Loading />;
  }
  const dataImage =
    !deLoading &&
    detail.pictures.map((el) => {
      return {
        image: el.pictures.big,
      };
    });
  const selectedInterior = param?.interior
    ?.map((obj) => {
      if (detail.interior.includes(obj.id)) {
        return {
          id: obj.id,
          text: obj.name,
        };
      }
      return null;
    })
    .filter(Boolean);
  const selectedExterior = param?.exterior
    ?.map((obj) => {
      if (detail.interior.includes(obj.id)) {
        return {
          id: obj.id,
          text: obj?.name,
        };
      }
      return null;
    })
    .filter(Boolean);
  const selectedConfiguration = param?.configuration
    ?.map((obj) => {
      if (detail.interior.includes(obj.id)) {
        return {
          id: obj.id,
          text: obj?.name,
        };
      }
      return null;
    })
    .filter(Boolean);
  const selectedOther_option = param?.other_option
    ?.map((obj) => {
      if (detail.interior.includes(obj.id)) {
        return {
          id: obj.id,
          text: obj?.name,
        };
      }
      return null;
    })
    .filter(Boolean);
  const selectedSafety = param?.safety
    ?.map((obj) => {
      if (detail.interior.includes(obj.id)) {
        return {
          id: obj.id,
          text: obj?.name,
        };
      }
      return null;
    })
    .filter(Boolean);
  const selectedMedia = param?.media
    ?.map((obj) => {
      if (detail.interior.includes(obj.id)) {
        return {
          id: obj.id,
          text: obj?.name,
        };
      }
      return null;
    })
    .filter(Boolean);
  const getAttributeName = (paramList, id) => {
    return paramList
      ?.map((obj) => (obj.id === id ? obj.name : null))
      .filter(Boolean);
  };
  const fuel = getAttributeName(param?.fuel, detail.fuel);
  const gearbox = getAttributeName(param?.gear_box, detail.gear_box);
  const transmission = getAttributeName(
    param?.transmission,
    detail.transmission
  );
  const steering_wheel = getAttributeName(
    param?.steering_wheel,
    detail.steering_wheel
  );
  const color = getAttributeName(param?.color, detail.color);
  const car_condition = getAttributeName(
    param?.car_condition,
    detail.car_condition
  );
  const featured_option = getAttributeName(
    param?.featured_option,
    detail.featured_option
  );
  const exchange = getAttributeName(param?.exchange, detail.exchange);
  const region = getAttributeName(param?.region, detail.region);
  const registration_country = getAttributeName(
    param?.registration_country,
    detail.registration_country
  );
  const customs = getAttributeName(param?.customs, detail.registration_country);
  const characteristicData = [
    { name: "Год выпуска", value: detail.year },
    {
      name: "Пробег",
      value: `${detail.mileage} ${detail.mileage_unit}`,
    },
    { name: "Двигатель", value: `${detail.engine_volume} ${fuel}` },
    { name: "Коробка передач", value: gearbox },
    { name: "Привод", value: transmission },
    { name: "Руль", value: steering_wheel },
    { name: "Цвет", value: color },
    { name: "Состояние", value: car_condition },
    { name: "Наличие", value: featured_option },
    {
      name: "Растоможен",
      value: detail.customs === 1 ? "да" : "нет",
    },
    { name: "Возможность обмена", value: exchange },
    { name: "Прочее", value: "" },
    { name: "Регион продажи", value: region },
    { name: "Учёт", value: registration_country },
  ].filter((item) => item.value && item.value.length > 0);
  return (
    <ButtonLayouts>
      <Container none={true} phon={true}>
        <Header
          id={detail.id}
          love={true}
          back={true}
          container={true}
          home={false}
          likes={detail.is_liked}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Column gap={4}>
            <MainBlock
              img={dataImage}
              mark={safeValue(detail?.mark_name)}
              year={safeValue(detail?.year)}
              title={safeValue(detail?.model_name)}
              priceUSD={safeValue(detail?.prices?.[1]?.price)}
              priceSom={safeValue(detail?.prices?.[0]?.price)}
              car={true}
              address={region}
              time={"5 мин назад"}
              vip={true}
              addHours={`Добавлено ${safeValue(detail?.added_at)} назад`}
              eye={safeValue(detail?.views)}
              heart={safeValue(detail?.likes)}
              comment={safeValue(detail?.count_comments)}
              is_urgent={detail?.is_urgent}
            />
            <Characteristic
              data={safeValue(characteristicData) }
              keyOne="name"
              keyTwo="value"
            />
            <Additionally
              title={"Комплектация"}
              data={[
                { name: "Комплектация", data:selectedConfiguration},
                { name: "Интерьер", data:selectedInterior },
                { name: "Экстрерьер", data: selectedExterior },
                { name: "Медиа", data: selectedMedia },
                { name: "Безопасность", data: selectedOther_option },
                { name: "Опции", data: selectedSafety},
              ]}
            />
            <Description text={detail.description} />
            <ProfileBlock
              key={detail.user?.id}
              name={detail.user?.name}
              stars={detail.user?.avarage_rating}
              rates={detail.user?.avarage_rating?.toFixed(1)}
              reviews={detail.user?.review_count}
              description={`${detail.user?.accommodation_count} объявления`}
              ava={detail.user?._avatar}
              handle={() =>
                navigation.navigate("CarPrivateProfile", {
                  id: detail.user?.id,
                })
              }
            />
            <CommentsBlock
              data={[
                {
                  ava: "https://www.perunica.ru/uploads/posts/2019-09/1567597236_021.jpg",
                  name: "Санжар",
                  text: "Здравствуйте, а есть черного цвета?😁",
                  date: "2 дн.",
                  answer: false,
                },
                {
                  ava: "https://www.perunica.ru/uploads/posts/2019-09/1567597236_021.jpg",
                  name: "Нурзида",
                  text: "Ради вас покрасим на черный🗿",
                  date: "2 дн.",
                  answer: true,
                },
              ]}
              comments={8}
            />
            <ContactsBlock
              data={[{ phone:detail?.user?.phone}]}
              keyValue={"phone"}
            />
            <Footer my={detail?.user?.id == userData?.id} postId={id} />
          </Column>
        </ScrollView>
      </Container>
    </ButtonLayouts>
  );
};

export default CarDetail;
