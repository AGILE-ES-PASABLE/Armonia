import { Schema, model, models } from "mongoose";

// Define un esquema flexible para subdivisiones

// Define el esquema principal para las divisiones
const trabajadoresSchema = new Schema(
    {
        code: Schema.Types.String,
        firstName: Schema.Types.String,
        lastName: Schema.Types.String,
        division: Schema.Types.String,
    }, 
    {
        timestamps: true,
        versionKey: false,
    }
);

export default models.trabajadores || model("trabajadores", trabajadoresSchema);