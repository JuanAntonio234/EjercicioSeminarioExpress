//name, teacher, alumnes (array objecteID)
import mongoose, {Schema, model, mongo} from 'mongoose';

export interface ISubject{
    name: string;
    teacher: string;
    students: mongoose.Types.ObjectId[];
}

export const subjectSchema = new Schema<ISubject>({
    name: {type:String, required:true},
    teacher:{ type: String, required: true},
    students: [{ type:mongoose.Schema.Types.ObjectId, ref:"User", required: true}]
});
export const subjectModel = model<ISubject>('Subject',subjectSchema);