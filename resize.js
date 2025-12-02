//Librerias
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = "./img";
const outputFolder = "./dist";

const SIZES = {
  small: 400,
  medium: 800,
  large: 1200,
  xlarge: 1600,
};

//Creamos carpeta si no existe
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

//Obtenemos imagenes validas
const images = fs
  .readdirSync(inputFolder)
  .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

async function processImage(imageName) {
  const inputPath = path.join(inputFolder, imageName);
  const baseName = path.parse(imageName).name;

  console.log("Procesando:", imageName);

  for (const [label, width] of Object.entries(SIZES)) {

    // 1x
    await sharp(inputPath)
      .resize({ width })
      .toFile(`${outputFolder}/${baseName}-${label}-1x.jpg`);

    // 2x
    await sharp(inputPath)
      .resize({ width: width * 2 })
      .toFile(`${outputFolder}/${baseName}-${label}-2x.jpg`);
  }
}

//Funcion procesado principal
(async () => {
  for (const img of images) {
    await processImage(img);
  }
  console.log("Redimensionado de la imagen completado");
})();

//Hecho por francisco Alexandru Babei
