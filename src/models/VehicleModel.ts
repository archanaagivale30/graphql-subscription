import * as connections from '../config/connection';
import { Schema, Document } from 'mongoose';

/**
 * @export
 * @interface IVehicleModel
 * @extends {Document}
 */
export interface IVehicleModel extends Document {
    createdAt ? : Date;
    updatedAt ? : Date;
    lat: number;
    lng: number;
}

const VehicleSchema: Schema = new Schema({
    lat: {
        type: Number
        },
    lng: {
        type: Number,
        required: true
    },
}, {
    collection: 'Vehicle',
    versionKey: false,
    timestamps: true
});

export default connections.db.model < IVehicleModel >('VehicleModel', VehicleSchema);
