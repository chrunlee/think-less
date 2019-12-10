//thinkjs middleware of less compiler
const less = require('less');
const path = require('path');
const fs = require('fs');
const mkdirsp = require('mkdirsp');

module.exports = (options,app)=>{
    return async (ctx,next)=>{
        let extname = path.extname(ctx.path);
        if(extname.toLowerCase() != '.css'){
            return next();
        }
        let filePath = path.join(options.root,ctx.path.substr(0,ctx.path.indexOf('.css'))+'.less');
        let targetPath = path.join(options.target,ctx.path);
        if(!fs.existsSync(filePath)){
            return next();
        }
        let content = Buffer.from(fs.readFileSync(filePath)).toString('utf8');
        try{
            await mkdirsp(path.dirname(targetPath));
            let out = await less.render(content,options.lessOptions)
            fs.writeFileSync(targetPath,out.css);
        }catch(e){
            return Promise.reject(e);
        }
        return next();
    }
}