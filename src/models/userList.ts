import { Schema, model, models, Model, ObjectId, Document } from 'mongoose';

export type listType = {
    manga: string, date: Date, slug: string, poster: string
}


export interface UserListDocument {
    wantToRead: listType[]
    stalled: listType[],
    dropped: listType[],
    wontRead: listType[],
    owner: ObjectId
}

const UserListSchema = new Schema<UserListDocument>({
    owner: {
        type: String,
        required: true,
        unique: true,
    },
    wontRead: {
        type: [{
            manga: { type: String },
            slug: String,
            poster: String,
            date: {
                type: Date,
                required: true
            }
        }],
        default: []  // Initialize as an empty array
    },
    wantToRead: {
        type: [{
            manga: { type: String },
            slug: String,
            poster: String,
            date: {
                type: Date,
                required: true
            }
        }],
        default: []  // Initialize as an empty array
    },
    dropped: {
        type: [{
            manga: { type: String },
            slug: String,
            poster: String,
            date: {
                type: Date,
                required: true
            }
        }],
        default: []  // Initialize as an empty array
    },
    stalled: {
        type: [{
            manga: { type: String },
            slug: String,
            poster: String,
            date: {
                type: Date,
                required: true
            }
        }],
        default: []  // Initialize as an empty array
    },
}, { timestamps: true });

const UserList = models.UserList || model("UserList", UserListSchema);

export default UserList as Model<UserListDocument>
