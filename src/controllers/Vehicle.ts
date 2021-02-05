import VehicleModel, { IVehicleModel } from '../models/VehicleModel';
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

class VehicleController {

  public getAllVehicles({ filter }, req): Array<IVehicleModel> | Object {

    return VehicleModel
      .find(filter)
      .then((data) => {
        return data;
      })
      .catch((error: Error) => {
        console.log(error)
        var err = new Error("INTERNALSERVER");
        err.stack = error.message;
        throw err;
      });
  }
  public update({ id, input }): any {
    return VehicleModel.update({ _id: id }, input)
      .then((update) => {
        return { count: update.nModified || 0 }
      })
      .catch((error: Error) => {
        return {};
      });
  }
  public create({ id, input }): any {
    return new Promise(function (resolve, reject) {
      VehicleModel.create(input, (err, Vehicle) => {
        if (err) {
          console.log(err)
          if (err.errors.title.$isValidatorError) {
            let err1 = new Error("VALIDATION");
            err1.stack = `${err.errors.title.path} ${err.errors.title.kind}`;
            reject(err1);
          }
          else {
            let err1 = new Error("INTERNALSERVER");
            err1.stack = `Internal Server Error`;
            reject(err1);
          }
        }
        resolve(Vehicle);
      });
    }).then((data) => {
      console.log(data)
      pubsub.publish("Vehicle_TOPIC",
        {
          newVehicleLocation:
            data
        });
      return data;
    })

  }
  public getNewVehicle() {
    return pubsub.asyncIterator("Vehicle_TOPIC")
  }
}

export default new VehicleController();
