import { auth, database, firebase } from '../config/firebase'
import { getUserData, updateUser } from './user'

export async function createPostData(data) {
  try {
    await database.collection('posts')
      .add({
        ...data,
        status: 0,
        collaborators: [],
        creator: auth.currentUser.uid,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      }).then(async (newPost) => {
        await addProjetToUser(auth.currentUser.uid, newPost.id);
      })
  } catch (error) {
    alert('Não conseguimos criar seu projeto')
    console.log('error createPostData ' + error.message)
  }
}

export async function addProjetToUser(UserId, postId) {
  let user = await getUserData(UserId)

  if (!user.error) {
    let userData = user.data()
    userData.projects.push(postId)
    await updateUser(UserId, userData)
  }
}

export async function getFeedPosts() {
  try {
    return await database.collection('posts')
      .orderBy('creation', 'asc')
      .get()
  } catch (error) {
    console.log('error getFeedPosts ' + error.message)
    return []
  }
}

export async function getFilterPosts() {
  try {
    return await database.collection('posts')
      .orderBy('creation', 'asc')
      .get()
  } catch (error) {
    console.log('error getFeedPosts ' + error.message)
    return []
  }
}

export async function getUserPosts(ids) {
  try {
    let list = [];

    for (let i = 0; i < ids.length; i++) {
      const element = await database
        .collection('posts')
        .doc(ids[i])
        .get()

      list.push({
        id: element.id,
        ...element.data()
      })
    }

    return list;

  } catch (error) {
    console.log('error getUserPosts ' + error.message)
    return []
  }
}