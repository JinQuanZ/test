// var underscore = require("underscore");

//花色
const huase = ["方","梅","红","黑"]
//扑克
const pai = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"]
const TeshuPai  = ['J','Q','K','A'];
cc.log("修改")

const paiType =  {
    TonghuaShun:1,
    Tonghua:2,
    Shunzi:3
}

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
        //玩家1
        player1 : [],
        //玩家2
        player2 : []
        
    },
   
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.init()
        // this.Licensing()
    },

    init(){

        //初始化牌
        for(var i = 0; i < huase.length; i++){
            for(var j = 0;j < pai.length;j++){
                this.pokerList.push(huase[i]+"_"+pai[j])
            }
        }
        //洗牌
        this.pokerList.sort(function(){return Math.random()>0.5?-1:1;}); 
        // alert(this.pokerList); 
        cc.log("洗牌后牌型：",this.pokerList)
    },
    /**
     * 当发牌按钮点击
     */
    onDealCardCliecked(){
        //发牌
        this.dealCard();


        //如果玩家手牌数量，达到5张，比大小
        if(this.player1.length == 5){
            if(this.player2.length == 5 && this.player1.length == 5){
                this.btns.active = false;
            }
            this.gameEnd();
        }
    },

    /**
     * 给 玩家各发一张牌
     */
    dealCard(card,card1){
        //拿到扑克牌里，第一张牌
        var card = this.pokerList.splice(1,1);
        // card  = "J_黑","Q_黑","10_黑","9_黑","K_黑"
        this.player1.push(card);
        cc.log("玩家player1的手牌",this.player1);

        var card1 = this.pokerList.splice(1,1);
        this.player2.push(card1);
        cc.log("玩家player2的手牌",this.player2);
        cc.log("牌堆里剩余的牌",this.pokerList)
        this.displayPlayerCard(card,card1)

    },

    /**
     * 在桌面显示玩家手牌
     */
    displayPlayerCard(card,card1){
        cc.log("____",this.player2)
        //拿取预制件
        cc.log("card,card1",card,card1)
        var block = cc.instantiate(this.blockPrefab)
        var block1 = cc.instantiate(this.block1Prefab)
        //把预制件在这个节点上显示
        block1.parent = this.view1
        block.parent = this.view;
        for(var i = 0;i < this.player1.length;i++){
            block.parent
        };
        for(var j = 0;j < this.player2.length;j++){
            block1.parent
        };
        block.getChildByName("Label").getComponent(cc.Label).string = "" + card;   
        block1.getChildByName("Label1").getComponent(cc.Label).string = "" + card1;
    },

    /**
     * 游戏结束
     * 比较玩家的牌，分胜负
     */
    gameEnd(){
        //判断 玩家手牌是否是5张
        if(this.player1.length != 5){
            cc.log("错误");
            return;
        }
        let  player1CardType = this.getCardType(this.player1);
        cc.log("玩家1",player1CardType)
    



        let  player2CardType = this.getCardType(this.player2);
        cc.log("玩家2",player2CardType)
        //如果牌类型大
        if(player1CardType != player2CardType){
            //如果不一样，谁的牌类型大。谁赢
            
        }else{
            //如果一样，根据规则比较
            let bigest = this. checkBigest(this.player1,this.player2);
            cc.log("bigest",bigest)
        }

        

    },

    /**
     * 获得指定牌的牌型
     * @param {*} cards 
     * @returns 牌类型
     */
    getCardType(cards){
        let pokerKind;
        
        if(this.isTonghuaShun(cards)){
            pokerKind = paiType.TonghuaShun;

        }else if (this.isTonghua(cards)){
            pokerKind = paiType.Tonghua;
        }else if (this.isShunzi(cards)){
            pokerKind = paiType.Shunzi;
        }else if (this.isDuizi(cards)){
            pokerKind = paiType.Duizi
            cc.log("-------------cards",cards)
            cc.log("对子对子对子对子",pokerKind)
        }

        return pokerKind;
    },

    /**
     * 判断是否是同花顺
     * @param {} cards 
     */
    isTonghuaShun(cards){
        return this.isTonghua(cards) && this.isShunzi(cards);
    },

    /**
     * 判断是否是同花
     * @param {} cards 
     */
    isTonghua(cards){
        var huase = [];
        for(var i  = 0;i < cards.length;i++){
            var  card  =  cards[i];
            //获取card花色
            var yjj = card[0].split("_")
            //花色push到huase数组 
            huase.push(yjj[0])
        }
        var arr = []
        // cc.log("获取到的花色",huase)
        for(var i = 0; i< huase.length; i++) {
            if(arr.indexOf(huase[i]) === -1) {
              arr.push(huase[i])
             }
           }
        // cc.log("arr = 1时同花",arr)
        if(arr.length == 1){
            cc.log("同花！！！")
        }
        cc.log("修改")
        
        //TODO:实现判断是否是同花
        return 
    },

    /**
     * 判断是否是顺子
     * @param {} cards 
     */
    isShunzi(cards){
        var shuzi = []
        for(var i  = 0;i < cards.length;i++){
            var  card  =  cards[i];
            //获取card花色
            var yjj = card[0].split("_")
            //扑克里的特殊值
            var t  = ['J','Q','K','A'];
            var indexOf = parseInt(t.indexOf(yjj[1]));
            if(indexOf != -1){
                yjj[1] = indexOf + 11
            }
            //数组里的数字字符串转化为数字
            var num = Number(yjj[1])
            shuzi.push(num)
        }
        cc.log("顺子的数组",shuzi)
        //数组排序
        shuzi.sort(function(a, b){return a - b}); 
        if(shuzi[0] + 1 == shuzi[1] &&shuzi[1] + 1 == shuzi[2]&&shuzi[2] + 1 == shuzi[3]&&shuzi[3] + 1 == shuzi[4]){
            cc.log("顺子！！！！")
        }
        function getWordCnt(){ 
            var obj = {}; 
            for(var i= 0, l = shuzi.length; i< l; i++){ 
                var item = shuzi[i]; 
                obj[item] = (obj[item] +1 ) || 1; 
            } 
            return obj; 
        }
        console.log(getWordCnt());//{apple: 2, orange: 3, pear: 1}
    
        cc.log("-------------分割线-------------")
        //TODO:实现判断是否是顺子
        return 
    },
    isDuizi(cards){
        var duizi = []
        for(var i  = 0;i < cards.length;i++){
            var  card  =  cards[i];
            //获取card花色
            var yjj = card[0].split("_")
            //扑克里的特殊值
            var t  = ['J','Q','K','A'];
            var indexOf = parseInt(t.indexOf(yjj[1]));
            if(indexOf != -1){
                yjj[1] = indexOf + 11
            }
            //数组里的数字字符串转化为数字
            var num = Number(yjj[1])
            duizi.push(num)
        }
        //数组排序
        var nary = duizi.sort(function(a, b){return a - b}); 
        cc.log("对子的数组",duizi)
        // duizi = new Set(duizi)
        // cc.log("+++++",duizi)
        for(var j = 0;duizi.length;j++){
            if(nary[j] == duizi[j+1]){
                if(nary[j] != undefined){
                    cc.log("有对子",nary[j])
                    return;
                }
                return 
            }
        }
    },
    
    /**
     * 判断牌组里，最大的一张单牌
     * 如果cards1大，返回1
     * 如果cards2大，返回2
     */
    checkBigest(cards1,cards2){
        cc.log("   比较玩家最大的牌：")
        var wanjia1 = []
        var wanjia2 = []
        for(var i = 0;i < cards1.length;i++){
            var  card  =  cards1[i]
            // cc.log("玩家1的牌型",card)
            var huase1 = this.gethuase(card)
            var cjj = card[0].split("_")
            // cc.log("玩家1改变的牌型",cjj)
            var t  = ['J','Q','K','A'];
            var ao = ['2','4','22']
            var aoa = parseInt()
            //将字符串解析转化为数字类型,返回的是整数；
            var indexOf = parseInt(t.indexOf(cjj[1]));
            if(indexOf != -1){
                cjj[1] = indexOf + 11
            }
            //数组里的数字字符串转化为数字
            var num = Number(cjj[1])
            wanjia1.push(num)
        };
        // var nary = wanjia1.sort()
        for(var j = 0;j < cards2.length;j++){
            var  card1  =  cards2[j]
            var num1 = this.getNumber(card1);
            var huase2 = this.gethuase(card1)
            var num = Number(num1)
            wanjia2.push(num)
        }
        var max = Math.max.apply(null,wanjia1);
        cc.log("玩家1最大的牌",max)
        var max1 = Math.max.apply(null,wanjia2);
        cc.log("玩家2最大的牌",max1)
        cc.log("玩家1的牌",wanjia1)
        cc.log("玩家2的牌",wanjia2)
        if(max != max1){
            if(max > max1){
                // cc.log("玩家1获胜");
            }else{
                cc.log("玩家2获胜");
            }
            
        }else{
            if(max + huase1, max1 + huase2){

                var player1 = max + huase1
                cc.log("花色点数",huase1)
                cc.log("one花色相同并相加",player1)
                var player2 = max1 + huase2
                cc.log("花色点数",huase2)
                cc.log("two花色相同并相加",player2)
                if(player1 > player2){
                    cc.log("player1获胜")
                    return 1
                }else{
                    cc.log("player2获胜")
                }
            }
        }
        //TODO：实现逻辑
        cc.log("修改")
        return 2
    },

    /**
     * 传入一个牌，返回这个牌的数字
     * @param {*} card 
     */
    getNumber(card){
        var ary = card[0].split("_")
        var num = ary[1];
        var indexOf = parseInt(TeshuPai.indexOf(num));
        if(indexOf != -1){
            num = indexOf + 11;
        }
        return num;
    },
    gethuase(card1){
        var ary = card1[0].split("_")
        var num = ary[0]
        var indexOf = parseInt(huase.indexOf(num))
        num = indexOf 
        return num;
    },
    

});




//玩家1是否有对子有对子
        // for(var op = 0;wanjia1.length;op++){
        //     if(nary[op] == nary[op+1]){
        //         if(nary[op] != undefined){
        //             cc.log("有对子",nary[op])
        //             return;
        //         }
        //         return;
        //     }
        // }
