export abstract class InversificationError extends Error {
    protected constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, InversificationError);
    }
}

export class BindingAlreadyExists extends InversificationError {
    constructor(name: string) {
        super(`Cannot register service '${name}'. A binding with this name already exists.`);
    }
}
