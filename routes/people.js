const express = require('express');
const router = express.Router();
// import { FIRESTORE_SERVICE_ACCOUNT_KEY } from 'react-native-dotenv';

// this first bit is all taken fromthe firestore docs

const admin = require('firebase-admin');

// hidden the massive json file in process env
const serviceAccount = require('../tryingtohide');
// process.env.FIRESTORE_SERVICE_ACCOUNT_KEY_PATH

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

db.settings({ timestampsInSnapshots: true });

// const storage = admin.storage();
// Create a storage reference from our storage service



// const storageRef = storage.ref('female1.png');
// storageRef.getDownloadURL().then(function(url) {
//   console.log('url--->', url);
// });
//
// const female1 = storageRef('female1.png');

const peopleCollection = db.collection('people');
//
// peopleCollection.add({
//   name: 'AAA AAA',
//   dob: '26/09/1977',
//   rating: 989,
//   image: female1
// })
//   .then( ref => {
//     console.log('Added document with ID: ', ref.id);
//   });

// gs://cw-project-db.appspot.com/female1.png


//this should get all the people
router.get('/people',(req, res , next) =>{

  const allPeople = [];

  peopleCollection.get()
    .then(person => {
      //for each document return the data
      person.forEach(doc => {
        allPeople.push({
          'docID': doc.id,
          'name': doc.data().name
        });
      });
      // respond with the array created
      // as json
      res.json(
        allPeople
      );
    })
    .catch(next);
});

//this should get a single user by id
router.get('/people/:id', (req, res, next) =>{

  peopleCollection.doc(req.params.id).get()
    .then(doc=>{
      if(doc.exists){
        //if the data exists in the database
        res.json({
          'statusCode': 200,
          'statusReponse': 'OK',
          'message': 'Person found',
          'personData': doc.data()
        });
      }else{
        res.json({
          'statusCode': 404,
          'statusReponse': 'Not found',
          'message': 'Person not found'
        });
      }

    })
    .catch(next);
});

module.exports = router;
