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

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

const images = fs
  .readdirSync(inputFolder)
  .filter((file) => file.match(/\.(jpg|jpeg|png|webp)$/i));

async function processImage(imageName) {
  const inputPath = path.join(inputFolder, imageName);
  const baseName = path.parse(imageName).name;

  console.log("Procesando:", imageName);

  for (const [label, width] of Object.entries(SIZES)) {
    // 1x versión
    const out1x = `${baseName}-${label}-1x.jpg`;
    await sharp(inputPath)
      .resize({ width: width })
      .jpeg({ quality: 80 })
      .toFile(path.join(outputFolder, out1x));

    // 2x versión
    const out2x = `${baseName}-${label}-2x.jpg`;
    await sharp(inputPath)
      .resize({ width: width * 2 })
      .jpeg({ quality: 85 })
      .toFile(path.join(outputFolder, out2x));
  }
}

async function start() {
  console.log("Generando versiones redimensionadas");

  for (const img of images) {
    await processImage(img);
  }
}

start();