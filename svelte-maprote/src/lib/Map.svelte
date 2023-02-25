<script lang="ts">
    import L from 'leaflet'
    import 'leaflet/dist/leaflet.css';
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    import type { QuestJson } from './Quest';
    export let polygon : QuestJson
    // export let map_selected = null

    let map: L.Map = null;
    let DivMap: HTMLDivElement

    const dispatch = createEventDispatcher()
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

    function addPols(map: L.Map, jsonPols: QuestJson) {
        if (map === null) return
        if (jsonPols === undefined) return
        const pols = jsonPols

        const style = {
            "color": "#ff0000",
            "weight": 2,
            "opacity": .6
        }
        var onEachFeature = (_: any, layer: L.Layer) => {

            layer.on('click', function (e) {
                dispatch('selected', {
                    value: e.sourceTarget.feature.properties.ANSWER
                })
            });

        }
        L.geoJSON(pols, {style, onEachFeature}).addTo(map)
        map.fitBounds([
            [pols.bbox[1], pols.bbox[0]],
            [pols.bbox[3], pols.bbox[2]]
        ])
    }


    onMount(()=>{
        mapAction(DivMap)
    })

    $: addPols(map, polygon)

  
  </script>
  
    <div class="map" bind:this={DivMap}></div>

  
  <style>
    .map {
      height: 1000px;
      width: 1000px;
    }
  </style>