// import './style.css'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css';
import j01 from './h27.json'
import * as topojson from 'topojson-client'

import { Topology } from 'topojson-specification';
import { FeatureCollection } from 'geojson';
const map = L.map('map', {
  center: [ 43.05,141.25],
  zoom: 13
})

const pols = topojson.feature((j01 as unknown) as Topology, "town") as unknown as FeatureCollection

const towns: string[] = pols.features.map(v=>v.properties?.MOJI).filter(v=>v!==undefined)

const style = {
  "color": "#ff0000",
  "weight": 3,
  "opacity": .6
}
var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
});

tileLayer.addTo(map);
let q_town = towns[0]

const questions = () => {
  q_town = towns[Math.floor(Math.random() * towns.length)]
  document.getElementById("quest")!.innerText = q_town
}
questions()
var onEachFeature = (_: any, layer: L.Layer) => {

    layer.on('click', function (e) {
      console.log(e.sourceTarget.feature.properties);
      const selected = e.sourceTarget.feature.properties.MOJI
      document.getElementById("res")!.innerText = selected
      if(q_town === selected){
        document.getElementById("res")!.innerText += " Correct"
        questions()
      }
    });

}
L.geoJSON(pols, {style, onEachFeature}).addTo(map)

