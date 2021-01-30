import React, { useContext, useEffect, useRef, useState } from 'react';
import HeroBannerForm from '../../pages/Admin/BannerForm/HeroBannerForm';
import { firestore } from '../../utils/firebase.utils';
import { EditContext } from '../../contexts/editContext';
import { SearchCity } from '../SearchCity/SearchCity';
import { Fragment } from 'react';
import TextEdit from '../TextEdit/TextEdit';

const HeroBanner = ({ contentEditable }) => {
  const { editMode, editStyle, handleSubmit } = useContext(EditContext);
  const [banners, setBanners] = useState([]);
  const [headerID, setHeaderID] = useState(null);
  const [showTextForm, setShowTextForm] = useState(false);
  const [showPlaceForm, setShowPlaceForm] = useState(false);
  let header = useRef();
  let place = useRef();
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
  const [places, setPlaces] = useState([]);
  const [currentPlace, setCurrentPlace] = useState(rawPlace);

  // fetch 'banners' content from db
  useEffect(() => {
    const fetchBanners = async () => {
      const bannersCollection = await firestore.collection('banners').get();
      setBanners(bannersCollection.docs.map(doc => {
        return doc.data();
      }));
    }
    fetchBanners();
  }, []);

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

  const showBannerForms = (e) => {
    // console.log(e.target)
    // return (
    //   editMode &&
    //   header.current.contains(e.target) ? setShowTextForm(true) 
    //   : place.current.contains(e.target) ? setShowPlaceForm(true) 
    //   : undefined
    // );
  };
  // console.log(showTextForm, showPlaceForm);
// select the clicked 'place'
const handleClick = (e) => {
  const newPlace = places.filter((place) => {
    return place.id === e.target.name;
  });
  setCurrentPlace(newPlace[0]);
};

// select the clicked 'text' on banner
const getCurrentText = (e) => {
  const newText = fetchedTexts.filter((text) => {
    return text.id === e.target.id;
  });
  setCurrentText(newText[0]);
};

// change handler for place
const handleChangePlace = (e) => {
  const { name, value } = e.target;
  setCurrentPlace({...currentPlace, [name]: value});
};

// change handler for banner text
const handleChangeText = (e) => {
   // const { name, value } = e.target;
    setCurrentText({...currentText, content: e.target.innerText, id: e.target.id});
};

const formTextStyle = !showTextForm ? { display: "none" }
            : {
                position:'',
                top: '12%',
                left: '20%'
              };

const onSelectedText = (text, currentText) => {
  return (
    showTextForm && text.id === currentText.id &&
    <TextEdit 
      currentText={currentText} 
      formTextStyle={formTextStyle} 
      setShowForm={setShowTextForm} 
      save={() => handleSubmit('texts', currentText)}
    />
  );
};

const onSelectedPlace = (place, currentPlace) => {
  return(
    showPlaceForm && place.id === currentPlace.id &&
    <HeroBannerForm 
    showPlaceForm={showPlaceForm}
    currentPlace={currentPlace}
    handleChangePlace={handleChangePlace}
    setShowPlaceForm={setShowPlaceForm}

    />
  );
};


  return (
    <div>
      {banners.map(banner => (
        <section 
          key={banner.img} 
          className="section_header" 
          id="section_header" 
          style={{backgroundImage: `url(${banner.img})`}} 
        >
        <div 
          className="headers" 
          ref={header} 
          
        >
          {fetchedTexts.map((t) => (
            <Fragment >
              {onSelectedText(t, currentText)}
              <p
                key={t.id}
                id={t.id}
                name={t.id}
                contentEditable={contentEditable}
                style={{ ...editStyle, ...t.style }}
                suppressContentEditableWarning="true"
                onBlur={handleChangeText}
                onFocus={getCurrentText}
                onClick={() => setShowTextForm(true)}
              >
                {t.content}
              </p>
            </Fragment>
          ))}
        </div>
        <SearchCity />
        <div ref={place}>
          <p id="header_suggestion">
            Maybe{" "}
            {places.map((p) => (
              <Fragment>
                <a
                  href={p.link}
                  target="_new"
                  key={p.id}
                  name={p.id}
                  contentEditable={contentEditable}
                  suppressContentEditableWarning="true"
                  style={{ ...editStyle, color: p.color }}
                  onFocus={handleClick}
                  onClick={() => setShowPlaceForm(true)}
                >
                  {p.text}
                </a>
                {onSelectedPlace(p, currentPlace)}
              </Fragment>
            ))}
          </p>
        </div>
        </section>
      ))}
    </div>
  );
};

export default HeroBanner;