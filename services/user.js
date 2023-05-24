import { collection, getDocs, where, query } from "firebase/firestore";
import collections from "../constants/collections";
import { db } from "../firebase";

export async function getProfile(id) {
  const ref = collection(db, collections.users);
  const queryFunction = query(ref, where("uid", "==", id));

  const snapshot = await getDocs(queryFunction);

  const users = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return users[0];
}
