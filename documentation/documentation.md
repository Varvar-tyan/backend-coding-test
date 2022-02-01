# Xendit Coding Exercise documentation

## 1. General information

The application goal is creating and retrieving `Rides` entities from the database.

## 2. Usage

1. Ensure `node (>8.6 and <= 10)` and `npm` are installed
2. Run `npm install`
3. Run `npm test`
4. Run `npm start`
5. Hit the server to test health `curl localhost:8010/health` and expect a `200` response

## 3. API documentation

### Endpoints

- `/health`:
    - **GET** - check whether the server is running.
        - Sample response:
          ``` "Healthy"```


- `/rides`
    - **GET** - retrieve all the existing `Rides` entities.
        - Sample response:
          ```
          [           
              {
                 "rideID": 1,
                 "startLat": 1,
                 "startLong": 1,
                 "endLat": 6,
                 "endLong": 6,
                 "riderName": "Rider",
                 "driverName": "Driver",
                 "driverVehicle": "Vehicle",
                 "created": "2007-04-30 13:10:02.047"
             },     
             {
                 "rideID": 2,
                 "startLat": 1,
                 "startLong": 1,
                 "endLat": 6,
                 "endLong": 6,
                 "riderName": "Rider",
                 "driverName": "Driver",
                 "driverVehicle": "Vehicle",
                 "created": "2007-04-30 13:10:02.047"
             }
          ]
          ```
    - **POST** - create a new `Rides` entity and retrieve it.
      - Sample request body:
        ```         
          {
              "start_lat": 1,
              "start_long": 1,
              "end_lat": 6,
              "end_long": 6,
              "rider_name": "Rider",
              "driver_name": "Driver",
              "driver_vehicle": "Vehicle"
          }
        ```
      - Sample response:
        ```
          {
              "rideID": 1,
              "startLat": 1,
              "startLong": 1,
              "endLat": 6,
              "endLong": 6,
              "riderName": "Rider",
              "driverName": "Driver",
              "driverVehicle": "Vehicle",
              "created": "2007-04-30 13:10:02.047"
          }
        ```
        
    
- `/rides/:id`
    - **GET** - retrieve one of the `Rides` entities with a specified id.
        - Sample response:
          ```        
          {
              "rideID": 1,
              "startLat": 1,
              "startLong": 1,
              "endLat": 6,
              "endLong": 6,
              "riderName": "Rider",
              "driverName": "Driver",
              "driverVehicle": "Vehicle",
              "created": "2007-04-30 13:10:02.047"
          }
          ```
        