import QueryBusInterface from '../QueryBusInterface';
import QueryHandlerInterface from '../QueryHandlerInterface';
import QueryInterface from '../QueryInterface';
import ServiceResolverInterface from '../../../../Domain/Common/ServiceResolverInterface';

export default interface TestableQueryBusInterface extends QueryBusInterface {
    queryIsRegisteredToAHandler(commandId: string): boolean;
    queryIsRegisteredToHandler(commandId: string, commandHandlerClass: Function): boolean;
    mockHandlerForQuery(commandId: string, commandHandler: ServiceResolverInterface<QueryHandlerInterface<any>>): void;
    getCallHistory(): QueryInterface[];
    restore(): void;
}
