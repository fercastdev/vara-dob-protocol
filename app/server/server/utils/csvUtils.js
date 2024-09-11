const { parseAsync } = require("json2csv");
const csvtojson = require('csvtojson')

const productFields = [
  // { label: "CLIENTE_DESPACHO", value: "clientName" },
  { label: "RUT", value: "clientRut" },
  // { label: "DESTINO_CLIENTE", value: "clientAddress" },
  // { label: "COMUNA_CLIENTE", value: "clientCommune" },
  // { label: "REGION_CLIENTE", value: "clientRegion" },
  { label: "ORIGEN", value: "origin" },
  { label: "DIRECCION", value: "originAddress" },
  { label: "COMUNA", value: "originCommune" },
  { label: "LATITUD_ORIGEN", value: "latOrigin" },
  { label: "LONGITUD_ORIGEN", value: "lonOrigin" },
  { label: "PRIORIDAD", value: "priority" },
  { label: "SKU", value: "sku" },
  { label: "ORDEN", value: "order" },
  { label: "CANTIDAD", value: "quantity" },
  { label: "LARGO", value: "length" },
  { label: "ANCHO", value: "width" },
  { label: "ALTO", value: "height" },
  { label: "PESO", value: "weight" },
  { label: "AUTOSOPORTANTE", value: "selfSupporting" },
  { label: "CARGA_MAXIMA_SOPORTA_PRODUCTO", value: "maxWeightSupported" },
  { label: "FECHA_DESPACHO", value: "date" },
  { label: "CARAS", value: "faces" },
  { label: "TOL_X_MIN", value: "tol_x_min" },
  { label: "TOL_X_MAX", value: "tol_x_max" },
  { label: "TOL_Y_MIN", value: "tol_y_min" },
  { label: "TOL_Y_MAX", value: "tol_y_max" },
];

const clientFields = [
  { label: "CLIENTE", value: "name" },
  { label: "RUT", value: "rut" },
  { label: "DIRECCION", value: "address" },
  { label: "LONGITUD", value: "lng" },
  { label: "LATITUD", value: "lat" },
  { label: "COMUNA", value: "commune" },
  { label: "REGION", value: "region" },
  { label: "TIEMPO", value: "waitTime" },
  { label: "VENTANA_HORARIA", value: "timeWindow" },
  { label: "COD_CLUSTER", value: "codCluster" }
];

const vehicleFields = [
  { label: "ACTIVAR", value: "activate" },
  { label: "PATENTE", value: "plateNumber" },
  { label: "RUT", value: "rut" },
  { label: "LARGO", value: "length" },
  { label: "ANCHO", value: "width" },
  { label: "ALTO", value: "height" },
  { label: "PESO_SOPORTA", value: "supportedWeight" },
  { label: "EJES", value: "axes" },
  { label: "TIPO", value: "type" },
  { label: "TIPO_PRODUCTO_ENTREGA", value: "productType" },
  { label: "ABIERTO_CERRADO", value: "openClosed" },
  { label: "DIESEL_ELECTRICO", value: "dieselElectric" },
  { label: "DISPONIBILIDAD", value: "availability" },
  { label: "COSTO", value: "cost" },
  { label: "VALOR_COSTO", value: "costValue" },
  { label: "CANTIDAD_MAXIMA_ATENCION", value: "maxAttendance" },
  { label: "VUELVE_ORIGEN", value: "backToOrigine" },
  { label: "HORAS_DISPONIBLES", value: "hoursDisp" },
  { label: "COD_CLUSTER", value: "codCluster" },
];

const parseCSVToJson = async (file) => {
  try {
    console.log('parseCSVToJson');
    console.log(file);
    return csvtojson().fromFile(file);
  } catch (error) {
    console.error(error);
    return error
  }
};

const parseJsonToBuffer = async (json, opts) => {
  try {
    const csv = await parseAsync(json, { ...opts });
    const buffer = Buffer.from(csv);
    return buffer;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  vehicleFields,
  clientFields,
  productFields,
  parseCSVToJson,
  parseJsonToBuffer,
};
