import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "./service";
import { BillingDoc, CustomerDoc } from "@/interfaces/firebase";

export const validateSinglePlate = async (
  collectionName: string,
  docId: string | null,
  vehiclePlate?: string
) => {
  const q = query(
    collection(db, collectionName),
    where("vehiclePlate", "==", vehiclePlate?.toUpperCase())
  );

  const querySnapshot = await getDocs(q);
  const docsIdList = querySnapshot.docs.map((doc) => doc.id);

  if (docsIdList.length === 0 || docsIdList[0] === docId) {
    return true;
  } else {
    return false;
  }
};

export const createNewDoc = async (
  collectionName: "customers" | "invoices",
  data: CustomerDoc | BillingDoc
) => {
  try {
    // Si el campo no existe, registramos el documento
    const response = await addDoc(collection(db, collectionName), data);

    return { success: true, docId: response.id };
  } catch (error) {
    console.log("Ha ocurrido un error al enviar los datos");
    return { success: false };
  }

  // const docRef = await addDoc(collection(db, collectionName), data)
};

export const getAll = async (collectionName: string) => {
  const collectionData = collection(db, collectionName);
  const snapshot = await getDocs(collectionData);
  const dataList = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return dataList;
};

export async function getDocById(docId: string, collectionName: string) {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    docSnap.data();
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    return false;
    console.log("No such document!");
  }
}

export const getDocByVehiclePlate = async (
  collectionName: string,
  vehiclePlate: string
) => {
  const q = query(
    collection(db, collectionName),
    where("vehiclePlate", "==", vehiclePlate?.toUpperCase())
  );

  const querySnapshot = await getDocs(q);
  const docsIdList = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  if (docsIdList[0]) {
    return docsIdList[0];
  } else {
    return false;
  }
};

export const updateDocument = async (
  idDocToUpdate: string,
  data: {},
  collectionName: string
) => {
  try {
    const docRef = doc(db, collectionName, idDocToUpdate);

    await updateDoc(docRef, {
      ...data,
    });
  } catch {
    console.error({
      errorMessage:
        "El documento ha sido eliminado de la base de datos o no existe",
    });
  }
};

export const deleteDocument = async (docId: string, collectionName: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return true;
  } catch {
    return false;
  }
};
