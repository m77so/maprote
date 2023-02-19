// import './style.css'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css';
import j01 from './h27.json'
import * as topojson from 'topojson-client'

import { Topology } from 'topojson-specification';

const map = L.map('map', {
  center: [ 43.05,141.25],
  zoom: 13
})

const pols = topojson.feature((j01 as unknown) as Topology, "town")
console.log(pols)
const style = {
  "color": "#ff0000",
  "weight": 3,
  "opacity": .6
}
var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
});
tileLayer.addTo(map);
var onEachFeature = (_: any, layer: L.Layer) => {

    layer.on('click', function (e) {
      console.log(e.sourceTarget.feature.properties);
      document.getElementById("res")!.innerText = e.sourceTarget.feature.properties.MOJI
    });

}
L.geoJSON(pols, {style, onEachFeature}).addTo(map)

