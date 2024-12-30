const fs = require('node:fs/promises');
const path = require('node:path');

const createFolder = async (name) => {
    const actualPath = path.join(process.cwd(), name);
    try {
        await fs.rmdir(actualPath, {recursive: true});
    } catch (error) {
        return;
    }

    await fs.mkdir(actualPath);
    const stat = await fs.stat(actualPath);

    console.log(`Is folder ${name} a folder? `, stat.isDirectory(), `\n Path to folder ${name}: `, actualPath);

    for (let i = 0; i < 5; i++) {
        const filePath = path.join(actualPath, `${(i + 1).toString()}.txt`);

        await fs.appendFile(filePath, "");
        const stat = await fs.stat(filePath);

        console.log(`Is file ${i + 1} in folder ${name} a file? `, stat.isFile(), `\n Path to file ${i + 1}: `, filePath);
    }
}

void createFolder("1");
void createFolder("2");
void createFolder("3");
void createFolder("4");
void createFolder("5");