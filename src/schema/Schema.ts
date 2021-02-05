import { Router } from 'express';
import VehicleController from '../controllers/Vehicle';

var { buildSchema } = require('graphql');

/**
 * @export
 * @class GraphQLIndex
 */
export default class Schema {
    public router: Router;
    public schema: Object;
    public root: Object;
    // Root resolver
    constructor() {
        
        this.schema = buildSchema(`
        scalar DateTime

        type VehicleLocation {
            id :ID!,
            lat : Float,
            lng : Float,
            created : DateTime,
            updatedAt : DateTime
            } 
          input VehicleLocationInput {
              lat : Float,
              lng : Float,
            }    
         type Query {
          VehicleLocations: [VehicleLocation]
        },
         type Mutation {
          createVehicleLocation(input: VehicleLocationInput): VehicleLocation
        },

          type Subscription {
            newVehicleLocation: VehicleLocation!
          }
          
             `);
        this.root={
          VehicleLocations: VehicleController.getAllVehicles,
          createVehicleLocation: VehicleController.create,
          newVehicleLocation:VehicleController.getNewVehicle
      }
      
        this.router = Router();
    }

    /**
     * @memberof Schema
     */
}
