import { auth, database, firebase } from '../config/firebase'
import { getUserData, updateUser } from './user'

export async function createPostData(data) {
  try {
    await database.collection('posts')
      .add({
        ...data,
        status: 0,
        collaborators: [],
        interested: [],
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

export async function addInterestedUser(userId, postId) {
  let post = await getPosts(postId)

  if (post.length) {
    let postData = post[0];

    postData.interested.push(userId);
    await updatePost(postId, postData);
    alert("Você está inscrito")

  } else {
    alert("Esse post não existe mais")
  }
}

export async function removeInterestedUser(userId, postId) {
  let post = await getPosts(postId)

  if (post.length) {
    let postData = post[0];

    const index = postData.interested.indexOf(userId)

    if (index != -1) {
      postData.interested.splice(index, 1)
      await updatePost(postId, postData);
      alert("Você não está mais inscrito")
    }
  } else {
    alert("Esse post não existe mais")
  }
}

export async function getInterestedList(ids) {
  let users = []

  for (let i = 0; i < ids.length; i++) {
    const user = await getUserData(ids[i])

    if (!user.error) {
      let item = {
        id: ids[i],
        name: user.data().name
      }
      users.push(item)
    }
  }
  return users
}

export async function getPosts(ids) {
  try {
    let list = [];


    if (!Array.isArray(ids)) {
      ids = [ids]
    }

    for (let i = 0; i < ids.length; i++) {
      const element = await database
        .collection('posts')
        .doc(ids[i])
        .get()

      if (element.data()) {
        list.push({
          id: element.id,
          ...element.data()
        })
      }
    }

    return list;

  } catch (error) {
    console.log('error getPosts ' + error.message)
    return []
  }
}

export async function deletPosts(id) {
  try {
    await database
      .collection("posts")
      .doc(id)
      .delete()
  } catch (err) {
    console.log("erro em deletPosts" + err.message);
    return {
      error: err.message
    }
  }
}

export async function updatePost(id, data) {
  try {
    await database
      .collection("posts")
      .doc(id)
      .update({ ...data });
    return true;
  } catch (err) {
    console.log("erro em updatePost" + err.message);
  }
}

export async function updateUserProjects() {
  const { uid } = auth.currentUser;

  const posts1 = await searchUserInPosts(
    'collaborators',
    'array-contains',
    uid
  )

  const posts2 = await searchUserInPosts(
    'creator',
    '==',
    uid
  )

  let otherPosts = []
  let myPosts = []

  if (!posts1.error) {
    otherPosts = posts1.docs.map((post) => post.id)

    if (!posts2.error) {
      myPosts = posts2.docs.map((post) => post.id)

      const projects = myPosts.concat(otherPosts)
      await updateUser(uid, { projects })
    }
  }

}

export async function searchUserInPosts(param, condition, id) {
  try {
    return await database
      .collection('posts')
      .where(param, condition, id)
      .get()
  }
  catch (err) {
    console.log("erro em searchUserInCollaborators" + err.message);
    return { error: err.message }
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

export async function getFilterPosts(param, operator, value) {
  try {
    return await database.collection('posts')
      .where(param, operator, value)
      .get()
  } catch (error) {
    console.log('error getFeedPosts ' + error.message)
    return []
  }
}



