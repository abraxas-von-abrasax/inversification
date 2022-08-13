import { setupIOC } from '../lib';

const file = `@injectable()`;

const files = ['a.ts', 'b.ts', 'c'];
const cFiles = ['inner-a.ts', 'inner-b.ts'];

jest.mock('path', () => ({
    resolve: jest.fn((_, b) => b),
    sep: '/',
}))

jest.mock('fs', () => ({
    readdirSync: jest.fn(dir => {
        if (dir === 'c') {
            return cFiles;
        }
        return files;
    }),
    readFileSync: jest.fn(() => Buffer.from(file)),
    lstatSync: jest.fn((el: string) => ({
        isDirectory: jest.fn(() => !el.endsWith('.ts')),
    }))
}))

describe('setup-ioc', () => {
    it('should setupIOC correctly', () => {
        const res = setupIOC();
        expect(res).toStrictEqual(['./a', './b', './c/inner-a', './c/inner-b']);
    });
});
