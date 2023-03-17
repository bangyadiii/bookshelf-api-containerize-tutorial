const books = require("../books");

const editbookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    if (name === undefined || name === null) {
        const res = h
            .response({
                status: "fail",
                message: "Gagal memperbarui buku. Mohon isi nama buku",
            })
            .code(400);
        return res;
    }

    if (pageCount < readPage) {
        const response = h
            .response({
                status: "fail",
                message:
                    "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
            })
            .code(400);
        return response;
    }

    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };
        const response = h.response({
            status: "success",
            message: "Buku berhasil diperbarui",
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
};

module.exports = editbookByIdHandler;
