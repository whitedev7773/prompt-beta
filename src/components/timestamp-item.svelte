<script>
    import "$lib/global.css";

    export var type="none", timecode="00:00:00:00";
</script>

<style>
    .item-box {
        background-color: rgb(243, 243, 243);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 30px;
        height: 30px;
        /* padding: 4px; */
        margin: 8px 0px 8px 0px;
        /* border: 2px solid #afd4ff; */
    }

    .type {
        min-width: 100px;
        width: 100px;
        height: 30px;
        background-color: #deedff;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* border: 1px solid var(--highlight-color); */
    }

    .type > p {
        margin: 0;
        color: var(--highlight-color);
        font-size: 12px;
    }

    .timecode {
        width: 130px;
        height: 30px;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* border: 1px solid var(--highlight-color); */
    }

    .timecode > p {
        margin: 0;
        color: black;
        font-size: 12px;
    }
</style>

<div class="item-box">
    <div class="type">
        <p class="bold">{type}</p>
    </div>
    <div class="timecode">
        <p class="normal">{timecode}</p>
    </div>
</div>