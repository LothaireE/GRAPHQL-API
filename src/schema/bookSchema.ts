import { Schema } from 'mongoose';

/**
 * Basic Schema for validating book data.
 * defines the structure of a classic book document in MongoDB.
 *
 * @remarks
 * Schema includes fields for title and author and a timestamps for created and updated times.
 */
export const bookSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        author: { type: String, required: true }
    },
    {
        timestamps: true
    }
);
