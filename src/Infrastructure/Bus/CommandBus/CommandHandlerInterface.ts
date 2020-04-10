export default interface CommandHandlerInterface<ICommand> {
    handle(command: ICommand): any;
}
