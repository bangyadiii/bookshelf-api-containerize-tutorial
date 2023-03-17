const books = require("../books");

const getAllbooksHandler = (request, h) => {
    const { reading, finished, name } = request.query;
    let data = books;
    if (reading !== undefined) {
        // eslint-disable-next-line eqeqeq
        data = data.filter((book) => book.reading == reading);
    }

    if (finished !== undefined) {
        // eslint-disable-next-line eqeqeq
        data = data.filter((book) => book.finished == finished);
    }

    if (name !== undefined) {
        data = data.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }

    data = data.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }));

    const res = h
        .response({
            status: "success",
            data: {
                books: data,
            },
        })
        .code(200);
    return res;
};

module.exports = getAllbooksHandler;
