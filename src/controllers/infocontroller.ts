import express from "express";

export const infoController = {
    getVersion(req:express.Request,res:express.Response){
        const version:string = "Oshavery v.0.0.1"
        const revision:string = "";
        // バージョンを返す
        console.log(req.path);

        res.json({
            version: version,
            revision: revision
        });
    },

    getServerInfo(){
        // サーバー情報を返す   
    },

    createServerInfo(){

    },

    updateServerInfo(){

    }
}

// module.exports = infoController;