import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, st } from "../Firebase/firebase-config";

const all = async (q) => {
    if(checkObj(q)){
        return await getDocs(q);
    }
    return await getDocs(col(q));
}

const store = async (colName, data) => await addDoc(col(colName), data);

const update = async (colName, id, data) => await updateDoc(doc(db, colName, id), data);

const destroy = async (colName, id) => await deleteDoc(doc(db, colName, id));

const col = colName => collection(db, colName);

const snapshotAll = (q, callback) => {
    
    if(checkObj(q)){
        return onSnapshot(q, callback);
    }

    return onSnapshot(col(q), callback);
}

const checkObj = input => {
    if(typeof(input) === 'object'){
        return true;
    }
    return false;
}

const createFileName = file => {
    const name = file.name.split('.');
    return Date.now() + '.' + name[name.length - 1];
}

const uploadImage = file => {
    const url = '/avatar/' + createFileName(file);
    const storageRef = ref(st, url);

    return uploadBytes(storageRef, file);
}

const getImage = response => {
    return getDownloadURL(response.ref)
}

const deleteImage = url => {
    const desertRef = ref(st, url);
    return deleteObject(desertRef);
}

export { all, store, update, destroy, col, snapshotAll, uploadImage, getImage, deleteImage };