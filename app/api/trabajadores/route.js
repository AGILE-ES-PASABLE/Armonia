// Importa los modelos y cualquier otra cosa necesaria
import Worker from '../../../models/trabajadores';
import { connectDB } from '../../../utils/db';
import { NextResponse } from 'next/server';

// Manejador para el método GET
export const GET = async () =>{
    await connectDB();

    try {
        const trabajadores = await Worker.find();
        return new NextResponse(JSON.stringify(trabajadores), { status: 200 });
    } catch (error) {
        return new NextResponse("Error in fetching divisiones" + error, { status: 500 });
    }
}

// Manejador para el método POST
export const POST = async (request) => {
    await connectDB();

    try {
        const body = await request.json();
        console.log("body", body)
        const newTranajador = new Worker(body);
        const saveTrabajador = await newTranajador.save();
        
        return new NextResponse(
            JSON.stringify({ message: "division created", worker: saveTrabajador }),
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
