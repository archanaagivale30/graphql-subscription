import VehicleController from '../controllers/Vehicle';

export const types = `
scalar DateTime

type VehicleLocation {
    id :ID!,
    lat : Float,
    lng : Float,
    created : DateTime,
    updatedAt : DateTime
    }`;
export const inputs = `
input VehicleLocationInput {
    lat : Float,
    lng : Float,
  }
`;
export const queries = `   
VehicleLocations: [VehicleLocation]
`;

export const mutations = `
createVehicleLocation(input: VehicleLocationInput): VehicleLocation
`;
export const subscription=`
newVehicleLocation: VehicleLocation!
`
export const roots = {
    VehicleLocations: VehicleController.getAllVehicles,
    createVehicleLocation: VehicleController.create,
    newVehicleLocation:VehicleController.getNewVehicle
}
