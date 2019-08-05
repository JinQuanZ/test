111111111111111

//花色
const huase = ["方","梅","红","黑"]
//扑克
const pai = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"]
// const people = []
// const people1 = []
const lin = []
const lin1 = []
cc.Class({
    extends: cc.Component,

    properties: {
        blockPrefab:cc.Prefab,
        block1Prefab:cc.Prefab,
        view:{
            default:null,
            type:cc.Node,
        },
        view1:{
            default:null,
            type:cc.Node,
        },
        NewLabel:{
            default:null,
            type:cc.Label
        },
        btns:{
            default:null,
            type:cc.Node
        },
        pokerList:[],
        people : [],
        people1 : []
        
    },
   
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.init()
        // this.Licensing()
  },

  //写个方法给两个人每人发张牌
    Licensing(){
        //从牌堆里拿牌
        let card1 = this.dealCard();
        let card2 = this.dealCard();
        cc.log("第一个人从牌堆里拿的牌",card1)
        cc.log("第二个人的牌堆里拿的牌",card2)
        cc.log("发牌后：",this.pokerList)
        //传参数给手上的牌
        this.shoupai(card1[0],card2[0])        
    },

    tonghua(ci,ci1){
        cc.log("---玩家手中的牌",ci,ci1)
    },


    //比散牌
    Card(yjj,yjj1){
        cc.log("_____手牌",yjj,yjj1)
        var  qwa = yjj.split("_");
        var  qwa1 = yjj1.split("_");
        var num = qwa[0]
        var num1 = qwa1[0]
        cc.log("num,num1",num,num1)
        var flower = qwa[1];
        var flower1 = qwa1[1];
        cc.log("扑克的花色 ",flower,flower1)
        
        //特殊牌
        var t  = ['10','J','Q','K','A'];
        this.huase  = ["方","梅","红","黑"]
        var index = this.huase.indexOf(flower)
        cc.log("花色index",index)
        var index1 = this.huase.indexOf(flower1)
        cc.log("花色index1",index1)
        var indexOf = parseInt(t.indexOf(num));
        cc.log("indexOf",indexOf)
    //
        cc.log("indexOf",indexOf)
        if(indexOf !== -1){
            
            num  = indexOf + 11
            cc.log("发现玩家1有特殊值：",num)
        };
        var indexOf1111 = parseInt(t.indexOf(num1));
        if(indexOf1111 !== -1){
            num1 = indexOf1111 + 11
            cc.log("发现玩家2有特殊值：",num1)
        };
        lin.push(num*1)
        lin1.push(num1*1)
        cc.log("传过来的牌",lin)
        cc.log("传过来的牌",lin1)
        var sort = lin.sort(function(a,b){
            return a- b
        })
        var sort1 = lin1.sort(function(a,b){
            return a- b
        })
        if(sort.length == 5  && sort1.length == 5){
            if(sort[4] != sort1[4]){
                 if(sort[4] > sort1[4]){
                     cc.log("玩家1赢")
                 }else{
                     cc.log("玩家2赢")
                 }
            }else{
                if(num + index,num1 + index1){
                            cc.log("数字相同开始比花色：")
                            var ke = num +  index
                            var pe = num1 + index1
                            cc.log("第一个",ke)
                            cc.log("第二个",pe)
                            if(ke > pe){
                                cc.log("第一个人的牌大")
                            }else{
                                cc.log("第二个人的牌大")
                            }
                        }
            }
        cc.log("玩家1的牌排序后",sort)
        cc.log("玩家1的牌排序后",sort)
        cc.log("玩家1的牌排序后",sort)
            
        cc.log("玩家1的牌排序后",sort)
        cc.log("玩家2的牌排序后",sort1)
        } 
    },
    shoupai(card1,card2){
        //传入的参数
        cc.log("card1",card1)
        cc.log("card2",card2)
        // card2  = "A_红"
        // card1  = "A_黑"
        /*
        分割字符串成一个数组
        并将字符串转换整形
        */
        var  ary = card1.split("_");
        var num  = ary[0];
        var  ary1 = card2.split("_");
        var num1  = ary1[0];
        cc.log("____----",num)
        cc.log("____----",num1)
        
        /*
        记录手牌
        显示手牌
        */
        //记录
        cc.log("第一个人手上的牌",this.people)
        cc.log("第二个人手上的牌",this.people1)
        //拿取预制件并显示
        var block = cc.instantiate(this.blockPrefab)
        var block1 = cc.instantiate(this.block1Prefab)
        //在这个节点上显示
        block1.parent = this.view1
        block.parent = this.view;
        cc.log("block.parent", block.parent)
        //显示几张扑克
        for(var i = 0;i < this.people.length;i++){
            block.parent
        };
        for(var j = 0;j < this.people1.length;j++){
            block1.parent
        };
        //显示玩家拿到的是哪几张牌
        block.getChildByName("New Label").getComponent(cc.Label).string = "" + ary;   
        block1.getChildByName("New Label").getComponent(cc.Label).string = "" + ary1;

        //把牌存入数组
        this.people.push(ary)
        this.people1.push(ary1)
        //传参数给下一个方法做判断
        this.Card(card1,card2)
        this.tonghua(card1,card2)
        cc.log("this.tonghua",this.tonghua)
        //当玩家的牌到达五张时，关闭发牌按钮
        if(this.people.length == 5 && this.people1.length == 5){
            this.btns.active = false;
        };
        
    },
    

    dealCard(){
        var card = this.pokerList.splice(1,1);
        cc.log("发牌：")
        return card;
    },

    //初始化扑克并洗牌
    initPoker(){
        for(var op = 0; op < huase.length; op++){
            for(var ol = 0;ol < pai.length;ol++){
                this.pokerList.push(pai[ol]+"_"+huase[op])
            }
        }
        cc.log("初始化牌型：",this.pokerList)
        //洗牌
        this.pokerList.sort(function(){return Math.random()>0.5?-1:1;}); 
        // alert(this.pokerList); 
        console.log("洗牌后牌型：",this.pokerList)
        this.Licensing()

    },


    init(){
        this.initPoker();  
        

   
        
        }
    // update (dt) {},
    // }
});
