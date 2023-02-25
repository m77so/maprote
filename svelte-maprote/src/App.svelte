<script lang="ts">
  import Map from './lib/Map.svelte'
  import QuestHandler from './lib/QuestHandler.svelte'
  import j from './a.json'
  import type { FeatureCollection, GeoJsonObject } from 'geojson';
  import { Quest, validateQuestJson, type QuestJson } from './lib/Quest';
  validateQuestJson(j)
  let map_selected = ""
  let question = ""
  const quest = new Quest(j as QuestJson, 20)

  question = quest.next()
  function onSelected(e) {
    const {value} = e.detail
    map_selected = value
    quest.solve(map_selected)
    question = quest.next()
    console.log(quest)
  }

</script>

<main>

  <QuestHandler selected={map_selected} question={question} />
  <Map polygon={quest.geojson} on:selected={onSelected} />

</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
  #map {
    height: 800px;
    width: 1000px;
  }
</style>