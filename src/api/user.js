import { auth, database } from "../config/firebase";

export async function getUserData(id) {
  try {
    return await database.collection("users").doc(id).get();
  } catch (error) {
    console.log('error getUserData ' + error.message)
    return {
      error: error.message,
    };
  }
}

export async function updateUser(id, data) {
  try {
    await database
      .collection("users")
      .doc(id)
      .update({ ...data });
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

export async function addChatToUser(chatId) {
  const users = chatId.split('_')
  const user0Data = await getUserData(users[0])
  const user1Data = await getUserData(users[1])

  let chats0 = user0Data.data().chats
  let chats1 = user1Data.data().chats

  if (chats0.indexOf(chatId) === -1) {
    chats0.push(chatId)
    await updateUser(users[0], { chats: chats0 })
  }

  if (chats1.indexOf(chatId) === -1) {
    chats1.push(chatId)
    await updateUser(users[1], { chats: chats1 })
  }

}