var Book = Backbone.Model.extend({
    urlRoot: "http://localhost:8080/books",
    initialize: function () {
        console.log("A new book");
    },
    defaults: {
        name: "Book Title",
        author: "No One"
    },
    printDetail: function () {
        console.log(this.get("name") + " by " + this.get("author"));
    },
    validate: function (attrs) {
        if (attrs.year < 0) {
            return "Year must be positive number";
        }
    }
});

var Library = Backbone.Collection.extend({
    url: "http://localhost:8080/books/",
    model: Book,
    initialize: function () {
        console.log("Created a new library");
    }
});

var library = new Library([
    new Book({ name: "Beginning Backbone", author: "James Sugrue", year: 2013 }),
    new Book({ name: "Pro Javascript Design Patterns", author: "Dustin Diaz", year: 2012 })
]);

var LibraryView = Backbone.View.extend({
    initialize: function () {
        console.log("View is created");
        this.render();
    },
    render: function () {
        this.collection.forEach(function (book) {
            this.$el.append("<li id=\"" + book.get("name") + "\">Book Name: " + book.get("name") + "</li>");
        }, this);
        return this;
    }
});

var libraryView = new LibraryView({
    collection: library,
    el: "#libraryViewSection"
});