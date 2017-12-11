import knexLib from 'knex';
import createTables from './tables'
import populate from './populate';

let {log} = console;

const db = knexLib({
    client: 'sqlite3',
    connection: {
        filename: './db.sqlite'
    },
    useNullAsDefault: true
});

async function initialize(){
    await createTables(db);
    await populate(db);
    db.select('id', 'name').from('dudes').then((rows) => log(rows));
    db.select('id', 'title', 'dude_id').from('articles').then((rows) => log(rows));
}

initialize();

export default db;