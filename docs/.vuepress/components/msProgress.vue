<template>
    <div class="progress">
        <div class="name">{{name}}</div>
        <progress max="100" :value="value || 8"></progress>
    </div>
</template>
<script>
    export default {
        name:'msProgress',
        props:['name','value']
    }
</script>
<style lang="less">
    .progress{
        display: flex;
        align-items: center;
        margin: 10px 0;
        .name{
            margin-top: -5px;
            margin-right: 10px;
            width: 100px;
            text-align: left;
        }
    }
</style>