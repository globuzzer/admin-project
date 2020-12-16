import React, { createContext, useState, useEffect } from "react";
// import { firestore } from "./../../utils/firebase.utils";

export const EditContext = createContext();

const EditContextProvider = (props) => {
  const [editMode, setEditMode] = useState(false);

  // add red marks around editable content
  const editStyle = editMode
    ? {
        border: "2px solid #F26678",
        boxSizing: "border-box",
        borderRadius: "5px",
        padding: "8px",
      }
    : {};

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <EditContext.Provider
      value={{
        // handleEditMode,
        editMode,
        editStyle,
      }}
    >
      {props.children}
    </EditContext.Provider>
  );
};

export default EditContextProvider;
