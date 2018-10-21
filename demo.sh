#!/usr/bin/env bash
response='[{"place_id":"198204189","licence":"Data © OpenStreetMap contributors, ODbL 1.0. https:\/\/osm.org\/copyright","osm_type":"relation","osm_id":"299133","boundingbox":["63.0859177","67.353","-25.0135069","-12.8046162"],"lat":"64.9841821","lon":"-18.1059013","display_name":"Ísland","class":"boundary","type":"administrative","importance":0.754945434746935,"icon":"https:\/\/nominatim.openstreetmap.org\/images\/mapicons\/poi_boundary_administrative.p.20.png"}]'

read -p "where to?" where_to;
nominatim=`curl -s "https://nominatim.openstreetmap.org/search?q=${where_to:-iceland}&format=json&limit=1" --compressed`
# nominatim=$response #`curl -s "https://nominatim.openstreetmap.org/search?q=${where_to:-iceland}&format=json&limit=1" --compressed`
lat=`echo $nominatim | jq '.[0] | .lat' - | cut -c 2- | rev | cut -c 2- | rev`
lon=`echo $nominatim | jq '.[0] | .lon' - | cut -c 2- | rev | cut -c 2- | rev`
echo "openspace.globebrowsing.goToGeo(${lat}, ${lon}, 1000000)"
read -p "and what day?" iso_date;
read -p "on your mark...";
# TODO: Run the demo
node demo.js $iso_date $lat $lon