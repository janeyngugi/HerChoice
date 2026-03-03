const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.resolve(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(filePath));
        } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
            results.push(filePath);
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'client/src'));
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('`/api/')) {
        content = content.replace(/`\/api\//g, '`${import.meta.env.VITE_API_URL}/api/');
        fs.writeFileSync(file, content, 'utf8');
        console.log('Restored', file);
    }
});
