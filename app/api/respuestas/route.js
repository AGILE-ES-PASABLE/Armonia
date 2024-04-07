// Importa los modelos y cualquier otra cosa necesaria
import Answer from '../../../models/respuestas';
import { connectDB } from '../../../utils/db';
import { NextResponse } from 'next/server';

// Manejador para el método GET
export const GET = async () =>{
    await connectDB();

    try {
        const answers = await Answer.find();
        return new NextResponse(JSON.stringify(answers), { status: 200 });
    } catch (error) {
        return new NextResponse("Error in fetching answers" + error, { status: 500 });
    }
}

// Manejador para el método POST
export const POST = async (request) => {
    await connectDB();

    try {
        const body = await request.json();
        console.log("body", body)
        const newAnswer = new Answer(body);
        const saveAnswer = await newAnswer.save();
        
        return new NextResponse(
            JSON.stringify({ message: "answer created", answers: saveAnswer }),
            { status: 201 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: "Error in creating answer",
                error,
            }),
            { status: 500 }
        );
    }
}
