import React, { createContext, useState, useEffect } from 'react';
import { firestore } from "../utils/firebase.utils";
export const EditContext = createContext();

const EditContextProvider = (props) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPlaceForm, setShowPlaceForm] = useState(false);
  const [showTextForm, setShowTextForm] = useState(false);
  const [showTextCommunityForm, setShowTextCommunitytForm] = useState(false);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [headerID, setHeaderID] = useState(null);
  const [textCommunityID, setTextCommunityID] = useState(null);

  const rawPlace = {text: '', color: '', link: ''};
  const rawText = {
    content: '',
    style: {
      color: '',
      fontSize: '',
      fontWeight: '',
      textAlign: ''
    }
  };

  const [fetchedTexts, setFetchedTexts] = useState([]);
  const [currentText, setCurrentText] = useState(rawText);

  const [fetchedCommunityTexts, setFetchedCommunityTexts] = useState([]);
  const [currentCommunityText, setCurrentCommunityText] = useState(rawText);

  const [places, setPlaces] = useState([]);
  const [currentPlace, setCurrentPlace] = useState(rawPlace);

  const [banners, setBanners] = useState([]);
  const [videos, setVideos] = useState([]);

  // add red marks around editable content
  const editStyle =
    editMode ? {
    border: "2px solid #F26678",
    boxSizing: "border-box",
    borderRadius: "5px",
    padding: "8px"
    } : {};
    
  // fetch banner 'texts' content from db
    useEffect(() => {
      const getTexts = firestore
        .collection("texts")
        .onSnapshot((snapshot) => {
          const newText = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFetchedTexts(newText);
        });
        return () => getTexts();
  }, []);

  // fetch comunnity 'texts' content from db
  useEffect(() => {
    const getTexts = firestore
      .collection("community")
      .onSnapshot((snapshot) => {
        const newText = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFetchedCommunityTexts(newText);
      });
      return () => getTexts();
}, []);

  // fetch 'places' content from db
    useEffect(() => {
    const getPlaces = firestore
      .collection("places")
      .onSnapshot((snapshot) => {
        const newPlace = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlaces(newPlace);
        // console.log('new place:', newPlace);
      });
      return () => getPlaces();
  }, []);

  // fetch 'banners' content from db
  useEffect(() => {
    const fetchBanners = async () => {
      const bannersCollection = await firestore.collection('banners').get();
      setBanners(bannersCollection.docs.map(doc => {
        return doc.data();
      }));
    }
    fetchBanners();
  }, [])

  // fetch 'videos' content from db
  useEffect(() => {
    const fetchVideos = firestore
    .collection('video')
    .onSnapshot((snapshot) => {
      const newVideo = snapshot.docs.map((doc) => ({
        ...doc.data()
      }));
      setVideos(newVideo);
    });
    return () => fetchVideos();
  }, [])

  // change handler for place
  const handleChangePlace = (e) => {
    const { name, value } = e.target;
    setCurrentPlace({...currentPlace, [name]: value});
  }

  // change handler for banner text
  const handleChangeText = (e) => {
     // const { name, value } = e.target;
      setCurrentText({...currentText, content: e.target.innerText, id: e.target.id});
  }

  // change handler for community text
  const handleChangeCommunityText = (e) => {
    setCurrentCommunityText({...currentCommunityText, content: e.target.innerText, id: e.target.id});
 }

  const handleSubmit = (collection, document) => (e) => {
    e.preventDefault();
      if(document.id) {firestore.collection(collection).doc(document.id).update(document)}
  }

  const handleEditMode = () => {
    setEditMode(true);
    [ ...document.querySelectorAll('.content-editable')].forEach((element)=>{
      element.classList.add('edit-mode');
  })
  }

  const showEditPictureForm = (e) => {
    if (e.target.id === "camera") {
      e.target.style.color = "#F35270";
      setShowPhotoForm(true);
    }
  }

  const showBannerForms = (e) => {
    const parent = e.target.parentElement;
    const sibling = e.target.nextSibling;
    if (editMode) {
      if (parent.classList.contains('headers')) {
        sibling ? setHeaderID(1) : setHeaderID(2);
        setShowTextForm(true)
      } else if (parent.nodeName === "P") {
        setShowPlaceForm(true);
      }
    }
  }

  const showCommunityForms = (e) => {
    if (editMode) {
      setTextCommunityID(e.target.classList.value);
      setShowTextCommunitytForm(true); 
    }
  }
  
  return (
    <EditContext.Provider
    value={{
      fetchedTexts, handleChangePlace, handleSubmit,
      handleEditMode, editMode, setEditMode, editStyle, places,
      showPlaceForm, setShowPlaceForm, showTextForm, setShowTextForm,
      showBannerForms, currentPlace, setCurrentPlace, handleChangeText, headerID, currentText, setCurrentText, showEditPictureForm, showPhotoForm, setShowPhotoForm, fileUrl, setFileUrl, banners, fetchedCommunityTexts, currentCommunityText, showCommunityForms, showTextCommunityForm, textCommunityID, setCurrentCommunityText, handleChangeCommunityText, videos
       }}
    >
      {props.children}
    </EditContext.Provider>
  );
}

export default EditContextProvider;
