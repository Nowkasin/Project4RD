import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAW74zxcFCHELDdk0s08rSAdYIauBFSyAk",
  authDomain: "yarkarn-1c9ff.firebaseapp.com",
  projectId: "yarkarn-1c9ff",
  storageBucket: "yarkarn-1c9ff.appspot.com",
  messagingSenderId: "920878937978",
  appId: "1:920878937978:web:34eb9f78041bfa28cb88c3",
  measurementId: "G-2SYH9MHFWL",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const table = document.getElementById('show');

async function getDocumentById(collectionName, documentId) {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      data: docSnap.data()
    };
  } else {
    console.log("No such document!");
    return null;
  }
}

async function showData(data1) {
  const name = document.getElementById('name');
  name.textContent = data1.data.name;
  const from = document.getElementById('from');
  from.textContent = 'โดย : ' + data1.data.from;
  const publish = document.getElementById('publisher');
  publish.textContent = 'สำนักพิมพ์ : ' + data1.data.publish;
  const type = document.getElementById('Type');
  type.textContent = 'หมวดหมู่ : ' + data1.data.Type;
  const title = document.getElementById('title');
  title.textContent = data1.data.title;
  const price = document.getElementById('price');
  price.textContent = 'ราคา : ' + data1.data.price;

  // Get the image element
  const image = document.getElementById('image');

  // Get the download URL of the image from Firebase Storage
  const storage = getStorage(app);
  const storageRef = ref(storage, 'gs://yarkarn-1c9ff.appspot.com/oshi/Oshi 9.png'); // Replace 'imagePath' with the actual field name storing the image path in your Firestore document
  const imageUrl = await getDownloadURL(storageRef);

  // Set the image source
  image.src = imageUrl;
}

const collectionName = 'โอชิ';
const documentId = 'ctVeDRd2Qz91PaA71raF'; // Replace with the Document ID you want to retrieve
const documentData = await getDocumentById(collectionName, documentId);

if (documentData) {
  showData(documentData);
}