import {ISubject, subjectModel, subjectSchema} from "../subjects/subject_model.js"

export const getEntry = {
    createNewSubject : async(subjectData:ISubject)=>{
        const newSubject = new subjectModel(subjectData)
        return await newSubject.save();
    },
    getAllSubjects : async()=> {
        return await subjectModel.find();
    },
    getUsersSubject : async(subjectId: string) => {
       try{ const subject = await subjectModel.findById(subjectId).populate('students');
        if (!subject) {
            throw new Error("Asignatura no encontrada");
        }

        return subject.students;
    } catch (error) {
        console.error("Error en getUsersSubject:", error); // Log para más detalles
        throw error; // Lanza el error para ser manejado en el controlador
    }
    },
    
    updateSubject : async(id:string,updateData:Partial<ISubject>) => {
        try{
        const updatedSubject = await subjectModel.findByIdAndUpdate(
                       id,
                       { $set: updateData },
                       { new: true, runValidators: true }
                   );
                }catch(error){
                    console.error("Error en updateSubject:", error);
                }
           },
    deleteSubject : async(id: string) => {
        return await subjectModel.deleteOne({_id: id});
    },
}