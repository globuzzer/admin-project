import { useState, useEffect } from "react";
import { firestore } from "../utils/firebase.utils";

export const useFetchHeader = (cityId) => {
  const [currentCity, setCurrentCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState({});
  const [fetchedTexts, setFetchedTexts] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const getCurrentCity = async () => {
      const doc = await firestore.collection('section_items').doc(cityId).get();
      if (!doc.exists) {
        setLoading(true);
      } else {
        setLoading(false);
        setCurrentCity(doc.data());
        setBanner(doc.data().banner);
        setFetchedTexts(doc.data().banner.texts);
        setPlaces(doc.data().banner.places);
      }
    };
    getCurrentCity();
  }, [cityId]);
  return {
    currentCity,
    loading,
    banner,
    fetchedTexts,
    places
  };
};
