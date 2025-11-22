import foodModel from "../models/foodModel.js";
import fs from "fs";
import { validateFoodData, validateMongoId } from "../utils/validators.js";

// add food item
const addFood = async (req, res) => {
  try {
    console.log("📥 Requisição recebida em /api/food/add");
    console.log("📋 req.body:", req.body);
    console.log("📎 req.file:", req.file ? `${req.file.filename} (${req.file.size} bytes)` : "não enviado");

    // Validar se o arquivo foi enviado
    if (!req.file) {
      console.log("❌ Erro: Imagem não enviada");
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    // Validar campos obrigatórios com validador customizado
    const validation = validateFoodData(req.body);
    console.log("🔍 Resultado da validação:", validation);

    if (!validation.isValid) {
      console.log("❌ Validação falhou:", validation.errors);
      // Remover o arquivo enviado se a validação falhar
      fs.unlinkSync(`uploads/${req.file.filename}`);
      return res.status(400).json({ success: false, message: "Validation failed", errors: validation.errors });
    }

    const { name, description, price, category } = req.body;
    let image_filename = req.file.filename;

    const food = new foodModel({
      name: name.trim(),
      description: description.trim(),
      price,
      category: category.trim(),
      image: image_filename,
    });

    await food.save();
    console.log("✅ Food item adicionado com sucesso:", food._id);
    res.status(201).json({ success: true, message: "Food added successfully", data: food });
  } catch (error) {
    console.error("❌ Error adding food:", error);
    // Remover o arquivo enviado em caso de erro
    if (req.file && fs.existsSync(`uploads/${req.file.filename}`)) {
      fs.unlinkSync(`uploads/${req.file.filename}`);
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.error("Error listing foods:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;

    // Validar se o ID foi fornecido e é válido
    const idValidation = validateMongoId(id);
    if (!idValidation.isValid) {
      return res.status(400).json({ success: false, message: idValidation.error });
    }

    const food = await foodModel.findById(id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Remover a imagem do sistema de arquivos
    const imagePath = `uploads/${food.image}`;
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await foodModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    console.error("Error removing food:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addFood, listFood, removeFood };
