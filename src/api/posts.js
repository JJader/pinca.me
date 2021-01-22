import { auth, database, firebase } from '../config/firebase'

export async function createPostData(data) {
  try {
    return await database.collection('posts')
      .add({
        category: data.category,
        description: data.description,
        end: data.end,
        start: data.start,
        status: 0,
        title: data.title,
        isPaid: data.isPaid,
        collaborators: [],
        creator: auth.currentUser.uid,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    return {
      error: error
    }
  }
}

export async function getFeedPosts() {
  try {
    return await database.collection('posts')
      .orderBy('creation', 'asc')
      .get()
  } catch (error) {
    return []
  }
}

export async function getUserPosts() {
  try {
    return await database.collection('posts')
      .orderBy('creation', 'asc')
      .get()
  } catch (error) {
    return []
  }
}