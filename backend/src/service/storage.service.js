const ImageKit=require("@imagekit/nodejs")

const { toFile } = require("@imagekit/nodejs");

const imageKit=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
})

async function uploadFile(file,fileName){
    const response=await imageKit.files.upload({
        file:await toFile(file,fileName),
        fileName:fileName,
    })

    return response
}

module.exports={
    uploadFile
}