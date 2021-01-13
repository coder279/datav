const Controller = require('egg').Controller;

class PayController extends Controller {
    async payDataHandler(){
        const { app, ctx } = this
        const { item_id,item_type } = ctx.query
        let data = {}
        let res = {}
        let pay = {}
        let result = {}
        result = app.redis.lrange("data",0,-1)
        console.log(result)
        data = await ctx.service.payment.payment(item_id,item_type)
        if(JSON.stringify(result) == "{}"){
            console.log(JSON.stringify(result) )
            pay = await this.cachePayData(data)
        }else{
            pay = await this.cacheGetPayData(data)
        }
        console.log(pay)
        if(!data){
            res = ctx.response.ResponseList(1,"data is empty",null)
        }else{
            res = ctx.response.ResponseList(0,"success",pay)
        }
        ctx.body = res

    }
    cachePayData(data){
        const { app } = this
        data = data.reverse()
        data.map(item=>{
            app.redis.rpush("data", JSON.stringify(item))
        })
        return app.redis.lrange("data",0,-1)
    }
    cacheGetPayData(data){
        const { app } = this
        let cacheItem = app.redis.lrange("data",-1,-1)
        let res = []
        data = data.reverse()
        data.map(item=>{
            if(item.id > cacheItem.id){
                app.redis.rpush("data", JSON.stringify(item))
                app.redis.lpop()
                res.append(item)
            }
        })
        return res
    }
}
module.exports = PayController