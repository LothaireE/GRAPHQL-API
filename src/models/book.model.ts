import mongoose from 'mongoose';
import { bookSchema } from '../schema/bookSchema';

/**
 * This file defines the Book model using Mongoose.
 * It imports the book schema and creates a model for it.
 *
 * @remarks
 * The Book model can be used to interact with the books collection in MongoDB.
 */
export const Book = mongoose.model('Book', bookSchema);
