import express from "express";
import { createClient } from "@supabase/supabase-js";
import morgan from "morgan";
import bodyParser from "body-parser";

import config from "./config.js";

const app = express();

// using morgan for logs
app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supabase = createClient(
  config.supabaseConfig.url,
  config.supabaseConfig.apiKey
);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`)
);

app.get("/players", async (req, res) => {
  let { data: players, error } = await supabase.from("players").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(players);
});

app.post("/addPlayer", async (req, res) => {
  console.log(req.body);

  const location = req.body.location;

  let street_address = "";

  if (location) {
    const lat = location.coords.latitude.toString();
    const lng = location.coords.longitude.toString();

    const requrl =
      `https://maps.googleapis.com/maps/api/geocode/` +
      `json?latlng=${lat},${lng}&location_type=APPROXIMATE&result_type=street_address&key=${config.googlaMapsApiKey}`;

    const response = await fetch(requrl);

    const data = await response.json();

    if (data.status == "OK") {
      street_address = data.results[0].formatted_address;
    }
  }

  req.body.street_address = street_address;
  //   res.status(200).json({ message: "Player added successfully" });

  let { data, error } = await supabase.from("players").insert([req.body]);
  console.log(data);
  console.log(error);
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});
