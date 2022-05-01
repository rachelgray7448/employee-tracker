const db = require('./db/connection');
const PORT = process.env.PORT || 3001;

db.connect(err => {
    if(err) throw err;
    console.log('Database connected.');
    
})