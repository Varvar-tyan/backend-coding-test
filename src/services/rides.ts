import database from '../database/database';
import {ISqlite} from 'sqlite';
import {Statement} from 'sqlite3';
import {RidesResponseModel} from '../types/rides';

export const findAllRides = async (offset: number, limit: number): Promise<RidesResponseModel[]> => {
  return await database.db.all('SELECT * FROM Rides ORDER BY rideID LIMIT ? OFFSET ?', limit, offset);
};

export const findRideByID = async (id: number): Promise<RidesResponseModel[]> => {
  return await database.db.all(`SELECT * FROM Rides WHERE rideID='${id}'`);
};

export const createRide = async (values: string[] | number[]): Promise<ISqlite.RunResult<Statement>> => {
  return await database.db.run(
      `INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      values);
};

