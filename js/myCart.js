$(function (){
    // 判断购物车是否有数据
    if (localStorage.getItem('goods')) {
        var goodsArr = JSON.parse(localStorage.getItem('goods'));
        // 加载数据
        $.ajax({
            url: './data/goods.json',
            type: 'get',
            dataType: 'json',
            success: function (jsonArr){
                $.each(goodsArr,function (index,item){
                    $.each(jsonArr,function (i,obj){
                        if (item.code === obj.code) {
                            // console.log(obj.price,item.num);
                            var price_now = obj.price.slice(1) * item.num;
                            var goodsDom = `<li>
                                <img src="${obj.imgurl}" alt="">
                                <h3>${obj.title}</h3>
                                <p>${price_now}</p>
                                <div class="num">
                                    <button class="reduce">-</button>
                                    <span>${item.num}</span>
                                    <button class="add">+</button>
                                </div>
                                <em code="${obj.code}">删除</em>
                            </li>`;
                            $('.list').append(goodsDom);
                        }
                    })
                })
            }
        });

        // 删除购物车商品
        $('.list').on('click','li em',function (){
            var goodsarr = JSON.parse(localStorage.getItem('goods'));
            // 当前商品的编号
            var code = $(this).attr('code');
            // 删除数组元素：pop()  unshift()  splice(start,1)
            $.each(goodsarr,function (index,item){
                if (item.code === code) {
                    goodsarr.splice(index,1);
                    return false;
                }
            });

            if (goodsarr.length > 0) {
                // 把数据更新到本地存储
                localStorage.setItem('goods',JSON.stringify(goodsarr));
            } else {
                localStorage.clear();
                var newLi = '<li style="line-height:80px; text-align:center; color: #999;">购物车暂无数据！</li>';
                $('.list').html(newLi);
            }

            // 删除页面的节点
            $(this).parent().remove();
            alert(' 商品成功移出购物车！');
        })
    } else {
        var newLi = '<li style="line-height:80px; text-align:center; color: #999;">购物车暂无数据！</li>';
        $('.list').html(newLi);
    }

    //给-+绑定事件
    $('.list').on('click','.reduce',function(){
        var that = $(this);
        var num = $(this).parent().find('span').text();
        var code_now = $(this).parent().parent().find('em').attr('code');
        num--;
        num = num < 1 ? 1 : num;
        var goods = JSON.parse(localStorage.getItem('goods'));
        // console.log(goods);
        $.each(goods,function(index,val){
            // console.log(val.code,code_now);
            if(code_now == val.code){
                var price = val.price;
                val.num = num;
                // console.log(price);
                var  price_now =  price * num;
                that.parent().parent().find('p').text(price_now);
            }
        })
        localStorage.setItem('goods',JSON.stringify(goods))
        $(this).parent().find('span').text(num);
    })
    $('.list').on('click','.add',function(){
        var that = $(this);
        var num = $(this).parent().find('span').text();
        var code_now = $(this).parent().parent().find('em').attr('code');
        num++;
        var goods = JSON.parse(localStorage.getItem('goods'));
        // console.log(goods);
        $.each(goods,function(index,val){
            // console.log(val.code,code_now);
            if(code_now == val.code){
                var price = val.price;
                val.num = num;
                // console.log(price);
                var  price_now =  price * num;
                that.parent().parent().find('p').text(price_now);
            }
        })
        localStorage.setItem('goods',JSON.stringify(goods))
        $(this).parent().find('span').text(num);
    })
    // $('.reduce').click(function(){
    //     var price = $(this).parent().parent().find('p').text();
    //     price = price.slice(1);
    //     // console.log(price);
    //     // console.log($(this));
    //     var num = $(this).parent().find('span').text();
    //     // console.log(num);
    //     num--;
    //     num = num < 1 ? 1 : num;
    //     $(this).parent().find('span').text(num);
    // })
    // $('.add').click(function(){
    //     // console.log($(this));
    //     var num = $(this).parent().find('span').text();
    //     // console.log(num);
    //     num++;
    //     $(this).parent().find('span').text(num);
    // })
})
