import fs from 'fs';
import path from 'path';
import { Constant } from './constants';

const CURRENT_FILE = __filename.replace(/(dist|lib|out)/, 'src').replace('.js', '.ts');

export function setupIOC(srcDirectory = 'src', debug = false): string[] {
    const filePaths = getFilesRecursively(srcDirectory, debug, undefined)
        .filter(filePath => filePath.absPath !== CURRENT_FILE);
    return filePaths
        .filter(filePath => isDecorated(filePath.absPath))
        .map(filePath => filePath.importable)
        .map(filePath => filePath.replace('.ts', ''));
}

function getFilesRecursively(srcDirectory: string, debug = false, dir = '.'): Array<{ absPath: string; importable: string }> {
    const absDirPath = path.resolve(process.cwd(), srcDirectory);
    const entries = fs.readdirSync(absDirPath);

    const files = [];

    for (const entry of entries) {
        if (debug && entry === __filename) {
            // exclude this file
            continue;
        }

        const entryPath = path.resolve(srcDirectory, entry);
        const importablePath = dir + path.sep + entry;
        if (fs.lstatSync(entryPath).isDirectory()) {
            files.push(...getFilesRecursively(entryPath, debug, importablePath));
        } else {
            files.push({ absPath: entryPath, importable: importablePath });
        }
    }

    return files;
}

function isDecorated(filePath: string, decorator = Constant.INJECTABLE_NAME) {
    const contentBuf = fs.readFileSync(filePath);
    const content = Buffer.from(contentBuf).toString('utf8');
    return content.includes(decorator);
}
