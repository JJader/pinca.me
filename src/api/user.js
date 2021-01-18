import { auth, database } from '../config/firebase'

export async function getUserData(id) {
  try {
    return await database.collection('users')
      .doc(id)
      .get()
  } catch (error) {
    console.log('erro em getUserData')
  }

}

export async function searchByName(name) {
  try {
    return await database.collection('users')
      .where('name', '>=', name)
      .get()
  }
  catch (err) {
    console.log('error in searchByname')
  }
}