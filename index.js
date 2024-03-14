import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//import Pokedex from 'pokedex-promise-v2';

const app = express();
const port = 3000;
const API_URL = "https://pokeapi.co/api/v2/berry/";
//const P = new Pokedex();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/", (req, res) => {
        res.render("index.ejs", {
            flag: false,
        });
});

app.post("/submit", async (req, res) =>{
    try {
        const choosenBerry = req.body.berry;
        const berryData = await axios.get(API_URL + choosenBerry);
        res.render("index.ejs", {
            //berryText: JSON.stringify(berryData.data),
            flag: true,
            name: berryData.data.item.name,
            growthTime: berryData.data.growth_time,
            maxHarvest: berryData.data.max_harvest,
            size: berryData.data.size,
            smoothness: berryData.data.smoothness,
            soilDryness: berryData.data.soil_dryness,
            firmness: berryData.data.firmness.name,
            flavors: berryData.data.flavors,
        });
    }catch(error){
        res.render("index.ejs", {
            flag: false,
        });
    }    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});