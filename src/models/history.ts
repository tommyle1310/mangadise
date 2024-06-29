import { Schema, model, models, Model, ObjectId, Document } from 'mongoose';

export type historyType = {
    manga: string, chapterNum: number, chapterId: string, date: Date
}


export interface HistoryDocument {
    last: historyType,
    all: historyType[],
    owner: ObjectId
}

const HistorySchema = new Schema<HistoryDocument>({
    owner: {
        type: String,
        required: true,
        unique: true,
    },
    last: {
        manga: { type: String },
        chapterNum: Number,
        chapterId: { type: String, required: true },
        date: {
            type: Date,
            required: true
        }
    },
    all: {
        type: [{
            manga: { type: String },
            chapterNum: Number,
            chapterId: { type: String, required: true },
            date: {
                type: Date,
                required: true
            }
        }],
        default: []  // Initialize as an empty array
    },
}, { timestamps: true });

const History = models.History || model("History", HistorySchema);

export default History as Model<HistoryDocument>
