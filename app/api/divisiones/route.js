// Importa los modelos y cualquier otra cosa necesaria
import Division from '../../../models/divisiones';
import { connectDB } from '../../../utils/db';
import { NextResponse } from 'next/server';

// Manejador para el método GET
export const GET = async () =>{
    await connectDB();

    try {
        const divisiones = await Division.find();
        return new NextResponse(JSON.stringify(divisiones), { status: 200 });
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
        const newDivision = new Division(body);
        const saveDivision = await newDivision.save();
        
        return new NextResponse(
            JSON.stringify({ message: "division created", division: saveDivision }),
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
