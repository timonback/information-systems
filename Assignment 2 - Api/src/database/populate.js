let {log} = console;

export default function populate(db) {
    db('dudes').insert([
        {name: "DudeA"},
        {name: "DudeB"}
    ]).then((rows) => log(rows));

    db('articles').insert([
        {title: "Amageddon", dude_id: 1},
        {title: "Beta Stuff", dude_id: 1},
        {title: "Casear", dude_id: 2}
    ]).then((rows) => log(rows));
};