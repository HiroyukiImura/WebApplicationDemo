var Book = BackBone.Model.extend({
    initialize: function () {
        console.log("A new book");
    },
    defaults: {
        name: "Book Title",
        author: "No One"
    },
    validate: function (attrs) {

    }
});

