import React, { useEffect, useState } from "react";
import Container from "../../assets/styles/components/Container";
import Header from "../../components/Header";
import Column from "../../assets/styles/components/Column";
import Wrapper from "../../assets/styles/components/Wrapper";
import { Image, ScrollView, StyleSheet, TextInput, View } from "react-native";
import Flex from "../../assets/styles/components/Flex";
import TextContent from "../../assets/styles/components/TextContent";
import { colors } from "../../assets/styles/colors";
import Wave from "../../customs/Wave";
import { useNavigation } from "@react-navigation/native";
import { url } from "../../api/api";
import Loading from "../../ui/Loading";
import Search from '../../assets/svg/search'

const CarBusinessList = () => {
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const fetchData = async () => {
    try {
      const response = await url.get("main/dealer/?type_dealer=car");
      setBusiness(response.data); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container none={true} phon={true}>
      <Header container={true} back={true}>
        Автобизнес
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Column gap={6}>
          <Wrapper top={true} bottom={true} padding={[16, 16]}>
            <View style={stylesList.input_block}>
         <Search/>
         <TextInput
              style={stylesList.input_search}
              placeholder="Поиск"
              placeholderTextColor={colors.gray}
            />
            </View>
          </Wrapper>
          <Wrapper padding={[16, 16]}>
            <TextContent fontSize={20} fontWeight={600} color={colors.black}>
              Официальные дилеры
            </TextContent>
            {business.length === 0 ? (
              <Loading color={colors.blue} /> 
            ) : (
              <Column gap={16} style={{ marginTop: 16 }}>
                {business
                  .filter((obj) => obj.is_verified === true)
                  .map((item) => (
                    <Wave
                      handle={() =>
                        navigation.navigate("CarBusinessProfile", {
                          id: item.id,
                        })
                      }
                      key={item.id}
                    >
                      <Flex
                        gap={10}
                        style={{ alignItems: "flex-start", height: 100 }}
                      >
                        <Image
                          source={{ uri: item.logo_path }}
                          style={stylesList.img_list}
                        />
                        <View style={stylesList.box_text}>
                          <Column gap={3}>
                            <TextContent
                              fontSize={16}
                              fontWeight={600}
                              color={colors.black}
                            >
                              {item?.name}
                            </TextContent>
                            <TextContent
                              fontSize={14}
                              fontWeight={400}
                              color={colors.gray}
                            >
                              {item?.address}
                            </TextContent>
                          </Column>
                          <TextContent
                            fontSize={12}
                            fontWeight={400}
                            color={colors.gray}
                          >
                            {item?.ads_count} объявления
                          </TextContent>
                        </View>
                      </Flex>
                    </Wave>
                  ))}
              </Column>
            )}
          </Wrapper>
          <Wrapper padding={[16, 16]}>
            <TextContent fontSize={20} fontWeight={600} color={colors.black}>
              Автобизнес
            </TextContent>
            {business.length === 0 ? (
              <Loading color={colors.blue} /> 
            ) : (
              <Column gap={16} style={{ marginTop: 16 }}>
                {business
                  .filter((obj) => obj.is_verified === false)
                  .map((item) => (
                    <Wave
                      handle={() =>
                        navigation.navigate("CarScreens", {
                          screen: "CarBusinessProfile",
                        })
                      }
                      key={item?.id}
                    >
                      <Flex
                        gap={10}
                        style={{ alignItems: "flex-start", height: 100 }}
                      >
                        <Image
                          source={{ uri: item?.logo_path }}
                          style={stylesList.img_list}
                        />
                        <View style={stylesList.box_text}>
                          <Column gap={3}>
                            <TextContent
                              fontSize={16}
                              fontWeight={600}
                              color={colors.black}
                            >
                              {item?.name}
                            </TextContent>
                            <TextContent
                              fontSize={14}
                              fontWeight={400}
                              color={colors.gray}
                            >
                              {item?.address}
                            </TextContent>
                          </Column>
                          <TextContent
                            fontSize={12}
                            fontWeight={400}
                            color={colors.gray}
                          >
                            {item?.ads_count} объявления
                          </TextContent>
                        </View>
                      </Flex>
                    </Wave>
                  ))}
              </Column>
            )}
          </Wrapper>
        </Column>
      </ScrollView>
    </Container>
  );
};

const stylesList = StyleSheet.create({
  box_text: {
    width: "70%",
    height: "100%",
    justifyContent: "space-between",
  },
  img_list: {
    width: 100,
    height: "100%",
    borderRadius: 8,
  },
  input_search: {
    backgroundColor: colors.phon,
    paddingHorizontal: 10,
  },
  input_block :{
    width: "100%",
    height: 50,
    marginBottom: 16,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.phon,
    flexDirection:'row',
    alignItems:'center',
    borderRadius: 50,
  }
});

export default CarBusinessList;
