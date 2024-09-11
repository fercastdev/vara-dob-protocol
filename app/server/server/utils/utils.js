"use strict";

const chalk = require("chalk");
const bcrypt = require("bcrypt");
const path = require("path");
const nodeMailer = require("nodemailer");
const model = require("../models/index");
const generator = require("generate-password");
const _ = require("underscore");

const hashPassword = (password, saltRounds) => {
  return bcrypt.hashSync(password, saltRounds);
};

const checkPassword = (bodyPass, userPass) => {
  return bcrypt.compareSync(bodyPass, userPass);
};

const sendSimpleEamil = (sendToEmail) => {
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "rabindranath.ferreira@forcast.cl",
      pass: "rabin123",
    },
  });
  let mailOptions = {
    from: "rabindranath.ferreira@forcast.cl", // sender address
    to: sendToEmail, // list of receivers
    subject: "Recover Password", // Subject line
    // text: 'TEXT CONTENT', // plain text body
    html: `<html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="description" content="">
          <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
          <meta name="generator" content="Jekyll v3.8.6">
          <title>Starter Template · Bootstrap</title>
      
          <link rel="canonical" href="https://getbootstrap.com/docs/4.4/examples/starter-template/">
      
          <!-- Bootstrap core CSS -->
      <link href="/docs/4.4/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      
          <!-- Favicons -->
      <link rel="apple-touch-icon" href="/docs/4.4/assets/img/favicons/apple-touch-icon.png" sizes="180x180">
      <link rel="icon" href="/docs/4.4/assets/img/favicons/favicon-32x32.png" sizes="32x32" type="image/png">
      <link rel="icon" href="/docs/4.4/assets/img/favicons/favicon-16x16.png" sizes="16x16" type="image/png">
      <link rel="manifest" href="/docs/4.4/assets/img/favicons/manifest.json">
      <link rel="mask-icon" href="/docs/4.4/assets/img/favicons/safari-pinned-tab.svg" color="#563d7c">
      <link rel="icon" href="/docs/4.4/assets/img/favicons/favicon.ico">
      <meta name="msapplication-config" content="/docs/4.4/assets/img/favicons/browserconfig.xml">
      <meta name="theme-color" content="#563d7c">
      
      
          <style>
            .bd-placeholder-img {
              font-size: 1.125rem;
              text-anchor: middle;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }
      
            @media (min-width: 768px) {
              .bd-placeholder-img-lg {
                font-size: 3.5rem;
              }
            }
          </style>
          <!-- Custom styles for this template -->
          <link href="starter-template.css" rel="stylesheet">
        </head>
        <body>
         
      <main role="main" class="container">
      
        <div class="starter-template">
          <h1>Recover Email InnovaApp</h1>
          <p class="lead">your neW password is </p>
        </div>
      
      </main><!-- /.container -->
      <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
            <script>window.jQuery || document.write('<script src="/docs/4.4/assets/js/vendor/jquery.slim.min.js"><\/script>')</script><script src="/docs/4.4/dist/js/bootstrap.bundle.min.js" integrity="sha384-6khuMg9gaYr5AxOqhkVIODVIvm9ynTT5J4V1cfthmT+emCG6yVmEZsRHdxlotUnm" crossorigin="anonymous"></script></body>
      </html>`, // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
    // res.render('index')
  });
};

const titleText = (word) => {
  return (word.charAt(0).toUpperCase() + word.slice(1)).replace("_", " ");
};

const getDataTypeModel = (
  table,
  operation,
  optionsList = null,
  value = "active"
) => {
  let options = optionsList || [];
  let dataInfo = [];
  let numberTypes = ["decimal", "integer"];
  let nonValidDate = ["UpdatedAt", "CreatedAt"];
  let dataModel = { ...model[`${table}`] };
  delete dataModel.rawAttributes.createdAt;
  delete dataModel.rawAttributes.updatedAt;
  delete dataModel.rawAttributes.auth_token;

  for (let key in dataModel.rawAttributes) {
    let objDefinitor = {};
    if (operation === "show" || operation === "edit") {
      objDefinitor = {
        label: titleText(dataModel.rawAttributes[key].fieldName),
        name: dataModel.rawAttributes[key].fieldName,
        required: false,
        readonly: true,
      };
    } else {
      objDefinitor = {
        label: titleText(dataModel.rawAttributes[key].fieldName),
        name: dataModel.rawAttributes[key].fieldName,
        required: false,
      };
    }
    let typeAttribute = dataModel.rawAttributes[key].type.key.toLowerCase();
    if (objDefinitor.name.includes("_id")) {
      objDefinitor["typeAttribute"] = "relation";
      objDefinitor["type"] = "dataselect";
      objDefinitor["disabled"] = true;
      objDefinitor["options"] = options;
    } else if (numberTypes.includes(`${typeAttribute}`)) {
      objDefinitor["typeAttribute"] = typeAttribute;
      objDefinitor["type"] = "input";
      objDefinitor["inputType"] = "number";
    } else if (typeAttribute === "string") {
      objDefinitor["typeAttribute"] = typeAttribute;
      objDefinitor["type"] = "input";
      objDefinitor["inputType"] = "text";
    } else if (
      typeAttribute === "date" &&
      !nonValidDate.includes(`${objDefinitor.label}`)
    ) {
      objDefinitor["typeAttribute"] = `${typeAttribute}time`;
      objDefinitor["type"] = typeAttribute;
    } else {
      // boolean type
      objDefinitor["type"] = "radiobutton";
      objDefinitor["disabled"] = true;
      objDefinitor["options"] = ["active", "inactive"];
      objDefinitor["value"] = value;
    }
    dataInfo.push(objDefinitor);
  }

  return dataInfo;
};

const getDataTypeModelCreate = (table, optionsList = null) => {
  let options = optionsList || [];
  let dataInfo = [];
  let numberTypes = ["decimal", "integer"];
  let nonValidDate = ["UpdatedAt", "CreatedAt"];
  let dataModel = { ...model[`${table}`] };
  delete dataModel.rawAttributes.createdAt;
  delete dataModel.rawAttributes.updatedAt;
  if (table === "User") {
    delete dataModel.rawAttributes.auth_token;
  }
  for (let key in dataModel.rawAttributes) {
    console.log(key);
    let objDefinitor = {
      label: titleText(dataModel.rawAttributes[key].fieldName),
      name: dataModel.rawAttributes[key].fieldName,
      required: false,
    };
    let typeAttribute = dataModel.rawAttributes[key].type.key.toLowerCase();
    if (objDefinitor.name.includes("_id")) {
      objDefinitor["typeAttribute"] = "relation";
      objDefinitor["type"] = "dataselect";
      objDefinitor["disabled"] = true;
      objDefinitor["options"] = options;
    } else if (numberTypes.includes(`${typeAttribute}`)) {
      objDefinitor["typeAttribute"] = typeAttribute;
      objDefinitor["type"] = "input";
      objDefinitor["inputType"] = "number";
    } else if (typeAttribute === "string") {
      objDefinitor["typeAttribute"] = typeAttribute;
      objDefinitor["type"] = "input";
      objDefinitor["inputType"] = "text";
    } else if (
      typeAttribute === "date" &&
      !nonValidDate.includes(`${objDefinitor.label}`)
    ) {
      objDefinitor["typeAttribute"] = `${typeAttribute}time`;
      objDefinitor["type"] = typeAttribute;
    } else {
      // boolean type
      objDefinitor["type"] = "radiobutton";
      objDefinitor["disabled"] = true;
      objDefinitor["options"] = ["active", "inactive"];
    }
    dataInfo.push(objDefinitor);
  }

  return dataInfo;
};

const getDataTypeInfo = async (table) => {
  let dataInfo = [];
  let dataModel = { ...model[`${table}`] };
  delete dataModel.rawAttributes.createdAt;
  delete dataModel.rawAttributes.updatedAt;
  if (table === "User") {
    delete dataModel.rawAttributes.auth_token;
  }
  for (let key in dataModel.rawAttributes) {
    let objDefinitor = {
      label: titleText(dataModel.rawAttributes[key].fieldName),
      type: dataModel.rawAttributes[key].type.key.toLowerCase(),
      key: dataModel.rawAttributes[key].fieldName,
    };
    dataInfo.push(objDefinitor);
  }
  return dataInfo;
};

const decodePath = (encodedPath) => {
  let len = encodedPath.length || 0;
  let path = new Array(Math.floor(encodedPath.length / 2));
  let index = 0;
  let lat = 0;
  let lng = 0;
  let pointIndex;
  for (pointIndex = 0; index < len; ++pointIndex) {
    let result = 1;
    let shift = 0;
    let b;
    do {
      b = encodedPath.charCodeAt(index++) - 63 - 1;
      result += b << shift;
      shift += 5;
    } while (b >= 0x1f);
    lat += result & 1 ? ~(result >> 1) : result >> 1;
    result = 1;
    shift = 0;
    do {
      b = encodedPath.charCodeAt(index++) - 63 - 1;
      result += b << shift;
      shift += 5;
    } while (b >= 0x1f);
    lng += result & 1 ? ~(result >> 1) : result >> 1;
    path[pointIndex] = {
      lat: (lat * 1e-5).toFixed(5),
      lng: (lng * 1e-5).toFixed(5),
    };
  }
  path.length = pointIndex;
  return path;
};

const getDataTypeInfoTable = async (table) => {
  let dataInfo = [];
  let dataModel = { ...model[`${table}`] };
  delete dataModel.rawAttributes.createdAt;
  delete dataModel.rawAttributes.updatedAt;
  if (table === "User") {
    delete dataModel.rawAttributes.auth_token;
  }
  for (let key in dataModel.rawAttributes) {
    let objDefinitor = {
      headerName: titleText(dataModel.rawAttributes[key].fieldName),
      field: dataModel.rawAttributes[key].fieldName,
      // field: dataModel.rawAttributes[key].type.key.toLowerCase(),
      sortable: true,
      filter: true,
    };
    dataInfo.push(objDefinitor);
  }
  return dataInfo;
};

const getDataTypeAssociation = async (table, operation, optionsList = null) => {
  let dataInfo = [];
  let options = optionsList || [];
  let dataModel = { ...model[`${table}`] };
  delete dataModel.rawAttributes.createdAt;
  delete dataModel.rawAttributes.updatedAt;

  if (table === "User") {
    delete dataModel.rawAttributes.auth_token;
  }

  for (let key in dataModel.rawAttributes) {
    let dbField = dataModel.rawAttributes[key].fieldName;
    let objDefinitor = {};
    if (dbField.includes("_id")) {
      let modelRelated = await getRelations(table);
      if (modelRelated.options.length > 0 && modelRelated.options)
        dataInfo.push(modelRelated);
      objDefinitor["label"] = titleText(dataModel.rawAttributes[key].fieldName);
      objDefinitor["required"] = false;
      (objDefinitor["name"] = dataModel.rawAttributes[key].fieldName),
        (objDefinitor["disabled"] = true);
      objDefinitor["type"] = "dataselect";
      objDefinitor["options"] = options;
    }
    if (!_.isEmpty(objDefinitor)) {
      dataInfo.push(objDefinitor);
    }
  }
  return dataInfo;
};

const getRelations = async (model) => {
  let relationModels = {
    User: {
      type: "select",
      label: "Resource",
      name: "resource",
      required: false,
      disabled: false,
      options: ["plants"],
    },
    Plant: {
      type: "select",
      label: "Resource",
      name: "resource",
      required: false,
      disabled: false,
      options: ["users"],
    },
    Hub: {
      type: "select",
      label: "Resource",
      name: "resource",
      required: false,
      disabled: false,
      options: ["plants"],
    },
    Camera: {
      type: "select",
      label: "Resource",
      name: "resource",
      required: false,
      disabled: false,
      options: ["hubs"],
    },
  };

  return relationModels[`${model}`];
};

const generateRandomPass = () => {
  return (password = generator.generate({
    length: 8,
    numbers: true,
  }));
};

module.exports = {
  hashPassword,
  checkPassword,
  getDataTypeModel,
  getDataTypeModelCreate,
  getDataTypeInfo,
  getDataTypeInfoTable,
  sendSimpleEamil,
  getDataTypeAssociation,
  getRelations,
  generateRandomPass,
  decodePath,
};
