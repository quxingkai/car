<template>
   <div class="box">
       <div class="listwrap">
           <div v-for="(item, index) in data" :key="index" :id="item.spelling">
               <p>{{item.spelling}}</p>
               <ul>
                   <li v-for="(value, key) in item.list" :key="key">
                       <img :src="value.CoverPhoto" alt="">
                       <span>{{value.Name}}</span>
                   </li>
               </ul>
           </div>
       </div>
       <div class="spellingWrap">
           <a :href='"#" + item ' v-for="(item, index) in spelling" :key="index">{{item}}</a>
       </div>
   </div>
</template>
<style>
  *{
       padding:0;
       margin:0;
       list-style:none;
       box-sizing: border-box;
       text-decoration: none;
   } 
   .box{
       width:100%;
       display: flex;
   }
   .spellingWrap{
        position: fixed;
        right: 15px;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        align-items: center;
        top: 0;
        z-index: 99;
   }
   .spellingWrap a{
       line-height: 1.5;
       font-size: 16px;
       text-decoration: none;
       color: #333;
   }
   .listwrap{
       width:100%;
   }
   .listwrap p{
       font-size:16px;
       padding-left:10px;
       height: 30px;
       line-height: 30px;
   }
   .listwrap ul li{
       height: 50px;
       display: flex;
       align-items: center;
       justify-content: flex-start;
       border-bottom: 1px solid #ddd;
       padding-left:10px;
   }
   .listwrap ul li img{
       width:40px;
   }
   .listwrap ul li span{
       margin-left:10px;
   }
</style>

<script>
import axios from 'axios';

export default {
    data: function(){
        return {
            data:[],
            spelling:[]
        }
    },
    // 对应的方法
       methods: {
            getData: function(){
                axios.get('https://www.easy-mock.com/mock/5af6599acf64741ceacf1c57/es6/carBrand')
                .then(res=>{
                    let spelling = [],
                        data = [];
                    res.data.data.forEach((item, index)=>{
                        // 添加不在列表中的字母
                        let letter = item.Spelling.slice(0,1);
                        if (spelling.indexOf(letter) == -1){
                            spelling.push(letter);
                            // 创建新的首字母对应的对象，并把当前车辆添加到list的第一项
                            data.push({
                                spelling: letter,
                                list: [item]
                            });
                        }else{
                            // 直接把车辆添加到所对应首字母的list里
                            data.forEach((value, key)=>{
                                if (letter == value.spelling){
                                    value.list.push(item);
                                }
                            })
                        }
                    })
                    this.data = data;
                    this.spelling = spelling;
                    console.log(this.data);
                })
            }
        },
        mounted: function(){
            this.getData();
        }
    }
</script>

