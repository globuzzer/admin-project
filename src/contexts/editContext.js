import React, { createContext, useState, useEffect } from "react";
import { firestore } from "../utils/firebase.utils";
export const EditContext = createContext();

const EditContextProvider = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);

  //state for edit text community section
  const [showTextBox, setShowTextBox] = useState(false);
    const [headerJoinID, setHeaderJoinID] = useState(null);

  const [showTextForm, setShowTextForm] = useState(false);
  const [headerID, setHeaderID] = useState(null);

  const rawPlace = { text: "", color: "", link: "" };
  const rawText = {
    content: "",
    style: {
      color: "",
      fontSize: "",
      fontWeight: "",
      textAlign: "",
    },
  };
  const rawCommText = {
    heading: "",
    style: {
      color: "",
      fontSize: "",
      fontWeight: "",
      textAlign: "",
    },
  };

  const [fetchedTexts, setFetchedTexts] = useState([]);
  const [currentText, setCurrentText] = useState(rawText);

  const [places, setPlaces] = useState([]);
  const [currentPlace, setCurrentPlace] = useState(rawPlace);

  //state for heading and subheading for JoinCommunity
  const [communityText, setCommunityText] = useState([]);
  //state for storing and updating data in firebase
  const [commCurrentText, setCommCurrentText] = useState(rawCommText);

  // add red marks around editable content
  const editStyle = editMode
    ? {
        border: "2px solid #F26678",
        boxSizing: "border-box",
        borderRadius: "5px",
        padding: "8px",
      }
    : {};

  // fetch 'texts' content from db
  useEffect(() => {
    const getTexts = firestore.collection("texts").onSnapshot((snapshot) => {
      const newText = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFetchedTexts(newText);
      // console.log('new snapshot:', newText);
    });
    return () => getTexts();
  }, []);

  // fetch 'places' content from db
  useEffect(() => {
    const getPlaces = firestore.collection("places").onSnapshot((snapshot) => {
      const newPlace = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlaces(newPlace);
      // console.log('new place:', newPlace);
    });
    return () => getPlaces();
  }, []);

  //fetching data for heading and subheading for JoinCommunity from firestore
  useEffect(() => {
    const getCommunity = firestore
      .collection("community")
      .onSnapshot((snapshot) => {
        const newCommunity = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCommunityText(newCommunity);
        // console.log("community:", newCommunity);
      });
    return () => getCommunity();
  }, []);

  // change handler for place
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPlace({ ...currentPlace, [name]: value });
  };

  // change handler for text
  const handleChangeText = (e) => {
    // const { name, value } = e.target;
    setCurrentText({
      ...currentText,
      content: e.target.innerText,
      id: e.target.id,
    });
  };

  // change handler for Community text
  const handleCommChangeText = (e) => {
    // fetched data update for Join Community
    setCommCurrentText({
      ...commCurrentText,
      heading: e.target.innerText,
      id: e.target.id,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firestore.collection("places").doc(currentPlace.id).update(currentPlace);
  };

  const handleSubmitText = (e) => {
    e.preventDefault();
    firestore.collection("texts").doc(currentText.id).update(currentText);
    // console.log('updated:', currentText.id)
    // console.log(e.target)
  };

  //update community text
  const handleUpdateCommText = (e) => {
    e.preventDefault();
    firestore
      .collection("community")
      .doc(commCurrentText.id)
      .update(commCurrentText);
    //  console.log("updated:", commCurrentText.id);
    // console.log(e.target)
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleShowForm = (e) => {
    const parent = e.target.parentElement;
    const sibling = e.target.nextSibling;

    if (editMode) {
      if (parent.classList.contains("headers")) {
        sibling ? setHeaderID(1) : setHeaderID(2);
        setShowTextForm(true);
      } else if (parent.nodeName === "P") {
        setShowForm(true);
      }
    }
  };
  const handleShowJoinForm = (e) => {
    const parent = e.target.parentElement;
    const sibling = e.target.nextSibling;

    if (editMode) {
      if (parent.classList.contains("joiners")) {
        sibling ? setHeaderJoinID(1) : setHeaderJoinID(2);
         setShowTextBox(true);
      } 
      console.log("Clicked");
    }
  };

  return (
    <EditContext.Provider
      value={{
        communityText,
        fetchedTexts,
        handleChange,
        handleSubmit,
        handleEditMode,
        editMode,
        editStyle,
        places,
        showForm,
        setShowForm,
        showTextForm,
        setShowTextForm,
        handleShowForm,
        currentPlace,
        setCurrentPlace,
        handleChangeText,
        headerID,
        handleSubmitText,
        currentText,
        setCurrentText,
        commCurrentText,
        setCommCurrentText,
        handleCommChangeText,
        handleUpdateCommText,
        handleShowJoinForm,
        showTextBox,
        setShowTextForm,
        headerJoinID,
      }}
    >
      {props.children}
    </EditContext.Provider>
  );
};

export default EditContextProvider;
