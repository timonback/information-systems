const bookshelf = require('./bookshelf');

const Dude = bookshelf.Model.extend({
    tableName: 'dudes',
    articles: function() {
        return this.hasMany(Article);
    }
});

const Article = bookshelf.Model.extend({
    tableName: 'articles',
    dude: function() {
        return this.belongsTo(Dude);
    }
});