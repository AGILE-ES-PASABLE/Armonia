import { Schema, model, models } from "mongoose";

// Define un esquema flexible para subdivisiones

// Define el esquema principal para las divisiones
const divisionesSchema = new Schema(
    {
        name: Schema.Types.String,
        subdivisions: Schema.Types.Mixed, // Utiliza el esquema flexible para subdivisiones
    }, 
    {
        timestamps: true,
        versionKey: false,
    }
);

export default models.divisiones || model("divisiones", divisionesSchema);