import express from 'express';
import { createSubject,getSubjects, getUsersSubject,updateSubject, deleteSubject } from './subject_controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/newSubject:
 *   post:
 *     summary: Crea una nueva subject
 *     tags: [Subjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mates"
 *               teacher:
 *                 type: string
 *                 example: "Manuel"
 *               students:
 *                  type: string
 *                  description: "ObjectId de los estudiantes"
 *                  example: ["5f80e4f8e4b0c330f84b8c8a"]
 *     responses:
 *       201:
 *         description: Asignatura creada exitosamente
 *       500:
 *         description: Error en el servidor al crearla
 */
router.post('/newSubject', createSubject);

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     summary: Obtiene todas las asignaturas
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: Lista de asignaturas obtenidas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Matemáticas"
 *                   teacher:
 *                     type: string
 *                     example: "Manuel"
 *                   students:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Jorge", "Ana", "Luis"]
 */
router.get('/subjects',getSubjects);

/**
 * @swagger
 * /api/subject/{id}/students:
 *   get:
 *     summary: Obtiene los usuarios de la asignatura
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la asignatura
 *         schema:
 *           type: string
 *           example: "67ccdeecd9f4437396c9afe2"
 *     responses:
 *       200:
 *         description: Lista de estudiantes obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109c9"
 *                   name:
 *                     type: string
 *                     example: "Jorge"
 *                   email:
 *                     type: string
 *                     example: "jorge@example.com"
 *       404:
 *         description: Asignatura no encontrada
 *       500:
 *         description: Error al obtener los estudiantes
 */
router.get('/subject/:id/students', getUsersSubject);

/**
 * @swagger
 * /subjects/{id}:
 *   put:
 *     summary: Actualizar una asignatura por ID
 *     description: Permite actualizar los datos de una asignatura existente
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la asignatura a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la asignatura
 *               teacher:
 *                 type: string
 *                 description: Nombre del profesor
 *               students:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs de los alumnos inscritos
 *     responses:
 *       200:
 *         description: Asignatura actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedSubject:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     teacher:
 *                       type: string
 *                     students:
 *                       type: array
 *                       items:
 *                         type: string
 *       400:
 *         description: Error de validación en la solicitud
 *       500:
 *         description: Error del servidor
 */
router.put('/subjects/:id', updateSubject);

/**
 * @swagger
 * /api/deleteSubject/{id}:
 *   delete:
 *     summary: Elimina una asignatura
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la asignatura a eliminar
 *         schema:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: Asignatura eliminada exitosamente
 *       404:
 *         description: Asignatura no encontrada
 *       500:
 *         description: Error en el servidor al eliminar la asignatura
 */
router.delete('/deleteSubject/:id', deleteSubject);

export default router;