import { auth, database } from "../config/firebase";

export async function registration(email, password, data) {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    database
      .collection("users")
      .doc(auth.currentUser.uid)
      .set({
        bio: "",
        category: [],
        university: "",
        course: "",
        picture: "",
        projects: [],
        email: email,
        ...data,
      });
  } catch (err) {
    alert(err.message);
  }
}

export async function signIn({ email, password }) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    alert(err.message);
  }
}

export async function singOut() {
  try {
    await auth.signOut();
  } catch (err) {
    alert(err.message);
  }
}
