'use strict'

module.exports = async function errorHandler(ctx, next){
    try{
        await next()
    }catch(err){
        app.emit('error',err,this)
        const status = err.status || 500
        const error = status === 500 && app.config.env === 'prod'
        ? 'Server Error'
        : err.message
        ctx.body = {error}
        if (status === 422){
            ctx.body.detail = err.errors
        }
        ctx.status = status
    }
}