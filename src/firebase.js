import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyByCh_w5JcNvCOyjgzuMnnFUI18m9eghSc",
  authDomain: "netflix-clone-e6b15.firebaseapp.com",
  projectId: "netflix-clone-e6b15",
  storageBucket: "netflix-clone-e6b15.firebasestorage.app",
  messagingSenderId: "125513480783",
  appId: "1:125513480783:web:66e33066cec7cb8499883a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};


