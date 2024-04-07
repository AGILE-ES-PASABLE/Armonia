// Importa los modelos y cualquier otra cosa necesaria
import Question from '../../../models/preguntas';
import { connectDB } from '../../../utils/db';
import { NextResponse } from 'next/server';

// Manejador para el método GET
export const GET = async () =>{
    await connectDB();

    try {
        const preguntas = await Question.find();
        return new NextResponse(JSON.stringify(preguntas), { status: 200 });
    } catch (error) {
        return new NextResponse("Error in fetching preguntas" + error, { status: 500 });
    }
}
// Manejador para el método POST
export const POST = async (request) => {
    await connectDB();

    try {
        const body = await request.json();
        console.log("body", body)
        const newQuestion = new Question(body);
        const saveQuestion = await newQuestion.save();
        
        return new NextResponse(
            JSON.stringify({ message: "division created", division: saveQuestion }),
            { status: 201 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: "Error in creating division",
                error,
            }),
            { status: 500 }
        );
    }
}
