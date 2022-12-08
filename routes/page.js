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

const route = require("express").Router();

route.get("/:page", (req, res) => {
  let start = (req.params.page - 1) * 10;
  res.json(req.data.slice(start, start + 10));
});

route.get("/:page/:step", (req, res) => {
  let step = parseInt(req.params.step);
  let start = (req.params.page - 1) * step;
  res.json(req.data.slice(start, start + step));
});

module.exports = route;
