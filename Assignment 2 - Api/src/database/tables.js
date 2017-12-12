export default async function createTables(db) {
    try {
        await db.schema.createTableIfNotExists("dudes", function (table) {
                table.increments('id').primary(); // integer id

                table.string('name').unique();
            });

        await db.schema.createTableIfNotExists("articles", function (table) {
            table.increments('id').primary(); // integer id

            table.string('title');
            table.integer('votes').defaultTo(0);
            table.integer('dude_id').references('dudes.id');
        });
    } catch(e){
        console.log('Database already exists!', e);
    }
}