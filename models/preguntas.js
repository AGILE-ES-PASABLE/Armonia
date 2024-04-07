import { Schema, model, models } from "mongoose";

// Define un esquema flexible para subdivisiones

// Define el esquema principal para las divisiones
const preguntasSchema = new Schema(
    {
        survey: Schema.Types.Mixed, // Utiliza el esquema flexible para subdivisiones
    }, 
    {
        timestamps: true,
        versionKey: false,
    }
);

export default models.preguntas || model("preguntas", preguntasSchema);