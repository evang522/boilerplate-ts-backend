export default interface QueryHandlerInterface<ICommand> {
    handle(command: ICommand): any;
}
