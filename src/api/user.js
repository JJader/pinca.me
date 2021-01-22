import { auth, database } from "../config/firebase";

export async function getUserData(id) {
  try {
    return await database.collection("users").doc(id).get();
  } catch (error) {
    console.log("erro em getUserData");
    return {
      error: err.message,
    };
  }
}

export async function updateUser(id, data) {
  try {
    await database
      .collection("users")
      .doc(id)
      .update({ ...data });
    return true;
  } catch (err) {
    console.log("erro em updateUser");
    return {
      error: err.message,
    };
  }
}

export async function searchByName(name) {
  try {
    return await database.collection("users").where("name", ">=", name).get();
  } catch (err) {
    console.log("error in searchByname");
  }
}
