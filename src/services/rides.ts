import database from '../database/database';

export const findAllRides = async (offset, limit) => {
  return await database.db.all('SELECT * FROM Rides ORDER BY rideID LIMIT ? OFFSET ?', limit, offset);
};

export const findRideByID = async (id) => {
  return await database.db.all(`SELECT * FROM Rides WHERE rideID='${id}'`);
};

export const createRide = async (values) => {
  return await database.db.run(
      `INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      values);
};

