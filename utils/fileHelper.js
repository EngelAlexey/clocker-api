const fs = require('fs');
const path = require('path');

// Asegura que el directorio data exista
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

exports.readJson = function(fileName) {
    const filePath = path.join(dataDir, fileName);
    if (!fs.existsSync(filePath)) {
        // Si no existe, crea un archivo con array vacío
        fs.writeFileSync(filePath, '[]'); 
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    try {
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
};

exports.writeJson = function(fileName, data) {
    const filePath = path.join(dataDir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
