import {RidesRequestModel} from '../types/rides';

const rideModel = (rideDTO: RidesRequestModel): RidesRequestModel => ({
  start_lat: Number(rideDTO.start_lat),
  start_long: Number(rideDTO.start_long),
  end_lat: Number(rideDTO.end_lat),
  end_long: Number(rideDTO.end_long),
  rider_name: rideDTO.rider_name,
  driver_name: rideDTO.driver_name,
  driver_vehicle: rideDTO.driver_vehicle,
});

export default rideModel;