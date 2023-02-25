<script lang="ts">
    import L from 'leaflet'
    import 'leaflet/dist/leaflet.css';
    import * as topojson from 'topojson-client'
    import { onMount } from 'svelte';

    import type { Topology } from 'topojson-specification';
    import type { FeatureCollection } from 'geojson';

    import j01 from '../h27.json'
    let map: L.Map;
    let DivMap: HTMLDivElement
    function createMap(container: string | HTMLElement): L.Map {
      let m = L.map(container).setView([43.05, 141.25], 13)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      }).addTo(m)
      return m
    }
    function mapAction(container) {
      map = createMap(container);
      return {
        destroy: () => {
          map.remove();
        },
      };
    }

    function addPols() {
        const pols = topojson.feature((j01 as unknown) as Topology, "town") as unknown as FeatureCollection

        const style = {
            "color": "#ff0000",
            "weight": 3,
            "opacity": .6
        }
        var onEachFeature = (_: any, layer: L.Layer) => {

            layer.on('click', function (e) {
            console.log(e.sourceTarget.feature.properties);
            const selected = e.sourceTarget.feature.properties.MOJI
        });

        }
        L.geoJSON(pols, {style, onEachFeature}).addTo(map)
    }


    onMount(()=>{
        mapAction(DivMap)
        addPols()
    })

  
  </script>
  
    <div class="map" bind:this={DivMap}></div>

  
  <style>
    .map {
      height: 1000px;
      width: 1000px;
    }
  </style>