import { Router } from 'express';
import BookController from '../controller/book.controller';

// middleware functions for MongoDB operations
import { MongoGetAll } from '../middleware/mongoose/mongoGetAll';
import { MongoGet } from '../middleware/mongoose/mongoGet';
import { MongoCreate } from '../middleware/mongoose/mongoCreate';
import { MongoUpdate } from '../middleware/mongoose/mongoUpdate';
import { MongoDelete } from '../middleware/mongoose/mongoDelete';
import { MongoQuery } from '../middleware/mongoose/mongoQuery';

// authentication middleware
// import { verifyAccessToken } from '../middleware/authentication/verifyAccessToken';

// model
import { Book } from '../models/book.model';

// Create a new router instance
const bookRouter = Router();

// uncomment if I ever need to make this router authorized only
// bookRouter.use(verifyAccessToken());

// get
bookRouter.get('/books/get/all', MongoGetAll(Book), BookController.getAll);
bookRouter.get('/books/get/:id', MongoGet(Book), BookController.get);

// post
bookRouter.post('/books/create/', MongoCreate(Book), BookController.create);
bookRouter.patch('/books/update/:id', MongoUpdate(Book), BookController.update);

// query
bookRouter.post('/books/query', MongoQuery(Book), BookController.query);

// delete
bookRouter.delete(
    '/books/delete/:id',
    MongoDelete(Book),
    BookController.delete
);

export default bookRouter;
