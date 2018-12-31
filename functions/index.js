const functions = require('firebase-functions');
const mutantChequer = require('./src/mutant');
const db = require('./src/db/dnaDB');

exports.mutant = functions.https.onRequest((req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send();
        return;
    }

    try {
        let dna = req.body.dna;
        let isMutant = mutantChequer.isMutant(dna);
        db.addDna(isMutant, dna.join(""))
            .then(() => {
                isMutant ? res.status(200).send() : res.status(403).send();
                return;
            })
            .catch(err => {
                res.status(500).send(err);
                return;
            })
    } catch (err) {
        console.log("ERR", err);
        res.status(400).send(err);
    }
});

exports.stats = functions.https.onRequest((req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send();
        return;
    }

    db.getStats()
        .then(stats => {
            res.status(200).send(stats);
            return;
        })
        .catch(err => {
        console.log("ERR", err);
        res.status(500).send(err);
    })
});

exports.onDnaCreate = functions.firestore
    .document('/dna/{dnaTypeId}/dnas/{dnaId}')
    .onCreate((snap, event) => {
        const dnaTypeId = event.params.dnaTypeId;
        const docRef = snap.ref.firestore.collection('dna').doc(dnaTypeId)
        return docRef.firestore.runTransaction(t => {
            return t.get(docRef)
                .then(doc => {
                    const count = doc.data().count + 1;
                    const data = { count }
                    return t.update(doc.ref, data)
                })
        })
    });

exports.onDnaDelete = functions.firestore
    .document('/dna/{dnaTypeId}/dnas/{dnaId}')
    .onDelete((snap, event) => {
        const dnaTypeId = event.params.dnaTypeId;
        const docRef = snap.ref.firestore.collection('dna').doc(dnaTypeId)
        return docRef.firestore.runTransaction(t => {
            return t.get(docRef)
                .then(doc => {
                    const count = doc.data().count - 1;
                    const data = { count }
                    return t.update(doc.ref, data)
                })
        })
    });