const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../public/content/official_docs');
const OUTPUT_FILE = path.join(__dirname, '../public/data/bibliographyData.json');

// Helper to normalize strings for matching (remove accents, lowercase, special chars)
const normalize = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
};

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('bibliografia_annas_archive.md')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

console.log('Scanning for bibliography files...');
const files = getAllFiles(CONTENT_DIR);
console.log(`Found ${files.length} bibliography files.`);

const database = {};

files.forEach(filePath => {
    // Extract Subject Name from the directory name (parent folder of the md file)
    const parentDir = path.basename(path.dirname(filePath));
    const content = fs.readFileSync(filePath, 'utf8');

    // Parse links: [LINK: Title](url)
    const regex = /\[LINK:\s*(.*?)\]\((.*?)\)/g;
    let match;
    const links = [];

    while ((match = regex.exec(content)) !== null) {
        links.push({
            title: match[1].trim(),
            url: match[2].trim()
        });
    }

    if (links.length > 0) {
        // Use normalized subject name as key
        const key = normalize(parentDir);

        // Handle collisions (rare, but possible if multiple unis have same subject name)
        if (!database[key]) {
            database[key] = [];
        }
        database[key].push(...links);
    }
});

console.log(`Extracted resources for ${Object.keys(database).length} unique subjects.`);

// Ensure output dir exists
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(database, null, 2));
console.log(`Database written to ${OUTPUT_FILE}`);
