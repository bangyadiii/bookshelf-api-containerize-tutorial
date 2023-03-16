const { nanoid } = require("nanoid");
const books = require("./books");

const addbookHandler = (request, h) => {
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
                message: "Gagal menambahkan buku. Mohon isi nama buku",
            })
            .code(400);
        return res;
    }

    if (pageCount < readPage) {
        const response = h
            .response({
                status: "fail",
                message:
                    "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
            })
            .code(400);
        return response;
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (!isSuccess) {
        const response = h
            .response({
                status: "fail",
                message: "Buku gagal ditambahkan",
            })
            .code(500);

        return response;
    }

    const response = h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
            bookId: id,
        },
    });

    response.code(201);
    return response;
};

const getAllbooksHandler = (request, h) => {
    const { reading, finished, name } = request.query;
    let data = books;
    if (reading !== undefined) {
        data = data.filter((book) => book.reading === reading);
    }

    if (finished !== undefined) {
        data = data.filter((book) => book.finished === finished);
    }

    if (name !== undefined) {
        data = data.filter((book) =>
            book.name.toLowerCase().includes(name.toLowerCase())
        );
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

const deletebookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus",
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
};

module.exports = {
    addbookHandler,
    getAllbooksHandler,
    getbookByIdHandler,
    editbookByIdHandler,
    deletebookByIdHandler,
};
