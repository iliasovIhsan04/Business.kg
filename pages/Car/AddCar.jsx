import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  Image,
  Switch,
  ScrollView,
} from "react-native";
import Container from "../../assets/styles/components/Container";
import Back from "../../assets/svg/back";
import { useNavigation } from "@react-navigation/native";
import { url } from "../../api/api";
import Loading from "../../ui/Loading";
import ChekMark from "../../assets/svg/chekMark";
import { colors } from "../../assets/styles/colors";
import InputSelect from "../../customs/InputSelect";
import ButtonLayouts from "../../layouts/buttonLayouts";
import InputSelectAdd from "../../customs/inputSelectAdd";
import { useStateCar } from "../../context/stateCarContext";
import * as ImagePicker from "expo-image-picker";
import Info from "./../../assets/svg/ilep";
import Flex from "../../assets/styles/components/Flex";
import TextContent from "../../assets/styles/components/TextContent";
import Column from "../../assets/styles/components/Column";
import * as ImageManipulator from "expo-image-manipulator";

const AddCar = () => {
  const [currentStep, setCurrentStep] = useState("mark");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { carAdd, setCarAdd, postProduct, proLoading } = useStateCar();
  const navigation = useNavigation();
  const [photos, setPhotos] = useState([]);
  const [tempInputs, setTempInputs] = useState({
    video_url: "",
    price: "",
    description: "",
    car_chek: "",
    mileage: "",
    mileage_unit: "km",
  });
  const stepTitles = {
    mark: "Марка",
    model: "Модель",
    year: "Год выпуска",
    serie: "Серия",
    generation: "Поколение",
    fuel: "Тип топлива",
    transmission: "Трансмиссия",
    gear_box: "Коробка передач",
    modification: "Модификация",
    steering_wheel: "Руль",
    options: "Опции",
    image: "Детали",
  };
  const steps = Object.keys(stepTitles);
  const fetchStepData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(
        Object.entries(carAdd)
          .filter(([key, value]) => value !== null && value.id)
          .reduce((acc, [key, value]) => {
            acc[key] = value.id;
            return acc;
          }, {})
      );
      const response = await url.get(`/cars-data/parameters/?${params}`);
      console.log("API Response:", response.data); 

      if (Array.isArray(response.data.data)) {
        setOptions(
          response.data.data.map((item) =>
            typeof item === "number"
              ? { id: item, name: item.toString() }
              : item
          )
        );
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      alert("Ошибка при загрузке данных. Пожалуйста, попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const parameterSteps = [
      "mark",
      "model",
      "year",
      "serie",
      "generation",
      "fuel",
      "transmission",
      "gear_box",
      "modification",
      "steering_wheel",
    ];
    if (parameterSteps.includes(currentStep)) {
      fetchStepData();
    }
  }, [currentStep]);
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Извините, нам нужны разрешения на доступ к галерее!");
      }
    })();
  }, []);

  const handleSelect = (key, value) => {
    const selectedOption = options.find((item) => item.id === value);
    setCarAdd((prevState) => ({
      ...prevState,
      [key]: { id: value, name: selectedOption?.name || "" },
    }));
    if (key === "generation") {
      setCarAdd((prevState) => ({
        ...prevState,
        generation_id: value,
      }));
    } else if (key === "serie") {
      setCarAdd((prevState) => ({
        ...prevState,
        serie_id: value,
      }));
    }
    const parameterSteps = [
      "mark",
      "model",
      "year",
      "serie",
      "generation",
      "fuel",
      "transmission",
      "gear_box",
      "modification",
      "steering_wheel",
    ];
    const currentStepIndex = steps.indexOf(key);
    if (currentStepIndex < steps.length - 1 && parameterSteps.includes(key)) {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };
  const handleBack = () => {
    const currentStepIndex = steps.indexOf(currentStep);
    if (currentStepIndex === 0) {
      setCarAdd({});
      navigation.navigate("MainScreen");
    } else if (currentStep === "model") {
      setLoading(true);
      setCarAdd({});
      setCurrentStep("mark");
      fetchStepData();
    } else {
      const previousStep = steps[currentStepIndex - 1];
      setCarAdd((prevState) => {
        const updatedState = { ...prevState };
        delete updatedState[currentStep];
        delete updatedState[previousStep];
        return updatedState;
      });
      setCurrentStep(previousStep);
    }
  };

  const handleReset = () => {
    setCarAdd({});
    setCurrentStep("mark");
  };
  const renderProgressBar = () => {
    const currentStepIndex = steps.indexOf(currentStep);
    return (
      <View style={styles.progressBarContainer}>
        {steps.map((step, index) => (
          <View
            key={step}
            style={[
              styles.progressBarStep,
              index <= currentStepIndex && styles.progressBarStepActive,
            ]}
          />
        ))}
      </View>
    );
  };

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Нужно разрешение на доступ к галерее");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.5,
        aspect: [4, 3],
        base64: false,
      });
      if (!result.canceled) {
        const newPhotos = result.assets.map((asset) => asset.uri);
        setPhotos((prev) => [...prev, ...newPhotos].slice(0, 4));
        const picturesArray = await Promise.all(
          result.assets.map(async (asset) => {
            const manipulatedImage = await ImageManipulator.manipulateAsync(
              asset.uri,
              [{ resize: { width: 800 } }],
              { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
            );
            return {
              uri: manipulatedImage.uri,
              type: "image/jpeg",
              name: "photo.jpg",
            };
          })
        );
        setCarAdd((prev) => ({
          ...prev,
          pictures: [...(prev.pictures || []), ...picturesArray].slice(0, 4),
        }));

        console.log("Photos added:", picturesArray.length);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Ошибка при выборе изображения");
    }
  };
  const removePhoto = (index) => {
    try {
      setPhotos((prev) => {
        const newPhotos = [...prev];
        newPhotos.splice(index, 1);
        return newPhotos;
      });
      setCarAdd((prev) => {
        const newPictures = [...(prev.pictures || [])];
        newPictures.splice(index, 1);
        return {
          ...prev,
          pictures: newPictures,
        };
      });
    } catch (error) {
      console.error("Error removing photo:", error);
    }
  };

  const handleTextInput = (field, text) => {
    setCarAdd((prev) => ({
      ...prev,
      [field]: text,
    }));
  };

  const handleInputBlur = (field) => {
    setCarAdd((prev) => ({
      ...prev,
      [field]: tempInputs[field],
    }));
  };
  const handleMileageUnitChange = (unit) => {
    setTempInputs((prev) => ({
      ...prev,
      mileage_unit: unit,
    }));
    setCarAdd((prev) => ({
      ...prev,
      mileage_unit: unit,
    }));
  };
  const handleSubmit = async () => {
    await postProduct(navigation);
  };
  const renderStep = () => (
    <View style={styles.stepContainer}>
      {loading ? (
        <Loading color={colors.blue} />
      ) : currentStep === "options" ? (
        <ButtonLayouts
          title="Далее"
          color={colors.blue}
          handle={() => setCurrentStep("image")}
        >
          <Column gap={8}>
            <InputSelect
              select={true}
              label="Выберите цвет"
              value="color"
              car={true}
              add={true}
            />
            <InputSelectAdd label="Комплектация" select={true} />
            <InputSelect
              select={true}
              label="Состояние"
              value="car_condition"
              car={true}
              add={true}
            />
            <View style={styles.mileage_box}>
              <InputSelect
                value={tempInputs.mileage || carAdd.mileage}
                onChangeText={(text) => handleTextInput("mileage", text)}
                onBlur={() => handleInputBlur("mileage")}
                placeholder="Пробег"
                car={true}
                add={true}
              />
              <View style={styles.mileage_btn}>
                <TouchableOpacity
                  style={
                    tempInputs.mileage_unit === "km"
                      ? styles.mileage_index_active
                      : styles.mileage_index
                  }
                  onPress={() => handleMileageUnitChange("km")}
                >
                  <TextContent
                    fontSize={14}
                    fontWeight={500}
                    color={
                      tempInputs.mileage_unit === "km"
                        ? colors.white
                        : colors.black
                    }
                  >
                    км
                  </TextContent>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    tempInputs.mileage_unit === "mi"
                      ? styles.mileage_index_active
                      : styles.mileage_index
                  }
                  onPress={() => handleMileageUnitChange("mi")}
                >
                  <TextContent
                    fontSize={14}
                    fontWeight={500}
                    color={
                      tempInputs.mileage_unit === "mi"
                        ? colors.white
                        : colors.black
                    }
                  >
                    мили
                  </TextContent>
                </TouchableOpacity>
              </View>
            </View>
            <Flex
              style={{
                height: 50,
                borderBottomWidth: 1,
                borderBottomColor: colors.gray,
                justifyContent: "space-between",
              }}
            >
              <TextContent fontSize={16} fontWeight={400} color={colors.gray}>
                Растоможен
              </TextContent>
              <Switch
                value={carAdd.hideNumber}
                onValueChange={(value) =>
                  setCarAdd((prev) => ({ ...prev, hideNumber: value }))
                }
              />
            </Flex>
            <InputSelect
              select={true}
              label="Учет"
              value="registration_country"
              car={true}
              add={true}
            />
            <InputSelect
              select={true}
              label="Наличие"
              value="featured_option"
              car={true}
              add={true}
            />
            <InputSelect
              select={true}
              label="Возможность обмен"
              value="exchange"
              car={true}
              add={true}
            />
          </Column>
        </ButtonLayouts>
      ) : currentStep === "image" ? (
        <ButtonLayouts
          title="Подать объявление"
          color={colors.green}
          handle={() => handleSubmit(navigation)}
          loading={proLoading}
        >
          <ScrollView style={{ flex: 1 }}>
            <Column style={{ marginBottom: 200 }}>
              <View style={styles.photoSection}>
                <View style={styles.photoGrid}>
                  {photos.map((photo, index) => (
                    <View key={index} style={styles.photoContainer}>
                      <Image
                        source={{ uri: photo }}
                        style={styles.photoPreview}
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        style={styles.removePhoto}
                        onPress={() => removePhoto(index)}
                      >
                        <Text style={styles.removePhotoText}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                  {photos.length < 4 && (
                    <TouchableOpacity
                      style={styles.addPhotoButton}
                      onPress={pickImage}
                    >
                      <TextContent
                        fontSize={12}
                        fontWeight={500}
                        color={colors.blue}
                        style={styles.addPhotoText}
                      >
                        + Добавить фото
                      </TextContent>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <Flex>
                <Info />
                <TextContent
                  fontSize={12}
                  fontWeight={400}
                  color={colors.gray}
                  style={styles.infoText}
                >
                  Автоматически скрыть госномер на фотографих
                </TextContent>
                <Switch
                  value={carAdd.hideNumber}
                  onValueChange={(value) =>
                    setCarAdd((prev) => ({ ...prev, hideNumber: value }))
                  }
                />
              </Flex>
              <InputSelect
                value={tempInputs.video_url || carAdd.video_url}
                onChangeText={(text) => handleTextInput("video_url", text)}
                onBlur={() => handleInputBlur("video_url")}
                placeholder="ссылка на Youtube"
                add={true}
                car={true}
              />
              <InputSelect
                select={true}
                label="Валюта"
                value="currency"
                placeholder="Выберите валюту"
                car={true}
                add={true}
              />
              <InputSelect
                value={tempInputs.price || carAdd.price}
                onChangeText={(text) => handleTextInput("price", text)}
                onBlur={() => handleInputBlur("price")}
                placeholder="цена"
                car={true}
                add={true}
              />
              <InputSelect
                select={true}
                label="Зарегистрирован"
                value="comment_allowed"
                placeholder="Выберите"
                car={true}
                add={true}
              />
              <InputSelect
                select={true}
                label="Регион"
                value="region"
                placeholder="Выберите регион"
                car={true}
                add={true}
              />
              <InputSelect
                select={true}
                label="Город"
                value="town"
                placeholder="Выберите город"
                car={true}
                add={true}
              />
              <InputSelect
                value={tempInputs.description || carAdd.description}
                onChangeText={(text) => handleTextInput("description", text)}
                onBlur={() => handleInputBlur("description")}
                placeholder="Текст обявления"
                car={true}
                add={true}
              />
              <Column gap={8}>
                <InputSelect
                  value={tempInputs.car_chek || carAdd.car_chek}
                  onChangeText={(text) => handleTextInput("car_chek", text)}
                  onBlur={() => handleInputBlur("car_chek")}
                  placeholder="VIN код"
                  car={true}
                  add={true}
                />
                <TextContent fontSize={12} fontWeight={400} color={colors.gray}>
                  Укажите VIN код или загрузите техпаспорт вашего автомобиля и
                  получите бонус 50 сом на баланс Mashina.kg
                </TextContent>
              </Column>
            </Column>
          </ScrollView>
        </ButtonLayouts>
      ) : (
        <FlatList
          data={options}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelect(currentStep, item.id)}
            >
              <View style={styles.itemContent}>
                {item.url_image && (
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: item.url_image }}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </View>
                )}
                <TextContent fontSize={16} fontWeight={400} color={colors.black}>{item.name}</TextContent>
                {carAdd[currentStep]?.id === item.id && <ChekMark />}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );

  return (
    <View style={styles.main_block}>
      <Container>
      <View style={styles.add_block}>
        {renderProgressBar()}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={handleBack}>
              <Back />
            </TouchableOpacity>
            <Text style={styles.currentStepTitle}>
              {stepTitles[currentStep]}
            </Text>
          </View>
          <TouchableOpacity onPress={handleReset}>
            <TextContent fontSize={16} fontWeight={400} color={colors.black}>Сбросить</TextContent>
          </TouchableOpacity>
        </View>
        {renderStep()}
      </View>
      </Container>
    </View>
  );
};
const styles = StyleSheet.create({
  mileage_index: {
    flex: 1,
    backgroundColor: colors.phon,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mileage_index_active: {
    flex: 1,
    backgroundColor: colors.black,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mileage_box: {
    width: "100%",
    position: "relative",
  },
  mileage_btn: {
    width: 130,
    height: 36,
    backgroundColor: colors.phon,
    borderRadius: 8,
    position: "absolute",
    right: 0,
    bottom: 1,
    zIndex: 1,
    padding: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 2,
  },
  main_block: {
    flex: 1,
    backgroundColor: colors.white,
  },
  add_block: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    backgroundColor: "#fff",
  },
  option_box: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    borderBottomColor: "#D0D0D0",
    borderBottomWidth: 1,
  },
  currentStepTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 20,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepContainer: {
    flex: 1,
  },
  item: {
    paddingBottom: 16,
  },
  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    gap: 4,
  },
  progressBarStep: {
    flex: 1,
    height: 4,
    marginTop: Platform.OS === "ios" ? 60 : 42,
    backgroundColor: "#ccc",
    borderRadius: 2,
  },
  progressBarStepActive: {
    backgroundColor: "#1B4DFC",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  imageContainer: {
    marginRight: 10,
    width: 24,
    height: 20,
    borderRadius: 25,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  photoSection: {
    marginBottom: 20,
  },
  photoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoText: {
    flex: 1,
    marginLeft: 8,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  photoContainer: {
    width: "48.5%",
    aspectRatio: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  photoPreview: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  removePhoto: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  removePhotoText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  addPhotoButton: {
    width: "48.5%",
    aspectRatio: 1,
    height: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.blue,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.phon,
  },
  addPhotoText: {
    textAlign: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
});

export default AddCar;
