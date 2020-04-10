import { Container } from 'inversify';
import ServiceId from '../ServiceId';
import EventBus from '../../Bus/EventBus/EventBus';
import EventBusInterface from '../../Bus/EventBus/EventBusInterface';
import CommandBus from '../../Bus/CommandBus/CommandBus';
import CommandBusInterface from '../../Bus/CommandBus/CommandBusInterface';
import QueryBus from '../../Bus/QueryBus/QueryBus';
import QueryBusInterface from '../../Bus/QueryBus/QueryBusInterface';
import TestableCommandBus from '../../Bus/CommandBus/Test/TestableCommandBus';
import TestableQueryBus from '../../Bus/QueryBus/Test/TestableQueryBus';
import AppConfig from '../../../Application/Configuration/Appconfig';
import {
    getRepository, Repository,
} from 'typeorm';

class ServiceBinder
{
    public constructor(private appConfig: AppConfig = AppConfig.fromEnvironment())
    {
    }

    public static bindApplicationServicesToContainer(container: Container): void
    {
        const self = new this();
        self.createContainerBindingsBasedOnEnvironment(container);
    }

    private createContainerBindingsBasedOnEnvironment(container: Container): void
    {
        this.createGlobalBindings(container);

        if (this.appConfig.inAnyEnvironment([ 'production' ]))
        {
            this.loadProdEnvironmentBindings(container);

            return;
        }

        if (this.appConfig.inEnvironment('development'))
        {
            this.loadDevEnvironmentBindings(container);

            return;
        }

        if (this.appConfig.inEnvironment('test'))
        {
            this.loadTestEnvironmentBindings(container);

            return;
        }
    }

    private loadTestEnvironmentBindings(container: Container): void
    {
        const commandBus = new TestableCommandBus();
        container.bind(CommandBus).toConstantValue(commandBus);
        container.bind<CommandBusInterface>(ServiceId.CommandBusInterface).toConstantValue(commandBus);

        const queryBus = new TestableQueryBus();
        container.bind(QueryBus).toConstantValue(queryBus);
        container.bind<QueryBusInterface>(ServiceId.QueryBusInterface).toConstantValue(queryBus);
    }

    private loadDevEnvironmentBindings(container: Container): void
    {
        const commandBus = new CommandBus();
        container.bind(CommandBus).toConstantValue(commandBus);
        container.bind<CommandBusInterface>(ServiceId.CommandBusInterface).toConstantValue(commandBus);

        const queryBus = new QueryBus();
        container.bind(QueryBus).toConstantValue(queryBus);
        container.bind<QueryBusInterface>(ServiceId.QueryBusInterface).toConstantValue(queryBus);
    }

    private loadProdEnvironmentBindings(container: Container): void
    {
        const commandBus = new CommandBus();
        container.bind(CommandBus).toConstantValue(commandBus);
        container.bind<CommandBusInterface>(ServiceId.CommandBusInterface).toConstantValue(commandBus);

        const queryBus = new QueryBus();
        container.bind(QueryBus).toConstantValue(queryBus);
        container.bind<QueryBusInterface>(ServiceId.QueryBusInterface).toConstantValue(queryBus);
    }

    private createGlobalBindings(container: Container): void
    {
        // Bind Event, Command, and Query Bus
        const eventBus = new EventBus(container);
        container.bind(EventBus).toConstantValue(eventBus);
        container.bind<EventBusInterface>(ServiceId.EventBusInterface).toConstantValue(eventBus);

        const appConfig = AppConfig.fromEnvironment();
        container.bind(ServiceId.AppConfig).toConstantValue(appConfig);
        container.bind(AppConfig).toConstantValue(appConfig);

        // Bind Entity Repository Factory
        container.bind(ServiceId.EntityRepositoryFactory).toFactory<Repository<any>>(() =>
        {
            return (entity: any): Repository<any> =>
            {
                return getRepository(entity);
            };
        });
    }
}

export default ServiceBinder;
