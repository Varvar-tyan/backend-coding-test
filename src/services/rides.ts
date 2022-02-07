import database from '../configs/database';
import {RidesRequestModel, RidesResponseModel} from '../types/rides-interfaces';
import rideModel from '../models/rides';

export const findAllRides = async (offset: number, limit: number): Promise<RidesResponseModel[]> => {
  return await database.db.all('SELECT * FROM Rides ORDER BY rideID LIMIT ? OFFSET ?', limit, offset);
};

export const findRideByID = async (id: number): Promise<RidesResponseModel> => {
  const data = await database.db.all(`SELECT * FROM Rides WHERE rideID='${id}'`);
  return data.length && data[0];
};

export const createRide = async (ride: RidesRequestModel): Promise<number> => {
  const data = await database.db.run(
      `INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      Object.values(rideModel(ride)));
  return data.lastID;
};

