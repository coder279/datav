
module.exports  = {
     Response(error,errcode,data){
        res = {
            "error": error,
            "errcode":errcode,
            "data":data[0]
        }
        return res
    },
    ResponseList(error,errcode,data){
        res = {
            "error": error,
            "errcode":errcode,
            "data":data
        }
        return res
    }
}