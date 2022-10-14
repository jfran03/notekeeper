const admin = require('firebase-admin');
const key = require('./key.json');
const db = admin.initializeApp({ credential: admin.credential.cert(key) });
const firestore = db.firestore();

// implementing CRUD for the database

// Adds to the database with an auto-generated id
// @param col => string : Name of the collection
// @param json => json : JSON for data 
const add = async (col,json) =>{
    firestore.collection(col).add(json);
    return true;
}

// Returns an array for all stored documents from the collection
// @param col => string : Name of the collection
// @returns array
const get = async (col) =>{
    let results = [];
    const collection = firestore.collection(col);
    const snapshot = await collection.get();

    snapshot.forEach(doc =>{
        results[doc.id] = doc.data();
    })

    return results;
}

// Updates an EXISTING document with json parameter
// @param col => string : Name of collection
// @param doc => string : Name of document
// @param json => JSON : JSON of new data
// @return boolean
const set = async (col,doc,json) =>{
    const document = firestore.collection(col).doc(doc);
    const md = await document.get();
    if (!md.exists){
        return false;
    }else{
        document.set(json);
        return true;
    }
}

// Removes an EXISTING document from the collection
// @param col => string : Name of collection
// @param doc => string : name of document
// @return boolean
const remove = async (col,doc) =>{
    firestore.collection(col).doc(doc).delete();
    return true;
}

module.exports = {add,set,get,remove};