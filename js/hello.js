var Book = BackBone.Model.extend({
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

var Library = BackBone.Collection.extend({
    model: Book,
    initialize: function () {
        console.log("Created a new library");
    }
});

var library = new Library([
    new Book({ name: "Beginning Backbone", author: "James Sugrue", year: 2013 }),
    new Book({ name: "Pro Javascript Design Patterns", author: "Dustin Diaz", year: 2012 })
]);

console.log("Library contains: " + library.length + " books.");
