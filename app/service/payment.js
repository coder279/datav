'use strict';

const Service = require('egg').Service;
const await = require('await-stream-ready/lib/await');

class Payment extends Service {
    async init(){
        const { ctx } = this
        return {error:0}
    }
    async payment(item_id,item_type){
        const sequelize = this.app.model;
        let data = {}
        let query
        query = `select payment_record.id,total,user_id,item_id,item_type,note,users.name from payment_record left join users on payment_record.user_id = users.id order by payment_record.id desc limit 10`
        data = await sequelize.query(query,{ raw: true , type: this.app.Sequelize.QueryTypes.SELECT})
        return data
    }

}
module.exports = Payment;
