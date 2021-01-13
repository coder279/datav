'use strict';

const Controller = require('egg').Controller;
const await = require('await-stream-ready/lib/await');

class PayController extends Controller {
  async init() {
    const { ctx, app } = this;
    const data = {};
    await ctx.socket.emit('init', data);
  }
  async payDataHandler() {
    const { app, ctx } = this;
    const { item_id, item_type } = ctx.args[0];
    console.log(ctx.args[0])
    let data = {};
    let res = {};
    let pay = {};
    let result = {};
    result = await app.redis.lrange('data', 0, -1);
    data = await ctx.service.payment.payment(item_id, item_type);
    if (JSON.stringify(result) == '[]') {
      await this.cachePayData(data);
      pay = data;
    } else {
      pay = await this.cacheGetPayData(data);
    }
    if (!data) {
      res = null;
    } else {
      res = pay;
    }
    await ctx.socket.emit('record', res);

  }
  async cachePayData(data) {
    const { app } = this;
    data = data.reverse();
    data.map(item => {
      app.redis.rpush('data', JSON.stringify(item));
    });
    return await app.redis.lrange('data', 0, -1);
  }
  async cacheGetPayData(data) {
    const { app } = this;
    let cacheItem = await app.redis.lrange('data', -1, -1);
    cacheItem = JSON.parse(cacheItem[0]);
    const res = [];
    data = data.reverse();
    data.map(item => {
      if (item.id > cacheItem.id) {
        app.redis.rpush('data', JSON.stringify(item));
        app.redis.lpop('data');
        console.log(item);
        res.push(item);
      }
    });
    return res;
  }
}
module.exports = PayController;
