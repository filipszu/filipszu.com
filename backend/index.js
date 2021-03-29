var express = require('express'),
    app = express(),
    // All default options
    Poet = require('poet'),
    poet = Poet(app, {
        postsPerPage: 3,
        posts: './_posts',
        metaFormat: 'json',
        routes: {
        'blog/posts/:post': 'post',
        'blog/pagination/:page': 'page',
        'blog/tags/:tag': 'tag',
        'blog/categories/:category': 'category'
        }
    });

poet.watch(function () {
  // watcher reloaded
}).init().then(function () {
  // Ready to go!
});

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) { res.render('index'); });

app.listen(3000);
