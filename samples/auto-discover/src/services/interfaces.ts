export interface IInnerOneService {
    runInnerOne(): void;
}

export interface IInnerTwoService {
    runInnerTwo(): void;
}

export interface IOuterService {
    runInnerOne(): void;
    runInnerTwo(): void;
}
