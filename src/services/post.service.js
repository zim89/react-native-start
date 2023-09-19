import { collection, addDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../configs/firebase';
import { uploadImage } from '../helpers';

const create = async ({ image, title, location, geolocation, owner, createdAt }) => {
  try {
    const imageUri = await uploadImage('post_images', image.uri);
    const docRef = await addDoc(collection(db, 'posts'), {
      image: imageUri,
      title,
      location,
      geolocation,
      owner,
      createdAt,
    });
    console.log('Post created with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding post: ', error);
    throw error;
  }
};

const findAll = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'posts'));
    return snapshot;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const update = async (data, docId) => {
  try {
    const ref = doc(db, 'posts', docId);

    await updateDoc(ref, {
      image: data.image,
      title: data.title,
      location: data.location,
    });
    console.log('Post updated');
  } catch (error) {
    console.log(error);
  }
};

export { create, findAll, update };
