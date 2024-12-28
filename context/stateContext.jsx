import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { url } from "../api/api";

const СonditionContext = createContext();
export const СonditionProvider = ({ children }) => {
  const [condition, setСondition] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myFavorite, setMyFavorite] = useState([]);
  const [loadFavorite, setLoadFavorite] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [hasFavorite, setHasFavorite] = useState(false);
  const [favoriteDetail, setFavoriteDetail] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await url.get("auth/accounts/me/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getFavoite = async () => {
    try {
      setLoadFavorite(true);
      const token = await AsyncStorage.getItem("token");
      const response = await url.get("main/like/my_favorites/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setMyFavorite(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadFavorite(false);
    }
  };
  useEffect(() => {
    getFavoite();
    fetchData();
  }, []);
  const CarActive = () => {
    setСondition(false);
  };
  const HouseActive = () => {
    setСondition(true);
  };
  return (
    <СonditionContext.Provider
      value={{
        favoriteDetail,
        setFavoriteDetail,
        hasFavorite, 
        setHasFavorite,
        hasChanges, 
        setHasChanges,
        fetchData,
        condition,
        CarActive,
        HouseActive,
        setUserData,
        userData,
        loading,
        getFavoite,
        myFavorite,
        loadFavorite,
      }}
    >
      {children}
    </СonditionContext.Provider>
  );
};

export const useСondition = () => useContext(СonditionContext);
