import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { url } from "../api/api";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomAlert } from "../ui/Alert";

const StateHouseContext = createContext();

const initialFilterState = {
  region: { id: 1, name: "Чуйская область / Бишкек" },
  town: { id: 0, name: "Любой" },
  category: { id: 0, name: "Любой" },
  rooms: { id: 0, name: "Любой" },
  currency: { id: 0, name: "Любой" },
  floor: { id: 0, name: "Любой" },
  floors: { id: 0, name: "Любой" },
  floors_not_end: false,
  floors_last: false,
  serie: { id: 0, name: "Любой" },
  condition: { id: 0, name: "Любой" },
  heating: { id: 0, name: "Любой" },
  furniture: { id: 0, name: "Любой" },
  building_type: { id: 0, name: "Любой" },
  ceiling_height: "",
  square: "",
  land_square: "",
  living_square: "",
  kitchen_square: "",
  is_urgent: false,
  picture_exists: false,
  video_exists: false,
  exchange: false,
  installment: false,
  mortgage: false,
  owner_type: { id: 0, name: "Любой" },
  document: { id: 0, name: "Любой" },
  type_id: { id: 0, name: "Любой" },
  price: "",
};

const initialFilterStateAdd = {
  commercial_type: { id: 0, name: "Любой" },
  building_id: { id: 0, name: "Любой" },
  material: { id: 0, name: "Любой" },
  floor: { id: 0, name: "Любой" },
  floors: { id: 0, name: "Любой" },
  condition: { id: 0, name: "Любой" },
  heating: { id: 0, name: "Любой" },
  phone_info: { id: 0, name: "Любой" },
  internet: { id: 0, name: "Любой" },
  safety: { id: 0, name: "Любой" },
  document: { id: 0, name: "Любой" },
  rooms: { id: 0, name: "Любой" },
  serie: { id: 0, name: "Любой" },
  building_type: { id: 0, name: "Любой" },
  balkony: { id: 0, name: "Любой" },
  door: { id: 0, name: "Любой" },
  parking: { id: 0, name: "Любой" },
  internet: { id: 0, name: "Любой" },
  toilet: { id: 0, name: "Любой" },
  canalization: { id: 0, name: "Любой" },
  gas: { id: 0, name: "Любой" },
  water: { id: 0, name: "Любой" },
  furniture: { id: 0, name: "Любой" },
  flooring: { id: 0, name: "Любой" },
  safety: { id: 0, name: "Любой" },
  flat_options: { id: 0, name: "Любой" },
  year: "",
  square: "",
  land_square: "",
  living_square: "",
  kitchen_square: "",
  ceiling_height: "",
  description: "",
  phone_info: "",
  ceiling_height: "",
  region: { id: 1, name: "Чуйская область / Бишкек" },
  town: { id: 0, name: "Любой" },
  district: { id: 0, name: "Любой" },
  currency: { id: 0, name: "Любой" },
  installment: { id: 0, name: "Любой" },
  mortgage: { id: 0, name: "Любой" },
  exchange: { id: 0, name: "Любой" },
  owner_type: { id: 0, name: "Любой" },
  cadastre_number: "",
  house_number: "",
  street: "",
  crossing: "",
  youtube_url: "",
  price: "",
  type_id: "",
  category: "",
};

export const StateHouseProvider = ({ children }) => {
  const [recomention, setRecomention] = useState([]);
  const [reLoading, setReLoading] = useState(true);
  const [param, setParam] = useState([]);
  const [paramLoad, setParamLoad] = useState([]);
  const [paramAdd, setParamAdd] = useState([]);
  const [paLoading, setPaLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const [deLoading, setDeLoading] = useState(true);
  const [resident, setResident] = useState([]);
  const [addHouse, setAddHouse] = useState(initialFilterStateAdd);
  const [filter, setFilter] = useState(initialFilterState);
  const [proLoading, setProLoading] = useState(false);
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    getResult();
  }, [filter, getResult]);

  const getBuildings = async () => {
    try {
      const response = await url.get("house/buildings/");
      setBuildings(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const reset = () => {
    setAddHouse(initialFilterStateAdd);
  };
  const getResult = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");
    const headers = token ? { Authorization: `Token ${token}` } : {};

    const queryParams = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (typeof value === "object" && value.name !== "Любой") {
        queryParams.append(key, value.id);
      } else if (typeof value === "boolean" && value == true) {
        queryParams.append(key, value);
      } else if (typeof value === "string" && value !== "") {
        queryParams.append(key, value);
      }
    });
    console.log(queryParams.toString(), "datas");
    try {
      setLoading(true);
      const response = await url.get(`house/ads/?${queryParams.toString()}`, {
        headers,
      });

      setResult(response.data.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    getBuildings();
    getParam();
    getParamAdd();
    getRecomention();
  }, []);

  const postProduct = async () => {
    setProLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");
      const headers = token ? { Authorization: `Token ${token}` } : {};

      const formData = {};
      Object.entries(addHouse).forEach(([key, value]) => {
        if (typeof value === "object" && value.name !== "Любой") {
          formData[key] = value.id;
        } else if (typeof value === "boolean") {
          formData[key] = value;
        } else if (typeof value === "string" && value.trim() !== "") {
          formData[key] = value.trim();
        } else if (typeof value === "number") {
          formData[key] = value;
        }
      });
      console.log("Отправляемые данные:", formData);
      const response = await url.post("house/ads/", formData, { headers });
      if (response.status == 201) {
        CustomAlert({
          type: "success",
          title: "Успешно",
          text: "обьявление успешно добавлено",
        });
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
      setProLoading(false);
    }
  };

  const getRecomention = async () => {
    const token = await AsyncStorage.getItem("token");
    const header = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    try {
      setReLoading(true);
      const response = await url.get("house/ads/", header);
      console.log(response.data.data);
      setRecomention(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setReLoading(false);
    }
  };

  const getParamAdd = async () => {
    setPaLoading(true);
    try {
      const response = await url.get("house/public/data/?region=3");
      setParam(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setPaLoading(false);
    }
  };
  const getParam = async ({ type_id, category }) => {
    setParamLoad(true);
    try {
      const response = await url.get(
        `/house/param/?type_id=${type_id}&category=${category}`
      );
      setAddHouse({ ...addHouse, type_id: type_id, category: category });
      setParamAdd(response.data.available_fields);
    } catch (error) {
      console.log(error);
    } finally {
      setParamLoad(false);
    }
  };
  const getDetail = async ({ id, complex_id }) => {
    setDeLoading(true);
    try {
      const response = await url.get(`house/ads/${id}`);
      setDetail(response.data);
      const responseTwo = await url.get(`house/${complex_id}/buildings`);
      setResident(responseTwo.data);
    } catch (error) {
      console.log(error);
    } finally {
      setDeLoading(false);
    }
  };
  return (
    <StateHouseContext.Provider
      value={{
        // AddProduct
        postProduct,
        proLoading,
        // Recomention
        recomention,
        reLoading,
        // Param
        param,
        paLoading,
        // Rusult
        getResult,
        result,
        loading,
        // Detail
        resident,
        getDetail,
        detail,
        deLoading,
        // StateForAdd
        setAddHouse,
        addHouse,
        // StateForFilter
        setFilter,
        filter,
        reset,
        paramAdd,
        // getParam
        getParam,
        paramLoad,
        // buildings
        buildings,
        getRecomention
      }}
    >
      {children}
    </StateHouseContext.Provider>
  );
};

export const useStateHouse = () => useContext(StateHouseContext);
