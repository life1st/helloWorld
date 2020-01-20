const { db } = require('../db')
const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
  id_douban: { type: Number, default: null },
  id_imdb: { type: Number, default: null },
  
})