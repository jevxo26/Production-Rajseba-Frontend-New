const fs = require('fs');
const path = require('path');

function replaceStylesInTag(tagContent) {
    let newTag = tagContent;
    let newClasses = [];

    // Extract objectFit: "cover"
    if (newTag.match(/style=\{\{\s*objectFit:\s*"cover"\s*\}\}/)) {
        newClasses.push('object-cover');
        newTag = newTag.replace(/style=\{\{\s*objectFit:\s*"cover"\s*\}\}/, '');
    } else if (newTag.match(/style=\{\{\s*objectFit:\s*"cover",\s*objectPosition:\s*"([^"]+)"\s*\}\}/)) {
        let match = newTag.match(/style=\{\{\s*objectFit:\s*"cover",\s*objectPosition:\s*"([^"]+)"\s*\}\}/);
        newClasses.push('object-cover');
        let pos = match[1];
        if (pos.includes(' ')) {
            newClasses.push(`object-[${pos.replace(/ /g, '_')}]`);
        } else {
            newClasses.push(`object-${pos}`);
        }
        newTag = newTag.replace(/style=\{\{\s*objectFit:\s*"cover",\s*objectPosition:\s*"([^"]+)"\s*\}\}/, '');
    }
    
    // Extract scrollbarWidth style
    if (newTag.match(/style=\{\{\s*scrollbarWidth:\s*'none',\s*msOverflowStyle:\s*'none'\s*\}\}/)) {
        newClasses.push('[&::-webkit-scrollbar]:hidden', '[-ms-overflow-style:none]', '[scrollbar-width:none]');
        newTag = newTag.replace(/style=\{\{\s*scrollbarWidth:\s*'none',\s*msOverflowStyle:\s*'none'\s*\}\}/, '');
    }

    if (newClasses.length > 0) {
        // If className already exists
        if (newTag.match(/className="([^"]*)"/)) {
            newTag = newTag.replace(/className="([^"]*)"/, (m, cls) => {
                return `className="${newClasses.join(' ')} ${cls}"`;
            });
        } else {
            // Append className before the closing slash if it's self-closing
            if (newTag.endsWith('/>')) {
                newTag = newTag.replace(/\/\>$/, ` className="${newClasses.join(' ')}" />`);
            } else {
                newTag = newTag + ` className="${newClasses.join(' ')}"`;
            }
        }
    }

    // Clean up multiple spaces
    newTag = newTag.replace(/\s+/g, ' ');
    // Restore newline before />
    newTag = newTag.replace(/ \/\>$/, ' />');

    return newTag;
}

async function walk(dir) {
    const list = await fs.promises.readdir(dir, { withFileTypes: true });
    for (const file of list) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            await walk(fullPath);
        } else if (file.name.endsWith('.tsx') || file.name.endsWith('.jsx')) {
            let content = await fs.promises.readFile(fullPath, 'utf8');
            
            // Replace in <Image ... />
            // Since <Image can span multiple lines, we need a regex to match the whole tag
            // Using a greedy match is dangerous, so we'll match <Image[^>]+/> or <div[^>]+>
            let originalContent = content;
            
            // Regex to match <Image ... /> and <div ... > that contains style={{...}}
            content = content.replace(/<(Image|div)[^>]*style=\{\{.*?\}\}[^>]*>/g, (match) => {
                // If it contains a backgroundImage style, skip it
                if (match.includes('backgroundImage:')) return match;
                return replaceStylesInTag(match);
            });

            if (content !== originalContent) {
                await fs.promises.writeFile(fullPath, content, 'utf8');
                console.log('Updated', fullPath);
            }
        }
    }
}

walk('f:\\office jevxo\\Rajseba-Frontend-main\\Rajseba-Frontend-main\\src\\app\\services').then(() => {
    console.log('Done');
});
