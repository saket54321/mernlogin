import express from "express";
import bookcontroller from "../Controllers/book.controller.js";
const bookrouter=express.Router();
bookrouter.post('/',bookcontroller.addbook);
bookrouter.get('/',bookcontroller.getbook);
bookrouter.put('/:id',bookcontroller.updatebook);
bookrouter.delete('/:id',bookcontroller.deletebook);
bookrouter.get('/book/:id',bookcontroller.showdetail);


export default bookrouter;