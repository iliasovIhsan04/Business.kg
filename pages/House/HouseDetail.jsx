import React, { useEffect } from "react";
import Container from "../../assets/styles/components/Container";
import Header from "../../components/Header";
import { colors } from "../../assets/styles/colors";
import AccountBlock from "../components/AccountBlock";
import { useNavigation } from "@react-navigation/native";
import Characteristic from "../components/Characteristic";
import Column from "../../assets/styles/components/Column";
import ProfileBlock from "../components/ProfileBlock";
import Description from "../components/Description";
import { ScrollView } from "react-native";
import CommentsBlock from "../components/CommentsBlock";
import ButtonLayouts from "../../layouts/buttonLayouts";
import ContactsBlock from "../components/ContactsBlock";
import Footer from "../components/Footer";
import MainBlock from "../components/MainBlock";
import { useStateHouse } from "../../context/stateHouseContext";
import Loading from "../../ui/Loading";
import { useСondition } from "../../context/stateContext";

const HouseDetail = ({ route }) => {
  const { deLoading, param, resident, detail, getDetail } = useStateHouse();
  const { id, complex_id } = route.params;
  const navigation = useNavigation();
  const { userData } = useСondition();
  useEffect(() => {
    getDetail({ id: id, complex_id });
  }, [id, complex_id]);
  if (deLoading) {
    return <Loading />;
  }
  const dataImage =
    !deLoading &&
    detail.properties_pictures.map((el) => {
      return {
        image: el.pictures.big,
      };
    });
  const routeTo = () => {
    navigation.navigate("HouseScreens", {
      screen: "HouseResidentialProfile",
    });
  };
  const type = param?.type?.filter((obj) => {
    return obj.id == detail.type_id;
  })[0];
  const category = param?.category?.filter((obj) => {
    return obj.id == detail.category;
  })[0];
  const rooms = param?.rooms?.filter((obj) => {
    return obj.id == detail.rooms;
  })[0];
  const title = `${type?.name ? `${type.name}` : ""}${
    category?.name ? ` • ${category.name}` : ""
  }${
    rooms?.name
      ? rooms?.id >= 6
        ? ` • ${rooms?.name}`
        : ` • ${rooms?.name}-комн.,`
      : ""
  } ${detail.square}м²${
    detail.floor == -1
      ? ", цоколь"
      : detail.floor == -2
      ? ", подвал"
      : detail.floor > 1
      ? `, ${detail.floor}-этаж из ${detail.floors}`
      : ""
  }`;
  const getAttributeName = (paramList, id) => {
    return paramList
      ?.map((obj) => (obj.id === id ? obj.name : null))
      .filter(Boolean);
  };
  const owner_type = getAttributeName(param?.owner_type, detail.owner_type);
  const room_count = getAttributeName(param?.rooms, detail.rooms);
  const building_type = getAttributeName(param?.building_type, detail.building_type);
  const condition = getAttributeName(param?.condition, detail.condition);
  const heating = getAttributeName(param?.heating, detail.heating);
  const internet = getAttributeName(param?.internet, detail.internet);
  const toilet = getAttributeName(param?.toilet, detail.toilet);
  const gas = getAttributeName(param?.gas, detail.gas);
  const door = getAttributeName(param?.door, detail.door);
  const parking = getAttributeName(param?.parking, detail.parking);
  const furniture = getAttributeName(param?.furniture, detail.furniture);
  const flooring = getAttributeName(param?.flooring, detail.flooring);
  const ceiling_height = getAttributeName(param?.ceiling_height, detail.ceiling_height);

  const characteristicData = [
    {
      name: "Тип предложения",
      value: owner_type,
    },
    {
      name: "Количество комнат",
      value: room_count,
    },
    {
      name: "Год постройки",
      value: detail.year,
    },
    {
      name: "Тип строения",
      value: building_type,
    },
    {
      name: "Этаж",
      value: detail.floor,
    },
    {
      name: "Площадь",
      value: detail.square,
    },
    {
      name: "Состояние",
      value: condition,
    },
    {
      name: "Отопление",
      value: heating,
    },
    {
      name: "Телефон",
      value: detail.user.phone,
    },
    {
      name: "Интернет",
      value: internet,
    },
    {
      name: "Санузел",
      value: toilet,
    },
    {
      name: "Газ",
      value: gas,
    },
    {
      name: "Входная дверь",
      value: door,
    },
    {
      name: "Парковка",
      value: parking,
    },
    {
      name: "Мебель",
      value: furniture,
    },
    {
      name: "Пол",
      value: flooring,
    },
    {
      name: "Высота потолков",
      value: ceiling_height,
    },
  ].filter((item) => item.value && item.value.length > 0);

  console.log(detail.complex_id, 'complex')
  console.log(detail.id, 'idc')
  

  return (
    <ButtonLayouts>
      <Container none={true} phon={true}>
      <Header id={detail.id} love={true} back={true} container={true} home={true} likes={detail.is_liked}/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Column gap={4}>
            <MainBlock
              img={dataImage}
              title={title}
              priceUSD={detail?.prices[1]?.price}
              priceSom={detail?.prices[0]?.price}
              miniPriceUSD={detail?.prices[1]?.m2_price}
              miniPriceSom={detail?.prices[0]?.m2_price}
              house={true}
              address={`Бишкек`}
              street={`${detail?.street ? detail?.street : ""} ${
                detail?.crossing ? detail?.crossing : ""
              }`}
              time={""}
              vip={detail?.is_vip}
              addHours={`Добавлено ${detail.added_at} назад`}
              eye={detail?.views}
              heart={detail?.likes}
              comment={detail?.count_comments}
            />
            {!resident.length == 0 && (
              <AccountBlock
                title="Жилой комплекс"
                name={resident?.complex_name}
                nameColor={colors.blue}
                stars={1}
                rates="0000"
                reviews="0000"
                description={resident?.address}
                ava={resident?.images[0]?.image_url}
                handle={routeTo}
              />
            )}
              <Characteristic
                data={characteristicData}
                keyOne={"name"}
                keyTwo={"value"}
              />
            {/* {detail.safety.length > 0 && (
              <Additionally
                title={"Дополнительно"}
                data={[
                  {
                    name: "Мультимедиа",
                    data: [
                      { text: "Android Auto" },
                      { text: "CarPlay" },
                      { text: "Аудиоподготовка" },
                    ],
                  },
                  {
                    name: "Интерьер",
                    data: [{ text: "Android Auto" }, { text: "CarPlay" }],
                  },
                  {
                    name: "Безопасность",
                    data: [{ text: "CarPlay" }, { text: "Аудиоподготовка" }],
                  },
                ]}
              />
            )} */}
            <Description
              text={detail?.description}
              point={detail?.point.coordinates}
            />
            <ProfileBlock
              name={detail?.user?.name}
              stars={1}
              rates={detail?.user?.avarage_rating}
              reviews={detail?.user?.review_count}
              description={`${detail?.user?.accommodation_count} объявления`}
              ava={detail.user._avatar}
              handle={() =>
                navigation.navigate("HousePrivateProfile", {
                  id: detail.user.id,
                })
              }
            />
            <CommentsBlock
              data={[
                {
                  id: 1,
                  ava: "https://www.perunica.ru/uploads/posts/2019-09/1567597236_021.jpg",
                  name: "Санжар",
                  text: "Здравствуйте, а есть черного цвета?😁",
                  date: "2024-10-05T19:51:41.363Z",
                  answer: true,
                  replies: [
                    {
                      id: 2,
                      ava: "https://www.perunica.ru/uploads/posts/2019-09/1567597236_021.jpg",
                      name: "Нурзида",
                      text: "Ради вас покрасим на черный🗿",
                      date: "2024-11-01T19:51:41.363Z",
                      answer: true,
                    },
                    {
                      id: 3,
                      ava: "https://www.perunica.ru/uploads/posts/2019-09/1567597236_021.jpg",
                      name: "Нурзида",
                      text: "Ради вас покрасим на черный🗿",
                      date: "2024-11-01T19:51:41.363Z",
                      answer: true,
                    },
                    {
                      id: 3,
                      ava: "https://www.perunica.ru/uploads/posts/2019-09/1567597236_021.jpg",
                      name: "Нурзида",
                      text: "Ради вас покрасим на черный🗿",
                      date: "2024-11-01T19:51:41.363Z",
                      answer: true,
                    },
                  ],
                },
              ]}
            />
            <ContactsBlock
              data={[
                {
                  phone: "+996 (502) 80-02-02",
                },
                {
                  phone: "+996 (502) 80-02-02",
                },
                {
                  phone: "+996 (502) 80-02-02",
                },
              ]}
              keyValue={"phone"}
            />
           <Footer my={detail?.user?.id == userData?.id} postId={id} />
          </Column>
        </ScrollView>
      </Container>
    </ButtonLayouts>
  );
};

export default HouseDetail;
