import { Schema, model, models, Document, Model } from 'mongoose';

interface UserDocument extends Document {
    email: string,
    username: string,
    image?: string
}

const UserSchema = new Schema<UserDocument>({
    email: {
        type: String,
        unique: true, // Unique constraint should be like this
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
    },
    image: {
        type: String,
    }
});

const User = models.User || model("User", UserSchema);

export default User as Model<UserDocument>
