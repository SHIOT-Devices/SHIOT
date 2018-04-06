'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//we can use this to hold our resources for now it's just going 
//to hold a name and ID
const resourcesSchema = Schema({
  name:{ type: String, required: true},
  userId: {type: Schema.Types.ObjectId, required:true}
});

module.exports = mongoose.model('resources', resourcesSchema);