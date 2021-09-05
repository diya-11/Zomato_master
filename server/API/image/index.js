// Libraries
import express from "express";
import passport from "passport";
import AWS from "aws-sdk";
import multer from "multer";

// Database modal
import { ImageModel } from "../../database/allModels";

// Utils
import { s3Upload } from "../../Utils/AWS/s3";

const Router = express.Router();

// Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });



/*
Route     /image
Des       upload given image to S3 bucket, and return saves file link to mongodb
Params    none
Access    Public
Method    POST
*/
Router.post("/", upload.single("file"), async (req, res) => {
    try{
        const file = req.file;

        const bucketOptions = {
            Bucket: "zomatoawsbucket",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.minetype,
            ACL: "public-read",
        };

        const uploadImage = await s3Upload(bucketOptions);

        return res.status(200).json({ uploadImage: "yay" });
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;