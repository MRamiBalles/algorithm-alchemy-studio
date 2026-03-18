const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const baseDir = path.join(process.cwd(), 'public/content/official_docs');
const outputFilename = 'plan_contenidos.md';

async function extractContents(pdfPath) {
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdf(dataBuffer);
        const text = data.text;

        // Try to find the contents section
        // Common headers: "8. CONTENIDOS", "TEMARIO", "PROGRAMA", "CONTENIDOS Y TEMARIO"
        // We look for a section that usually follows a number or a clear header.
        
        const contentMarkers = [
            /Programa\s+detallado:\s*\n/i,
            /Descripción\s+de\s+contenidos\s+mínimos:\s*\n/i,
            /CONTENIDOS\s*\n/i,
            /TEMARIO\s*\n/i,
            /PROGRAMA\s*\n/i,
            /8\.\s+CONTENIDOS/i,
            /6\.\s+CONTENIDOS/i,
            /5\.\s+CONTENIDOS/i,
            /Contenidos\s+de\s+la\s+Asignatura/i,
            /BLOQUE\s+\d/i
        ];

        let contentStart = -1;
        for (const marker of contentMarkers) {
            const match = text.match(marker);
            if (match) {
                contentStart = match.index;
                break;
            }
        }

        if (contentStart === -1) {
            return "No se ha podido extraer el temario detallado automáticamente del PDF.";
        }

        // Try to find the end of the section (usually the next numbered section or a horizontal line equivalent)
        // Next sections are often "METODOLOGÍA", "EVALUACIÓN", "BIBLIOGRAFÍA"
        const nextMarkers = [
            /\nPrograma\s+detallado\s+en\s+inglés/i,
            /\nCompetencias\s+de\s+la\s+asignatura/i,
            /\nResultados\s+de\s+aprendizaje/i,
            /\n\d\.\s+METODOLOGÍA/i,
            /\n\d\.\s+EVALUACIÓN/i,
            /\n\d\.\s+SISTEMA\s+DE\s+EVALUACIÓN/i,
            /\n\d\.\s+BIBLIOGRAFÍA/i,
            /\nMETODOLOGÍA/i,
            /\nEVALUACIÓN/i,
            /\nBIBLIOGRAFÍA/i
        ];

        let contentEnd = text.length;
        for (const marker of nextMarkers) {
            const match = text.slice(contentStart + 10).match(marker); // look after the start
            if (match) {
                contentEnd = contentStart + 10 + match.index;
                break;
            }
        }

        let extracted = text.slice(contentStart, contentEnd).trim();
        
        // Clean up some common PDF artifacts (like multiple newlines or page numbers if they appear)
        extracted = extracted.replace(/\n\s*\n/g, '\n');
        
        return extracted;
    } catch (err) {
        return `Error al procesar el PDF: ${err.message}`;
    }
}

async function processDirectory(dir, university, career) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    // If it's a subject directory (contains a PDF)
    const pdfFile = entries.find(e => e.isFile() && e.name.endsWith('.pdf'));
    const bibFile = entries.find(e => e.isFile() && e.name === 'bibliografia_annas_archive.md');

    if (pdfFile) {
        const subjectName = path.basename(dir);
        console.log(`Processing subject: ${subjectName} (${university} / ${career})`);
        
        const contents = await extractContents(path.join(dir, pdfFile.name));
        
        let markdown = `# Plan de Contenidos: ${subjectName}\n\n`;
        markdown += `**Universidad:** ${university}\n`;
        markdown += `**Carrera:** ${career}\n`;
        markdown += `**Documento Original:** [${pdfFile.name}](./${encodeURIComponent(pdfFile.name)})\n\n`;
        
        markdown += `## Índice de Contenidos\n\n`;
        markdown += `\`\`\`text\n${contents}\n\`\`\`\n\n`;
        
        if (bibFile) {
            markdown += `## Bibliografía Recomendada\n\n`;
            markdown += `Puedes encontrar la bibliografía detallada en [bibliografia_annas_archive.md](./bibliografia_annas_archive.md)\n`;
        }
        
        fs.writeFileSync(path.join(dir, outputFilename), markdown);
    } else {
        // Recurse into subdirectories
        for (const entry of entries) {
            if (entry.isDirectory()) {
                const newUniversity = university || (dir === baseDir ? entry.name : university);
                const newCareer = career || (university && dir !== baseDir ? entry.name : career);
                await processDirectory(path.join(dir, entry.name), newUniversity, newCareer);
            }
        }
    }
}

async function run() {
    console.log("Starting index generation...");
    await processDirectory(baseDir);
    console.log("Finished generation.");
    
    // Generate UNIVERSITAS_INDEX.md
    await generateMasterIndex();
}

async function generateMasterIndex() {
    console.log("Generating master index...");
    let indexMd = `# Índice Global de Universitas\n\n`;
    
    const walk = (dir, depth = 0) => {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isDirectory()) {
                const fullPath = path.join(dir, entry.name);
                const relPath = path.relative(baseDir, fullPath);
                const planPath = path.join(fullPath, outputFilename);
                
                if (fs.existsSync(planPath)) {
                    indexMd += `${'  '.repeat(depth)}- [${entry.name}](./${relPath.replace(/\\/g, '/')}/${outputFilename})\n`;
                } else {
                    indexMd += `${'  '.repeat(depth)}### ${entry.name}\n`;
                    walk(fullPath, depth + 1);
                }
            }
        }
    };
    
    walk(baseDir);
    fs.writeFileSync(path.join(baseDir, 'UNIVERSITAS_INDEX.md'), indexMd);
}

run();
