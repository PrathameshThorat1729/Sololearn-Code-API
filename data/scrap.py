############################################################
#
# Sololearn Code API - A API to grab best codes from Sololearn
# Copyright(C) 2022 - 2023 Prathamesh Thorat (thoratprathamesh1729@gmail.com)
#
# This software is provided 'as-is', without any express or implied warranty.
# In no event will the authors be held liable for any damages arising from the use of this software.
#
# Permission is granted to anyone to use this software for any purpose,
# including commercial applications, and to alter it and redistribute it freely,
# subject to the following restrictions:
#
# 1. The origin of this software must not be misrepresented
# you must not claim that you wrote the original software.
# If you use this software in a product, an acknowledgment
# in the product documentation would be appreciated but is not required.
#
# 2. Altered source versions must be plainly marked as such,
# and must not be misrepresented as being the original software.
#
# 3. This notice may not be removed or altered from any source distribution.
#
############################################################

from bs4 import BeautifulSoup as BS
import requests
import pandas as pd
import os

round = 1
data = []

while True:
    a = requests.get(f"https://www.sololearn.com/codes?page={round}").content

    html = BS(a, "html.parser")

    code_boxes = html.find_all("div", class_="code")

    print(round)
    if len(code_boxes) < 1:
        break

    for i in code_boxes:
        temp = dict()
        dt = i.find("p", class_="codeDate").attrs["data-date"].split(" ")

        date = dt[0].split("/")

        temp["title"] = i.find("a", class_="nameLink").get_text()
        temp["codeURL"] = i.find("a", class_="nameLink")["href"]
        temp["userName"] = i.find("a", class_="userName").get_text()
        temp["profileURL"] = "https://www.sololearn.com" + \
            i.find("a", class_="userName")["href"]
        temp["profilePicture"] = "https://www.sololearn.com" + \
            i.find("a", class_="userName")["href"]
        temp["date"] = date[1]+"-"+date[0]+"-"+date[2]
        temp["time"] = dt[1]+" "+dt[2]
        temp["codeLang"] = i.find("a", class_="icon").get_text()
        vote = i.find("p", class_="positive")
        url = i.find("a", class_="nameLink")["href"]
        id = url.replace("https://code.sololearn.com/", "")[0:12]
        temp["id"] = id
        if vote:
            temp["upvotes"] = int(
                vote.get_text().replace("+", "")
            )
        else:
            temp["upvotes"] = 0

        data.append(temp)
    round += 1

df = pd.DataFrame(data)

path = os.path.abspath(__file__.replace("insight.py", ""))
df.to_json(path+"\\sl.json", orient="records")
df.to_csv(path+"\\sl.csv")
