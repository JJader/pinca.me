import { auth } from '../config/firebase'

export async function registration({ email, password, name }) {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
  }
  catch (err) {
    alert(err.message)
  }
}

export async function signIn({ email, password }) {
  try {
   await auth.signInWithEmailAndPassword(email, password);
  }
  catch (err) {
    alert(err.message)
  }
}

export async function singOut() {
  try {
    await auth.signOut();
  }
  catch (err) {
    alert(err.message)
  }
}