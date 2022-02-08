import {RidesRequestModel} from '../utils/rides-interfaces';

const rideModel = (ride: RidesRequestModel): RidesRequestModel => ({
  start_lat: Number(ride.start_lat),
  start_long: Number(ride.start_long),
  end_lat: Number(ride.end_lat),
  end_long: Number(ride.end_long),
  rider_name: ride.rider_name,
  driver_name: ride.driver_name,
  driver_vehicle: ride.driver_vehicle,
});

export default rideModel;
