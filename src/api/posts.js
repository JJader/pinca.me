import { auth, database, firebase } from '../config/firebase'

export async function createPostData(data) {
  try {
    return await database.collection('openPosts')
      .doc(auth.currentUser.uid)
      .collection('userPosts')
      .add({
        ...data,
        creator: auth.currentUser.uid,
        collaborator: [],
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    return {
      error: error
    }
  }
}

export async function getFeedPosts(id) {
  try {
    return await database.collection('openPosts')
      .doc(id)
      .collection('userPosts')
      .orderBy('creation', 'asc')
      .get()
  } catch (error) {
    return []
  }
}

export async function getUserPosts(id) {
  try {
    return await database.collection('posts')
      .doc(id)
      .collection('userPosts')
      .orderBy('creation', 'asc')
      .get()
  } catch (error) {
    return []
  }
}