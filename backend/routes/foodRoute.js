import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"
import path from "path"

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

// Validação de arquivo
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
})

// Routes
foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood);

export default foodRouter;