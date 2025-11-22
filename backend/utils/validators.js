import validator from 'validator';

// Validador para dados de food
export const validateFoodData = (data) => {
    const errors = [];

    // Validar nome
    if (!data.name || validator.isEmpty(data.name.trim())) {
        errors.push('Name is required');
    } else if (data.name.length < 2) {
        errors.push('Name must be at least 2 characters long');
    } else if (data.name.length > 100) {
        errors.push('Name must not exceed 100 characters');
    }

    // Validar descrição
    if (!data.description || validator.isEmpty(data.description.trim())) {
        errors.push('Description is required');
    } else if (data.description.length < 5) {
        errors.push('Description must be at least 5 characters long');
    } else if (data.description.length > 500) {
        errors.push('Description must not exceed 500 characters');
    }

    // Validar preço
    if (!data.price) {
        errors.push('Price is required');
    } else if (isNaN(data.price)) {
        errors.push('Price must be a valid number');
    } else if (parseFloat(data.price) <= 0) {
        errors.push('Price must be greater than 0');
    } else if (parseFloat(data.price) > 999999) {
        errors.push('Price is too high');
    }

    // Validar categoria
    if (!data.category || validator.isEmpty(data.category.trim())) {
        errors.push('Category is required');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

// Validar ID do MongoDB
export const validateMongoId = (id) => {
    if (!id) {
        return { isValid: false, error: 'ID is required' };
    }

    // Validar formato de ObjectId do MongoDB
    const mongoIdPattern = /^[0-9a-fA-F]{24}$/;
    if (!mongoIdPattern.test(id)) {
        return { isValid: false, error: 'Invalid ID format' };
    }

    return { isValid: true };
};
