// Importa los modelos y cualquier otra cosa necesaria
import { Types } from 'mongoose';
import Division from '../../../../models/divisiones';
import { connectDB } from '../../../../utils/db';
import { NextResponse } from 'next/server';

// Manejador para el método PUT
export const PUT = async (request, context) => {
    await connectDB();

    try {
        const id = context.params.id;
        const body = await request.json();
        const updatedDivision = await Division.findByIdAndUpdate(id, body, { new: true });
        
        return new NextResponse(
            JSON.stringify({ message: "division updated", division: updatedDivision }),
            { status: 201 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: "Error in updating division",
                error,
            }),
            { status: 500 }
        );
    }
}

// Manejador para el método DELETE
export const DELETE = async (request, context) => {
    await connectDB();
    try {
        
        // const id = context.params.id;
        // console.log("id", context.params.id);
        const id = "6611c087846bffad2e462b63";
        // const id = new Types.ObjectId(context.params.id);
        const deletedDivision = await Division.findByIdAndRemove(id);
        
        if (!deletedDivision) {
            return new NextResponse(
                JSON.stringify({ message: "Division not found" }),
                { status: 404 }
            );
        }

        return new NextResponse(
            JSON.stringify({ message: "division deleted", division: deletedDivision }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "Error in deleting division", error }),
            { status: 500 }
        );
    }
}
// Manejador para el método GET por ID
export const GET = async (context) => {
    await connectDB();

    try {
        const id = new Types.ObjectId(context.params.id);
        const division = await Division.findById(id);
        
        if (!division) {
            return new NextResponse(
                JSON.stringify({ message: "Division not found" }),
                { status: 404 }
            );
        }

        return new NextResponse(
            JSON.stringify({ message: "division found", division }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "Error in finding division", error }),
            { status: 500 }
        );
    }
}