'use strict';
//this would be the resource 
//when we make the get call for the resource well can have it load the file
//note to self make test indux to be loaded on resource call. 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//we can use this to hold our resources for now it's just going 
//to hold a name and ID
const resourcesSchema = new Schema({
  name:{ type: String, required: true},
  userId: {type: Schema.Types.ObjectId, required:true}
});

module.exports = mongoose.model('resources', resourcesSchema);