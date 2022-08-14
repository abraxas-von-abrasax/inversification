import fs from 'fs';
import path from 'path';
import { Constant } from './constants';

export namespace InversificationDiscover {
    export function getFilesRecursively(srcDirectory: string, dir = '.'): Array<{ absPath: string; importable: string }> {
        const absDirPath = path.resolve(process.cwd(), srcDirectory);
        const entries = fs.readdirSync(absDirPath);

        const files = [];

        for (const entry of entries) {
            const entryPath = path.resolve(srcDirectory, entry);
            const importablePath = dir + path.sep + entry;
            if (fs.lstatSync(entryPath).isDirectory()) {
                files.push(...getFilesRecursively(entryPath, importablePath));
            } else {
                files.push({ absPath: entryPath, importable: importablePath });
            }
        }

        return files;
    }

    export function isDecorated(filePath: string, decorator = Constant.INJECTABLE_NAME) {
        const contentBuf = fs.readFileSync(filePath);
        const content = Buffer.from(contentBuf).toString('utf8');
        return content.includes(decorator);
    }
}
