const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const sourceDir = 'D:/AA-1/algorithm-alchemy-studio/public/content/mbhb';
const destDir = 'D:/AA-1/algorithm-alchemy-studio/public/content/official_docs/uhu_computer_engineering';

const normalizeName = (name) => {
    return name.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, '').trim().replace(/\s+/g, '_');
};

async function processFiles() {
    // Modify to allow CommonJS execution context to find files
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.pdf'));
    const log = [];

    console.log(`Found ${files.length} PDF files.`);

    for (const file of files) {
        const filePath = path.join(sourceDir, file);
        try {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdf(dataBuffer);
            const text = data.text;

            // Extract Name
            // Pattern: "Nombre:\n\n<Name>" or "Nombre: <Name>"
            // Based on view_file output, it looks like "Nombre:\n\nMATEMÁTICAS I"

            let nameMatch = text.match(/Nombre:\s*\n*(.+)/i) || text.match(/Nombre:\s+(.+)/i);

            // Backup search if explicit "Nombre:" is missing or weird
            if (!nameMatch) {
                // Try to find "ASIGNATURA" followed by something
                nameMatch = text.match(/ASIGNATURA\s*\n*(.+)/i);
            }

            let subjectName = "Unknown";
            if (nameMatch) {
                subjectName = nameMatch[1].trim();
                // Sometimes the captured line is too long or includes garbage, truncate if needed
                if (subjectName.length > 100) subjectName = subjectName.substring(0, 100).trim();
            }

            // Code
            let codeMatch = file.match(/\d+/); // Usually in filename
            let code = codeMatch ? codeMatch[0] : "000";

            const safeName = normalizeName(subjectName);
            const newFilename = `${code}_${safeName}.pdf`;
            const destPath = path.join(destDir, newFilename);

            // Move (Rename)
            // Use copy instead of rename to avoid permissions issues across logical moves if any, or just purely safer
            fs.copyFileSync(filePath, destPath);
            fs.unlinkSync(filePath); // Delete original

            console.log(`Moved: ${file} -> ${newFilename}`);

            log.push({ original: file, new: newFilename, subject: subjectName, contentSnippet: text.substring(0, 500) });

        } catch (err) {
            console.error(`Error processing ${file}:`, err.message);
        }
    }

    // Write log
    fs.writeFileSync(path.join(destDir, 'processing_log.json'), JSON.stringify(log, null, 2));
}

processFiles();
