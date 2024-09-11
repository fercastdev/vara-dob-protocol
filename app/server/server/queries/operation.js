const { BigQuery } = require("@google-cloud/bigquery");
const { Storage } = require("@google-cloud/storage");
const { Client } = require("@googlemaps/google-maps-services-js");
const { decodePath } = require("../utils/utils");
const _ = require("lodash");

const options = {
  keyFilename: "../../keys/tetris4d-4b50dcaa9e77.json",
  projectId: "tangential-sled-304912",
};

const bigqueryClient = new BigQuery(options);

const gc = new Storage(options);

const mapsClient = new Client();

const getOperations = async (userId) => {
  const query = `SELECT id, name, date, status.status, status.operation_message, status.timestamp 
                 FROM \`tangential-sled-304912.operations.operations\`
                 LEFT JOIN \`tangential-sled-304912.operations.status\` AS status
                 ON id = operationId
                 WHERE userId = "${userId}" order by timestamp DESC`;
  const queryOptions = {
    query: query,
    location: "US",
  };
  const [job] = await bigqueryClient.createQueryJob(queryOptions);
  const [rows] = await job.getQueryResults();
  return rows;
};

const getBigQuery = async (query, params) => {
  const queryOptions = {
    query,
    location: "US",
    params,
  };
  const [job] = await bigqueryClient.createQueryJob(queryOptions);
  const [rows] = await job.getQueryResults();
  return rows;
};

const getOperationDetails = async (id, userId) => {
  const queries = [
    `SELECT * FROM \`tangential-sled-304912.operations.operations\` WHERE id = @id AND userId = @userId`,
    `SELECT * FROM \`tangential-sled-304912.operations.trucks\` WHERE operationId = @id;`,
    `SELECT DISTINCT * FROM \`tangential-sled-304912.operations.clients\` WHERE operationId = @id;`,
    `SELECT * FROM \`tangential-sled-304912.operations.products\` WHERE operationId = @id;`,
    `SELECT * FROM \`tangential-sled-304912.operations.routes\` WHERE operationId = @id;`,
  ];
  const params = { id, userId };
  const results = queries.map((query) => getBigQuery(query, params));
  return Promise.all(results);
};


const getOperationStatus = async (id) => {
  const queries = [
    `SELECT * FROM \`tangential-sled-304912.operations.status\` WHERE operationId = @id order by timestamp DESC limit 1`,
  ];
  const params = { id };
  const results = queries.map((query) => getBigQuery(query, params));
  return Promise.all(results);
};


const getOperationRoutes = async (id, userId) => {
  const queries = [
    `SELECT * FROM \`tangential-sled-304912.operations.operations\` WHERE id = @id AND userId = @userId`,
    `SELECT * FROM \`tangential-sled-304912.operations.routes\` WHERE operationId = @id;`,
  ];
  const params = { id, userId };
  const results = queries.map((query) => getBigQuery(query, params));
  return Promise.all(results);
};

const uploadOperation = async (opId, files, userId, name) => {
  await bigqueryClient.dataset("operations").table("operations").insert({
    id: opId,
    userId,
    name: name ? name : 'operation',
    date: new Date(),
    status: "running",
  });

  const bucket = gc.bucket("tetris-operations");
  const products = bucket.file(`operations/${opId}/products.csv`);
  const trucks = bucket.file(`operations/${opId}/trucks.csv`);
  const clients = bucket.file(`operations/${opId}/clients.csv`);

  return Promise.all([
    products.save(files[0]),
    trucks.save(files[1]),
    clients.save(files[2]),
  ]);
};

const downloadOperationFiles = async (opId, name) => {

  let file;
  const bucket = gc.bucket("tetris-operations");
  
  return await bucket.file(`operations/${opId}/${name}.csv`).download()
};


const deleteOperation = async (id, userId) => {
  const query =
    "DELETE FROM `tangential-sled-304912.operations.operations` WHERE id = @id AND userId = @userId";
  const params = { id, userId };
  return getBigQuery(query, params);
};

const getGoogleDirections = async (trucks) => {
  const result = trucks.map(async (truck) => {
    const details = await Promise.all(
      truck.deliveries.map(async (delivery) => {
        const { waypoints } = delivery;
        const coordinates = waypoints.map((wp) => ({
          lat: wp.lat,
          lng: wp.lng,
        }));
        const request = {
          params: {
            origin: coordinates[0],
            destination: coordinates[coordinates.length - 1],
            waypoints: coordinates.slice(1, -1),
            travelMode: "DRIVING",
            optimize: false,
            key: process.env.GOOGLE_MAPS_KEY,
          },
        };
        const result = await mapsClient.directions(request);
        return {
          ...delivery,
          route: _.flattenDeep(
            result.data.routes.map((route) =>
              route.legs.map((leg) =>
                leg.steps.map((step) => decodePath(step.polyline.points))
              )
            )
          ),
        };
      })
    );
    return { plateNumber: truck.plateNumber, deliveries: [...details] };
  });
  return Promise.all(result);
};

const getDirections = (waypoints) => {
  const grouped = _(waypoints)
    .groupBy((wp) => wp.truckId)
    .map((route, key) => ({
      plateNumber: key,
      deliveries: _(route)
        .groupBy((wp) => wp.trip_time)
        .map((value, index) => {
          const orderedWaypoints = value
            .sort((a, b) => a.orderInRoute - b.orderInRoute)
            .map((wp) => {
              delete wp.operationId;
              delete wp.truckId;
              delete wp.subOperation;
              delete wp.trip_time;
              return {
                ...wp,
                orderInRoute: wp.orderInRoute + 1,
                time: wp.time * 3600000,
              };
            });
          return {
            tripTime: index,
            waypoints: orderedWaypoints,
          };
        })
        .value(),
    }))
    .value();
  return grouped;
};

module.exports = {
  getOperations,
  getOperationDetails,
  getOperationStatus,
  getOperationRoutes,
  uploadOperation,
  deleteOperation,
  getGoogleDirections,
  getDirections,
  downloadOperationFiles
};
