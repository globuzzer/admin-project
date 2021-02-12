import { firestore } from "./firebase.utils";
// create a new doc in db
export const createNew = async (collection, doc) => {
  await firestore.collection(collection).add(doc);
};

// read data from db is done via useFetch custom hook

// updatye a doc in db
export const updateData = async (collection, currentDoc, updatedDoc) => {
  if(currentDoc.id) {
  await firestore.collection(collection).doc(currentDoc.id).update({...updatedDoc})
}
};

// delete doc from db
export const deleteData = async (collection, data) => {
  await firestore.collection(collection).doc(data.id).delete();
};