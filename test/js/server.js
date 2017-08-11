/**
 * localhost:8080/booksでホストされるシンプルなAPI
 */
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var bookId = 100;
var _ = require("lodash");

function findBook(id) {
    return _.find(books, function (book) {
        return book.id == id;
    });
}

function removeBook(id) {
    return _.remove(books, function (book) {
        return book.id == id;
    });
}

/* 
 * CORSリクエストをサポートするためのセットアップ
 * 【CORS(Cross-Origin Resource Sharing)】･･･ 
 * 他のWebサイトからHTTPでデータを読み込むための仕組み。
 */
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    if ("OPTIONS" == req.method) {
        res.send(200);
    } else {
        next();
    }
};

app.use(allowCrossDomain);
app.use(bodyParser());

var books = [
    { id: 98, author: "Kanayama Sanari", title: "The Detective Conan", year: 1996 },
    { id: 99, author: "Imura Hiroyuki", title: "The all of 'Poco-show'", year: 2017 }
];

/**
 * HTTP GET /books
 * Bookのリストを返す
 */
app.get("/books", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("In GET function ");
    res.json(books);
});

/**
 * HTTP GET /books/:id
 * id: 取得したいBookの一意な識別子
 * 指定されたIDのBookを返す
 * 該当するBookがない場合は404を返す
 */
app.get("/books/:id", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("Getting a book with id " + req.params.id);
    var book = findBook(parseInt(req.params.id, 10));

    if (_.isUndefined(book)) {
        res.send(404);
    } else {
        res.json(book);
    }
});

/**
 * HTTP POST /books/
 * このリクエストのボディに含まれているBookを保存
 * 正常終了なら200を返す
 */
app.post("/books/", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var book = req.body;
    console.log("Saving book with the following structure " + JSON.stringify(book));
    book.id = bookId++;
    books.push(book);
    res.json(book);
});

/**
 * HTTP PUT /books/:id
 * id: 更新したいBookのいち否識別子
 * 該当するBookがない場合は404を返す。
 */
app.put("/books/:id", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var book = req.body;
    console.log("Updating Book " + JSON.stringify(book));
    var currentBook = findBook(parseInt(req.params.id, 10));

    if (_.isUndefined(currentBook)) {
        res.send(404);
    } else {
        currentBook.title = book.title;
        currentBook.year = book.year;
        currentBook.author = book.author;
        res.json(book);
    }
});

/**
 * HTTP DELETE /books/:id
 * id: 削除したいBookの一意な識別子
 * 該当するBookがない場合は404を返す。
 */
app.delete("/books/:id", function (req, res) {
    console.log("calling delete");
    res.header("Access-Control-Allow-Origin", "*");
    var book = findBook(parseInt(req.params.id, 10));

    if (_.isUndefined(book)) {
        res.send(404);
    } else {
        console.log("Deleting " + req.params.id);
        removeBook(parseInt(req.params.id, 10));
        res.send(200);
    }
});

//ポート8080でAPIを起動
app.listen(8080);