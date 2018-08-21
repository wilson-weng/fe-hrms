<template>
    <el-card class="dashboard-card" :shadow="shadow" :class="cursor ? 'cursor' : ''" :body-style="{padding: '10px'}">
        <el-row>
            <el-col :span="12" class="card-left">
                <slot></slot>
            </el-col>
            <el-col :span="12" class="card-right">
                <slot name="right"></slot>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        props: {
            shadow: {
                type: String,
                default: 'hover', // 'always, hover, never'  version >=2.3.3
            },
            cursor: {
                type: Boolean,
                default: false,
            },
        }
    }
</script>

<style>
    .dashboard-card {
      background-color: rgb(249, 251, 253);
      border: none;
    }
    .dashboard-card .card-left::after {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        content: '';
        border-right: 1px solid #e9e9eb;
        transform: scaleY(0.5);
    }
    .card-left {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 40px;

    }
    .card-right {
        min-height: 40px;
        text-align: right;
    }
    .cursor {
        cursor: pointer;
    }
</style>
