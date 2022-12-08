////////////////////////////////////////////////////////////
//
// Sololearn Code API - A API to grab best codes from Sololearn
// Copyright(C) 2022 - 2023 Prathamesh Thorat (thoratprathamesh1729@gmail.com)
//
// This software is provided 'as-is', without any express or implied warranty.
// In no event will the authors be held liable for any damages arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it freely,
// subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented
// you must not claim that you wrote the original software.
// If you use this software in a product, an acknowledgment
// in the product documentation would be appreciated but is not required.
//
// 2. Altered source versions must be plainly marked as such,
// and must not be misrepresented as being the original software.
//
// 3. This notice may not be removed or altered from any source distribution.
//
////////////////////////////////////////////////////////////

require("dotenv").config({ path: "config.env" });
const env = process.env;
const path = require("path");
const data = require("./data/sl.json");
const express = require("express");
const routes = require("./routes/index");
const hbs = require("hbs");
const app = express();

const publicPath = path.join(__dirname, "public");
const staicPath = path.join(__dirname, "static");
const partialPath = path.join(__dirname, "views", "partials");

app.use("/", express.static(staicPath));
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

app.use("/api/v1/", (req, res, next) => {
  req.data = data;
  next();
});

// all codes routes
app.use("/api/v1/page", routes.page);

// sort by lang route
app.use("/api/v1/lang", routes.lang);

// sort by user route
app.use("/api/v1/user", routes.user);

// get specific id route
app.get("/api/v1/id/:id", (req, res) => {
  res.json(req.data.filter((el) => el.id == req.params.id)[0]);
});

// get specific index route
app.get("/api/v1/index/:index", (req, res) => {
  res.json(req.data[req.params.index]);
});

// doc routes
app.use("/", routes.doc);

// Default api route
app.get("/api/v1/*", (req, res) => {
  res.json(
    {
      message: "Requested Route is not Available",
    },
    404
  );
});
app.delete("/api/v1/*", (req, res) => {
  res.json(
    {
      message: "Requested Route is not Available",
    },
    404
  );
});
app.post("/api/v1/*", (req, res) => {
  res.json(
    {
      message: "Requested Route is not Available",
    },
    404
  );
});
app.put("/api/v1/*", (req, res) => {
  res.json(
    {
      message: "Requested Route is not Available",
    },
    404
  );
});

app.get("/*", (req, res) => {
  res.status(404);
  res.render("404", {
    style: "home",
    page: "404",
    title: "404",
  });
});

app.listen(env.PORT || 3000, () => {
  console.log(`Server is Running on http://localhost:${env.PORT || 3000}/`);
});
