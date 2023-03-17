const books = require("../books");

const getbookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.filter((n) => n.id === bookId)[0];

    if (book !== undefined) {
        const response = h
            .response({
                status: "success",
                data: {
                    book,
                },
            })
            .code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan",
    });
    response.code(404);
    return response;
};

module.exports = getbookByIdHandler;
