// config/database.js
var db;
module.exports = {
    //if(process.env.ENVIRONMENT === "PROD"){
    //  'url' : 'mongodb://<CallistoCF>:<Hermes827>@mongo.onmodulus.net:27017/94432'
    //} else {
      'url' : 'mongodb://localhost/nodecap'
    //}
    //I've been uncommenting out first line, commenting second line to test locally-
    //my question is- can i have multiple different databases configurations set up,
    //and if so how would you go about doing this?
};
