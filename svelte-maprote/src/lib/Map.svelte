<script lang="ts">
    import L from 'leaflet'
    import 'leaflet/dist/leaflet.css';
    let map: L.Map;
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
  
  </script>
  
    <div class="map" use:mapAction></div>

  
  <style>
    .map {
      height: 1000px;
      width: 1000px;
    }
  </style>