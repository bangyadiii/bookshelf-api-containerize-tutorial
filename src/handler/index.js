const addbookHandler = require("./addbook.handler");
const getAllbooksHandler = require("./getAllBook.handler");
const getbookByIdHandler = require("./getBookById.handler");
const editbookByIdHandler = require("./editbookById.handler");
const deletebookByIdHandler = require("./deleteBook.handler");

module.exports = {
    addbookHandler,
    getAllbooksHandler,
    getbookByIdHandler,
    editbookByIdHandler,
    deletebookByIdHandler,
};
