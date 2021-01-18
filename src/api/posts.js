import { auth, database, firebase } from '../config/firebase'

export async function createPostData(data) {
  try {
    return await database.collection('posts')
      .doc(auth.currentUser.uid)
      .collection('userPosts')
      .add({
        ...data,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    return {
      error: error
    }
  }

}

export async function getAllPosts(id) {
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