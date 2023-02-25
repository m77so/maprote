<script lang="ts">
    export let selected : string
    export let question : string

    $: console.log(selected, "QH")
</script>


<div>
    <div class="selected">Selected: <span class="selected">{selected}</span></div>
    <div class="question">Question: <span class="question">{question}</span></div>
</div>