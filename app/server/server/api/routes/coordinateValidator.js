const axios = require('axios');
const FileDownload = require('js-file-download');
const path = require('path');
const fs = require('fs');
const parse_csv = require('csv-parse');
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');


const gmapsKey = '';



const app = express();


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/api/v1/coordinateCheck/load', function(req, res){
	var operation = req.params.operation;
    res.send({status: 'ok', operation: operation})
    
});

app.post('/api/v1/coordinateCheckAll', function(req, res){
	res.download(CSVFile);
});
  

app.post('/api/v1/coordinateCheck/validate/:id', async (req, res) => {
	const id = req.params.id
	var CSVFile = `local_files/local_clients_${id}.csv`;
	var csvData=[];
	var finishStream = false;
	fs.createReadStream(CSVFile)
	    .pipe(parse_csv({delimiter: ','}))
	    .on('data', function(csvrow) {
	        console.log(csvrow);
	        //do something with csvrow
	        csvData.push(csvrow);        
	    })
	    .on('end',function() {
			sendResults(res, csvData);
	    });
});

app.post('/api/v1/coordinateCheck/validate/:long/:lat', async (req, res) => {
	const result = await getGmapsValidation(req.params);
	res.send(result);
});


var sendResults =  async (res, csvData) => {

	var resolver = await parseRecords(csvData);
	var sender = {

		good: resolver.filter(r => r.is_valid == true),
		bad: resolver.filter(r => r.is_valid == false)
	}
	//console.log(resolver);
	res.send(sender);
};

async function parseRecords(records) {
	var results = []
	for (var i = 0; i < records.length; i++) {
		var entry = records[i];
		data = {
			rut: entry[1],
			long: entry[3],
			lat: entry[4],
			is_valid: null,
			gmaps_result: '',
		}
		valid_data = await getGmapsValidation(data);
	    results.push(valid_data);
	}
    results.shift();
    return results
}


var getGmapsValidation = async (record) => {

	var long = record.long;
	var lat = record.lat;

	await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
	  params: {
	    latlng: lat+','+long,
	    result_type: '',
	    key: gmapsKey
	  }
	})
	.then((response) => {
		var result = response.data.results;	
		if (result.length > 0){
			record.gmaps_result = response.data.results[0].formatted_address;
			record.is_valid = true;
		}else{
			record.gmaps_result = response.data.status;
			record.is_valid = false;
		};
	}, (error) => {
	  record.is_valid = false;
	  record.gmaps_result = 'error';
	  //console.log(error);
	});
	console.log(record);
	return record
};

module.exports = app;