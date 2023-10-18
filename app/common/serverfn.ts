"use server";

import { v2 } from "cloudinary";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { updateTagSet } from "./util";

export const getCloudinaryUploadSignature = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = v2.utils.api_sign_request(
    { timestamp: timestamp },
    process.env.CLOUDINARY_API_SECRET as string
  );
  return { timestamp, signature };
};

export const deleteCloudinaryImage = async (publicId: any) => {
  v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  try {
    const result = await v2.uploader.destroy(publicId);
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const readDocsWithConstraints = async (s: any) => {
  const itemArr: any[] = [];

  function setConstraints(searchParameter: {
    tag: string[];
    startDate: string;
    endDate: string;
  }) {
    const constraints = [];
    constraints.push(orderBy("photo_captured_at", "asc"));
    if (searchParameter.tag.length > 0) {
      constraints.push(where("tag", "array-contains-any", searchParameter.tag));
    }
    if (searchParameter.startDate) {
      constraints.push(
        where("photo_captured_at", ">=", searchParameter.startDate)
      );
    }
    if (searchParameter.endDate) {
      constraints.push(
        where("photo_captured_at", "<=", searchParameter.endDate)
      );
    }
    return constraints;
  }

  const constraints = setConstraints(s);

  const data = await getDocs(query(collection(db, "article"), ...constraints));
  data.forEach((doc) => itemArr.push(doc.data()));
  return itemArr;
};

export const readSingleDoc = async (docId: any) => {
  const data = await getDoc(doc(db, "article", docId));
  return data.data();
};

export const readTags = async () => {
  const data = await getDoc(doc(db, "tags", "9C0vypkn0zkG5gONvQyx"));
  return data.data();
};

export const readDocComments = async (docId: any) => {
  const data = (await getDoc(doc(db, "article", docId))).data();
  if (data) {
    return data.comments;
  }
  return null;
};

export const updateComment = async (new_comments: any, docId: any) => {
  try {
    await updateDoc(doc(db, "article", docId), {
      comments: new_comments,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteDocument = async (docId: any) => {
  try {
    await deleteDoc(doc(db, "article", docId as string));
  } catch {
    (error: any) => console.log(error);
  }
};

export const addDocument = async (add_info: any) => {
  try {
    const r = await addDoc(collection(db, "article"), add_info);
    await updateDoc(doc(db, "article", r.id), {
      doc_id: r.id,
    });
    return r.id;
  } catch (err) {
    console.log(err);
  }
};

export const addTag = async (oldTag: string[], newTag: string[]) => {
  try {
    const data = await getDoc(doc(db, "tags", "9C0vypkn0zkG5gONvQyx"));
    const tagsSet = data.data();
    const newTagsSet = updateTagSet(tagsSet, oldTag, newTag);
    await setDoc(doc(db, "tags", "9C0vypkn0zkG5gONvQyx"), newTagsSet as any);
  } catch (err) {
    console.log(err);
  }
};

export const updateDocument = async (docId: any, update_info: any) => {
  try {
    await updateDoc(doc(db, "article", docId), update_info);
  } catch (err) {
    console.log(err);
  }
};

export const GetUploadPermission = async (user: any) => {
  return (
    user &&
    (user.email == process.env.SUPERUSER ||
      user.email == process.env.SUPERUSER2)
  );
};

