<script lang="ts">
  import { onMount } from "svelte";

let value = "select * from blocks where false";
let result = '';
let table = [];
let requesting = false;
let failed = false;
let stylesheet = '';
let ref: HTMLStyleElement;

export let style = '';

onMount(() => {
    if (style) {
        fetch(`/stage/build/app/${style}`).then((res) => res.text()).then(s => {
            stylesheet = s;
            ref.innerHTML = s;
        });
    }
})

const onkeyup = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
       run(value);
    }
}

$: headers = table[0] ? Object.keys(table[0]).filter(v => v !== 'ial') : [];

const run = async (v) => {
    if (!v) {
        return;
    }
    try {
        requesting = true;
        failed = false;
        result = '';
        table = [];
        const res = await fetch('/api/query/sql', {
            method: 'POST',
            body: JSON.stringify({
                stmt: v,
            }),
        });
        const body = await res.json();
        const code = body.code;
        if (code) {
            result = body.msg;
            failed = true;
        } else {
            table = body.data;
        }
    } catch (e) {
        result = String(e);
        failed = true;
    } finally {
        requesting = false;
    }
}
</script>

<div class="sql-tester">
  <style id="sql-tester-style" bind:this={ref}></style>
  <div class="sql-tester-input">
    <input class="b3-text-field fn__block" bind:value={value} on:keyup={(e) => onkeyup(e)} />
    <button class="b3-button b3-button--outline fn__flex-center fn__size200" style="margin: 20px 0;" on:click={() => run(value)}>Execute</button>
  </div>
  <div class="sql-tester-result protyle-wysiwyg" style="padding: 0;">
    {#if requesting}
      <span>Requesting</span>
    {:else if failed}
      <span>Request failed: {result}</span>
    {:else if table.length > 0}
      <table>
        <thead>
          {#each headers as header}
            <th>{header}</th>
          {/each}
        </thead>
        <tbody>
          {#each table as row}
            <tr>
              {#each headers as header}
                <th>{row[header]}</th>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <span>No result.</span>
    {/if}
  </div>
</div>
