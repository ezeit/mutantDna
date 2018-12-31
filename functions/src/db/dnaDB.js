const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();


module.exports.addDna = (isMutant, dna) => {
    return new Promise((resolve, reject) => {
        db.collection('dna').doc(isMutant ? 'Mutant' : 'Human').collection('dnas').doc(dna).set({})
            .then((snapshot) => {
                console.log("addDNA", snapshot);
                return resolve();
            })
            .catch((err) => {
                console.log("addDNA Error", err);
                return reject(err);
            });
    })
}

module.exports.getStats = () => {
    return new Promise((resolve, reject) => {
        let promises = [];
        promises.push(db.collection('dna').doc("Human").get());
        promises.push(db.collection('dna').doc("Mutant").get());
        Promise.all(promises)
        .then(docs => {
            let count_mutant_dna = 0;
            let count_human_dna = 0;
            let ratio = 0;
            docs.forEach(doc => {
                let count = doc.data().count;
                doc.id === 'Mutant' ? count_mutant_dna = count : count_human_dna = count;
            });
            ratio = count_mutant_dna / count_human_dna;
            return resolve({count_mutant_dna, count_human_dna, ratio});           
        })
        .catch(err => {
            console.log("getStats Error", err);
            return reject(err);
        })        
    })
}