import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { url } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StateCarContext = createContext();
const initialFilterState = {
region: { id: 1, name: "Чуйская область"},
  mark: { id: 0, name: "Любой" },
  model: { id: 0, name: "Любой" },
  generation: { id: 0, name: "Любой" },
  category: { id: 0, name: "Любой" },
  car_condition: { id: 0, name: "Любой" },
  currency: { id: 0, name: "Любой" },
  color: { id: 0, name: "Любой" },
  gear_box: { id: 0, name: "Любой" },
  media: { id: 0, name: "Любой" },
  other_option: { id: 0, name: "Любой" },
  featured_option: { id: 0, name: "Любой" },
  transmission: { id: 0, name: "Любой" },
  exchange: { id: 0, name: "Любой" },
  steering_wheel: { id: 0, name: "Любой" },
  interior: { id: 0, name: "Любой" },
  exterior: { id: 0, name: "Любой" },
  configuration: { id: 0, name: "Любой" },
  comment_allowed: { id: 0, name: "Любой" },
  car_type: { id: 0, name: "Любой" },
  fuel: { id: 0, name: "Любой" },
  year: "",
  ceiling_height: "",
  mileage: "",
  is_urgent: false,
  price: "",
  price: "ihs",
};
const initialFilterStateAdd = {
  car_condition: { id: 0, name: "Любой" },
  other_option: { id: 0, name: "Любой" },
  currency: { id: 0, name: "Любой" },
  color: { id: 0, name: "Любой" },
  exchange: { id: 0, name: "Любой" },
  registration_country: { id: 0, name: "Любой"},
  comment_allowed: { id: 0, name: "Любой" },
  featured_option: { id: 0, name: "Любой" },
  region: { id: 1, name: "Чуйская область" },
  town: { id: 2, name: "Бишкек" },
};

export const StateCarProvider = ({ children }) => {
  const [recomention, setRecomention] = useState([]);
  const [reLoading, setReLoading] = useState(true);
  const [param, setParam] = useState([]);
  const [paLoading, setPaLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const [deLoading, setDeLoading] = useState(true);
  const [paramAdd, setParamAdd] = useState([]);
  const [filter, setFilter] = useState(initialFilterState);
  const [carAdd, setCarAdd] = useState(initialFilterStateAdd);
  const [proLoading, setProLoading] = useState(false);
  const [markData, setMarkData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [generationData, setGenerationData] = useState([]);
  useEffect(() => {
    getResult();
  }, [filter]);

  const fetchmark = async () => {
    try {
      const response = await url.get(`/cars-data/parameters/`);
      setMarkData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchmark();
  }, []);
  const fetchmodel = async () => {
    try {
      const response = await url.get(
        `/cars-data/parameters/?mark=${filter.mark.id}`
      );
      setModelData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (filter.mark.id > 0) {
      fetchmodel();
    }
  }, [filter.mark]);
  const fetchgeneration = async () => {
    try {
      const response = await url.get(
        `/cars-data/parameters/?mark=${filter.mark.id}&model=${filter.model.id}`
      );
      setGenerationData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (filter.model.id > 0) {
      fetchgeneration();
    }
  }, [filter.model]);

  console.log(carAdd, "Added ihsan");
  const getResult = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");
    const headers = token ? { Authorization: `Token ${token}` } : {};
    const queryParams = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (typeof value === "object" && value.name !== "Любой") {
        queryParams.append(key, value.id);
      } else if (typeof value === "boolean") {
        queryParams.append(key, value);
      } else if (typeof value === "string" && value !== "") {
        queryParams.append(key, value);
      }
    });

    setLoading(true);
    try {
      const response = await url.get(`/cars/cars-posts/?${queryParams.toString()}`, { headers });
      setResult(response.data.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  }, [filter]);
  const postProduct = async (navigation) => {
    setProLoading(true);
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      alert('Требуется авторизация');
      setProLoading(false);
      return;
    }

    const formData = new FormData();
    Object.entries(carAdd).forEach(([key, value]) => {
      if (key !== 'pictures') {
        if (Array.isArray(value) && value.length > 0) {
          value.forEach(id => formData.append(key, id));
        } else if (value && value.id) {
          formData.append(key, value.id);
        } else if (typeof value === "boolean") {
          formData.append(key, value ? 1 : 0);
        } else if (typeof value === "string" && value.trim() !== "") {
          formData.append(key, value.trim());
        } else if (typeof value === "number") {
          formData.append(key, value);
        }
      }
    });
    if (carAdd.pictures && carAdd.pictures.length > 0) {
      carAdd.pictures.forEach((photo) => {
        if (photo?.uri) {
          formData.append('pictures', {
            uri: photo.uri,
            type: 'image/jpeg',
            name: 'photo.jpg',
          });
        }
      });
    }
    try {
      const response = await url.post('/cars/cars-posts/', formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        const carId = response.data.id;
        console.log("Добавленный ID:", carId);
        alert('Объявление успешно добавлено', 'Успешно');
        navigation.navigate('Tariffs', { carId });
      }
    } catch (error) {
      console.error('Error posting product:', error);
      alert('Ошибка при отправке объявления: ' + (error.response?.data?.message || error.message));
    } finally {
      setProLoading(false);
    }
  };

  const getCarRecomention = async () => {
    const token = await AsyncStorage.getItem("token");
    const header = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    setReLoading(true);
    try {
      const response = await url.get("cars/cars-posts/", header);
      setRecomention(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setReLoading(false);
    }
  };
  const getParam = async () => {
    setPaLoading(true);
    try {
      const response = await url.get("cars-data/public/data/");
      setParam(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setPaLoading(false);
    }
  };
  const getDetail = async ({ id }) => {
    setDeLoading(true);
    try {
      const response = await url.get(`/cars/cars-posts/${id}`);
      setDetail(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setDeLoading(false);
    }
  };

  useEffect(() => {
    getParam();
    getCarRecomention();
  }, []);
  return (
    <StateCarContext.Provider
      value={{
        postProduct,
        getCarRecomention,
        proLoading,
        recomention,
        reLoading,
        param,
        paLoading,
        getResult,
        result,
        loading,
        getDetail,
        detail,
        deLoading,
        setFilter,
        filter,
        setCarAdd,
        carAdd,
        markData,
        modelData,
        generationData,
      }}
    >
      {children}
    </StateCarContext.Provider>
  );
};
export const useStateCar = () => useContext(StateCarContext); 