<script>
    export let theme="light";
    export let style="";
</script>

<style>
    .container.light {
        background-color: #fcfcfc;
    }

    .container.dark {
        background-color: #1d1d1d;
    }

    .container {
        min-width: 10px;
        min-height: 10px;
        padding: 20px;
        margin: 16px;
        border-radius: 20px;
        width: fit-content;
        height: fit-content;
    }
</style>

<div class="container {theme}" style="{style}">
    <slot></slot>
</div>