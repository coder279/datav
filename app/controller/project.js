const Controller = require('egg').Controller;

class ProjectController extends Controller {
    async projectDetailHandler(){
        const { ctx } = this
        const { page } = ctx.query
        let data = {}
        let res = {}
        data = await ctx.service.project.projectDetail(page)
        if(!data){
            res = ctx.response.ResponseList(1,"data is empty",null)
        }else{
            res = ctx.response.ResponseList(0,"success",data)
        }
        ctx.body = res

    }
}
module.exports = ProjectController