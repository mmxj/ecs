<template>
    <div class="hello">
        <ul>
            <li v-for="(item, index) in proData">
                <label for="">
                    <input type="checkbox" :value="item.name" v-model="selectArr">
                </label>{{item.name}}
            </li>
            ：
        </ul>
        <button type="" @click="del">删除</button>
        {{selectArr}}
        <label>
            <input type="checkbox" class="checkbox" @click="selectAll"/>全选
        </label>
    </div>
</template>
<script>
    var proData = [{
        "name": "aaaaaaaaaa"
    }, {
        "name": "bbbbbbbbbb"
    }, {
        "name": "cccccccccc"
    }, {
        "name": "dddddddddd"
    }]
    export default {
        name: 'hello',
        data: function() {
            return {
                proData: proData,
                selectArr: []
            }
        },
        methods: {},
        watch: {//深度 watcher
        },
        created() {
            this.$http.get('').then(function(response) {
                response = response.body;
                this.proData = response.data;
            })
        },
        methods: {
            del() {
                var arr = [];
                var len = this.proData.length;
                for(var i = 0; i < len; i++) {
                    if(this.selectArr.indexOf(i) >= 0) {
                        console.log(this.selectArr.indexOf(i))
                    } else {
                        arr.push(proData[i])
                    }
                }
                this.proData = arr;
                this.selectArr = []
            },
            selectAll(event) {
                var _this = this;
                console.log(event.currentTarget)
                if(!event.currentTarget.checked) {
                    this.selectArr = [];
                } else { //实现全选
                    _this.selectArr = [];
                    _this.proData.forEach(function(item, i) {
                        _this.selectArr.push(item.name);
                    });
                }
            }
        }
    }
</script>
<style scoped>
    html, body, #editor {
        margin: 0;
        height: 100%;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        color: #333;
    }
    textarea, #editor div {
        display: inline-block;
        width: 49%;
        height: 100%;
        vertical-align: top;
        box-sizing: border-box;
        padding: 0 20px;
    }
    textarea {
        border: none;
        border-right: 1px solid #ccc;
        resize: none;
        outline: none;
        background-color: #f6f6f6;
        font-size: 14px;
        font-family: 'Monaco', courier, monospace;
        padding: 20px;
    }
    code {
        color: #f66;
    }
</style>