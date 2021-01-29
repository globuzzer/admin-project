import React from 'react';
import TextEdit from '../../../components/TextEdit/TextEdit';
import UploadImage from './UploadImage';
import { FiCamera } from 'react-icons/fi';
import edit from './BannerForm.module.css';

const HeroBannerForm = (props) => {
  const { showTextForm, showPlaceForm, currentText, currentPlace} = props;
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const formPlaceStyle = !showPlaceForm ? { display: "none" } : {};
  const formTextStyle = !showTextForm ? { display: "none" }
            : {
                position:'',
                top: headerID === 1 ? '12%' : '30%',
                left: '20%'
              };
  const showEditPictureForm = (e) => {
    if (e.target.id === "camera") {
      e.target.style.color = "#F35270";
      setShowPhotoForm(true);
    }
  }


  return (
    <div>
    <div 
      className={edit.loadPicture} 
      // style={{display: !editMode ? "none" : ""}} 
      onClick={showEditPictureForm}
    >
      <FiCamera id="camera"/>
    </div>
    <UploadImage />
    <TextEdit 
      currentText={currentText} 
      formTextStyle={formTextStyle} 
      showForm={setShowTextForm} 
      save={handleSubmit('texts', currentText)}
    />
    {/*Start forms for city place edit on the banner*/}
    <div className={edit.place} style={formPlaceStyle}>
      <p className={edit.head}>Place</p>
      <hr color="#E4E4E4" />
      <div className={edit.formContainer}>
        <form className={edit.form} >
          <label htmlFor="color">Color</label>
          <input type="text"
                 value={currentPlace.color}
                 name="color"
                 onChange={handleChangePlace}
                 style={{marginLeft: "20px"}}
          />
          <label htmlFor="text">Text</label>
          <input type="text"
                 value={currentPlace.text}
                 name="text"
                 onChange={handleChangePlace}
                 style={{marginLeft: "20px"}}
          />
          <label htmlFor="link">Link</label>
          <p>{currentPlace.text}</p>
          <p></p>
          <input type="text"
                 value={currentPlace.link}
                 name="link"
                 onChange={handleChangePlace}
                 style={{position:"relative", left:"-45px", width:"120%"}}
          />
        </form>
      </div>
      <div className={edit.command}>
      <p id="apply" onClick={handleSubmit('places', currentPlace)}>Apply</p>
      <p id="cancel" onClick={() => setShowPlaceForm(false)}>Cancel</p>
      </div>
    </div>
  {/*END forms for city place edit on the banner*/}
    </div>
  );
}

export default HeroBannerForm;