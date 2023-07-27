export abstract class Database {
    abstract onAttach(): void;
    abstract onDetach(): void;
}
