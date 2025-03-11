import { get } from "http";
import { subjectModel, ISubject } from "./subject_model.js";
import { getEntry } from "./subject_service.js";
import { Request, Response} from 'express';
import mongoose from "mongoose";

export const createSubject = async (req: Request, res: Response) => {
    try{
        if(!req.body){
            return res.status(400).json({ message: "El cuerpo de la solicitud está vacío"});
        }

        const students = req.body.students;
        if (students && students.length > 0) {
            const invalidStudents = students.filter((id: string) => !mongoose.Types.ObjectId.isValid(id));
            if (invalidStudents.length > 0) {
                return res.status(400).json({ message: "Uno o más estudiantes son inválidos", invalidStudents });
            }
        }

        await getEntry.createNewSubject(req.body);
        res.status(201).json({ message: "Creado con éxito" });
    }catch(error){
        res.status(500).json({ message: "Error al crear al usuario", error });
    }
}

export const getSubjects = async (req: Request, res: Response) => {
        const getSubjects =await getEntry.getAllSubjects();
        res.status(200).json();
    
}

export const getUsersSubject = async (req: Request, res: Response) => {
    try{
        const subjectId = req.params.id;
        const students= await getEntry.getUsersSubject(subjectId);

        if(students.length ===0){
            return res.status(404).json({ message: "No hay estudiantes en esta asignatura" });
        }
        res.status(200).json(students);
    }catch(error){
        res.status(500).json({ message: "Error al obtener los datos", error });
    }
}

export const updateSubject = async (req: Request, res: Response) => {
    try{
        const { id } = req.params; 
        const updateData = req.body;

        if (!id) {
            return res.status(400).json({ message: "El id es incorrecto o no existe." });
        }
        
        const updatedSubject = await getEntry.updateSubject(id, updateData);
        return res.status(200).json({ message: "Asignatura actualizada", updatedSubject });
    }catch(error){
        return res.status(500).json({ message: "Error al actualizar la asignatura",});

    }
}

export const deleteSubject = async (req: Request, res: Response) => {
    try{
        await getEntry.deleteSubject(req.params.id);
        res.status(200).json({ message: "Asignatura eliminada exitosamente" });
    }catch (error) {
        res.status(500).json({ message: "Error al eliminar la asignatura", error });
    }
}