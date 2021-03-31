var express = require('express'),
    app = express(),
    // All default options
    Poet = require('poet'),
    poet = Poet(app, {
        postsPerPage: 3,
        posts: './_posts',
        metaFormat: 'json',
        routes: {
        '/posts/:post': 'post',
        '/pagination/:page': 'page',
        '/tags/:tag': 'tag',
        '/categories/:category': 'category'
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

app.get(baseUrl, function (req, res) { res.render('index', {baseUrl: baseUrl}); });

app.listen(3000);
