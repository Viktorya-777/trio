// Firestore rule config
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /registrations/{registration} {
//       allow create
//       allow read, delete: if request.auth.token.email == '<email>'
//     }
//   }
// }
             
let db

function logout(){
  localStorage.clear()
  location.reload()
}

function deleteRow(id){
  db.collection("registrations").doc(id).delete().then(() => {
    const elem = document.getElementById(`row-${id}`);
    elem.parentNode.removeChild(elem);
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}
                                                                                                                    
function runAdmin(){
  
    /* YOU CONFIG */
    var firebaseConfig = {
    apiKey: "AIzaSyD8cdBzG9rci9TBRYT1Ufc_6Og5IW6TLsk",
    authDomain: "trio-2ccea.firebaseapp.com",
    projectId: "trio-2ccea",
    storageBucket: "trio-2ccea.appspot.com",
    messagingSenderId: "634794841077",
    appId: "1:634794841077:web:1d0b3a1bc6e044542bc6bc"
  };
  
  
  firebase.initializeApp(firebaseConfig);
  
  db = firebase.firestore();

  let email = localStorage.getItem('email')
  let password = localStorage.getItem('password')

  if(!email){
    email = prompt("Введите email")
    password = prompt("Введите пароль")

    localStorage.setItem('email', email)
    localStorage.setItem('password', password)
  }

  const auth = firebase.auth()
  const table = document.getElementById('table-body')

  auth.signInWithEmailAndPassword(email, password)
  .then(res => {
    db.collection('registrations').get()
    .then((data) => {
      data.forEach((doc) => {
        const id = doc.id
        const data = doc.data()

        table.insertAdjacentHTML('afterbegin',`
          <tr id="row-${id}">
            <td>${data.email}</td>
            <td>${data.name}</td>
            <td>${data.message}</td>
            <td>
            <button class="button is-danger" onclick="deleteRow('${id}')">Удалить</button>
            </td>
          </tr>
        `)
      })
    })
  })
  .catch(res => {
    alert('Неправильный email/пароль')
    logout()
  })
  
}