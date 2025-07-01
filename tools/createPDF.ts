import { PDFDocument, StandardFonts, rgb} from "pdf-lib";
import fs from "fs/promises"
import path = require("path");
import fontkit from "@pdf-lib/fontkit";

async function create(){
    const file = await fs.readFile("public/pdf/1.pdf");
    const pdfDoc = await PDFDocument.load(file);
    const page = pdfDoc.getPage(0);
    pdfDoc.registerFontkit(fontkit);
    const fontFile1 = await fs.readFile("tools/Roboto/static/Roboto-Bold.ttf");
    const font1 = await pdfDoc.embedFont(fontFile1);
    const fontFile2 = await fs.readFile("tools/Roboto/static/Roboto-Regular.ttf");
    const font2 = await pdfDoc.embedFont(fontFile2);
    // for (let x = 0; x <= 1500; x += 50) {
    //     for (let y = 0; y <= 1500; y += 50) {
    //         page.drawText(`(${x},${y})`, { x, y, size: 8 });
    //     }
    // }
    const color = rgb(1, 0, 0);
    page.drawText('NGUYỄN VĂN A', {
        x: 900,
        y: 663,
        size: 12,
        font: font1,
        color: color,
    });
    page.drawText('x', {
        x: 835,
        y: 630,
        size: 14,
        font: font1,
        color: color,
    });
    page.drawText('x', {
        x: 874,
        y: 630,
        size: 14,
        font: font1,
        color: color,
    });
    page.drawText('18', {
        x: 975,
        y: 631,
        size: 13,
        font: font1,
        color: color,
    });
    page.drawText('NV0', {
        x: 1085,
        y: 631,
        size: 13,
        font: font1,
        color: color,
    });
    page.drawText('215513224', {
        x: 945,
        y: 603,
        size: 13,
        font: font1,
        color: color,
    });
    page.drawText('18-03-1999', {
        x: 805,
        y: 580,
        size: 13,
        font: font1,
        color: color,
    });
    page.drawText('Phường XX', {
        x: 940,
        y: 580,
        size: 13,
        font: font1,
        color: color,
    });
    page.drawText('01665497520', {
        x: 770,
        y: 530,
        size: 13,
        font: font1,
        color: color,
    });
    page.drawText('Quận abc', {
        x: 740,
        y: 511,
        size: 13,
        font: font1,
        color: color,
    });
    page.drawText('Sản xuất', {
        x: 740,
        y: 490,
        size: 13,
        font: font1,
        color: color,
    });
    page.drawText('Phường abc', {
        x: 780,
        y: 471,
        size: 13,
        font: font1,
        color: color,
    });

    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(path.join(__dirname, "example.pdf"), pdfBytes);
}

async function create2(){
    const file = await fs.readFile("public/pdf/2.pdf");
    const pdfDoc = await PDFDocument.load(file);
    const page = pdfDoc.getPage(0);
    pdfDoc.registerFontkit(fontkit);
    const fontFile1 = await fs.readFile("tools/Roboto/static/Roboto-Bold.ttf");
    const font1 = await pdfDoc.embedFont(fontFile1);
    const color = rgb(1, 0, 0);
    page.drawText('NGUYỄN VĂN A', {
        x: 125,
        y: 567,
        size: 12,
        font: font1,
        color: color,
    });
    page.drawText('Nam', {
        x: 445,
        y: 567,
        size: 12,
        font: font1,
        color: color,
    });
    page.drawText('03/02/1999', {
        x: 140,
        y: 545,
        size: 12,
        font: font1,
        color: color,
    });
    page.drawText('NV0', {
        x: 445,
        y: 545,
        size: 12,
        font: font1,
        color: color,
    });
    page.drawText('Sản xuất', {
        x: 215,
        y: 457,
        size: 12,
        font: font1,
        color: color,
    });
    page.drawText('Phường 10', {
        x: 225,
        y: 414,
        size: 12,
        font: font1,
        color: color,
    });

    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(path.join(__dirname, "example.pdf"), pdfBytes);
}

create2();