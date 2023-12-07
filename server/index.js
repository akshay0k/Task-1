const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())

// Country mongoose Schema
const CountrySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    value: {
        type: Number,
        required: true
    }
})

const CountryModel = mongoose.model('country', CountrySchema)


// State mongoose Schema
const StateSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    value: {
        type: Number,
        required: true
    }, 
    countryCode: {
        type: Number,
        required: true
    }
})

const StateModel = mongoose.model('state', StateSchema)

// City mongoose Schema
const CitySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    value: {
        type: Number,
        required: true
    }, 
    stateCode: {
        type: Number,
        required: true
    }, 
    
})

const CityModel = mongoose.model('city', CitySchema)

mongoose.connect(process.env.MONGO_URL).then((data, err)=>{
    if(err) console.log("Error while connecting to mongo", err)
    else app.listen(process.env.PORT,()=>{
        console.log("Server listening on port ",process.env.PORT)
    })
})


app.get('/getAllCountries',async(req, res)=>{
  try {
    const countries = await CountryModel.find({})
    res.status(200).json({data: countries})
  } catch (error) {
    res.status(400).json({message: "Something went wrong"})
    
  }
})

app.get('/getStates/:id',async(req, res)=>{
    try {
      const state = await StateModel.find({countryCode: req.params.id})
    res.status(200).json({data: state})
    } catch (error) {
      res.status(400).json({message: "Something went wrong"})
      
    }
  })

  app.get('/getCity/:id',async(req, res)=>{
    try {
      const city =await CityModel.find({stateCode: req.params.id})
    res.status(200).json({data: city})
    } catch (error) {
      res.status(400).json({message: "Something went wrong"})
      
    }
  })
