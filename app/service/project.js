'use strict';

const Service = require('egg').Service;
const await = require('await-stream-ready/lib/await');

class Project extends Service {
    async init(){
        const { ctx } = this
        return {error:0}
    }
    
    async projectDetail(page){
        const sequelize = this.app.model;
        let data = {}
        let query
        query = `select g.type as groupType,g.name as groupName,g.often_name as oftenName,g.description as groupDescription,g.content as groupContent,g.logo as groupCover,g.star_level as level,title,project.cover,project.thumb,end_time,t.name,t.picture,project.content,money,project.id as projectId,project.group_id as groupId,project.match_ratio,project.match_firm,project.donation,project.description,project.project_state as projectState,project.province,project.city,project.poster,project.is_lq from project 
        left join project_type as t on project.project_type = t.id
        left join groups as g on g.id = project.group_id  limit 1 offset ${page}`
        data = await sequelize.query(query,{ raw: true , type: this.app.Sequelize.QueryTypes.SELECT})
        data[0]['url'] = "http://www.baidu.com"
        return data
    }
}
module.exports = Project;
