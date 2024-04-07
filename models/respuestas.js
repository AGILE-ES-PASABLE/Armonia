import { Schema, model, models } from "mongoose";

// Define un esquema flexible para subdivisiones

// Define el esquema principal para las divisiones
const respuestasSchema = new Schema(
    {
        code: Schema.Types.String,
        answers: Schema.Types.Mixed, // Utiliza el esquema flexible para subdivisiones
    }, 
    {
        timestamps: true,
        versionKey: false,
    }
);

export default models.respuestas || model("respuestas", respuestasSchema);