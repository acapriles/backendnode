const db = require('mongoose');

//const url = 'mongodb+srv://user:user1234@cluster0-wfcwo.mongodb.net/telegrom';

db.Promise = global.Promise;
async function connect(url) {
    await db.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('[db] Conectada con éxito.'))
        .catch(err => console.error('[db]', err));
}


module.exports = connect;