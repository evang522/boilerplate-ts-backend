import ServiceBinder from '../../Infrastructure/DependencyInjection/ServiceBinder/ServiceBinder';
import container from '../../Infrastructure/DependencyInjection/Container/instance';
import EventBus from '../../Infrastructure/Bus/EventBus/EventBus';
import eventBusConfig from '../../Infrastructure/Bus/EventBus/config';
import commandBusConfig from '../../Infrastructure/Bus/CommandBus/config';
import EventBusConfigInterface from '../../Infrastructure/Bus/EventBus/config/EventBusConfigInterface';
import CommandBusConfigInterface from '../../Infrastructure/Bus/CommandBus/config/CommandBusConfigInterface';
import CommandBus from '../../Infrastructure/Bus/CommandBus/CommandBus';
import QueryBus from '../../Infrastructure/Bus/QueryBus/QueryBus';
import queryBusConfig from '../../Infrastructure/Bus/QueryBus/config';
import QueryBusConfigInterface from '../../Infrastructure/Bus/QueryBus/config/QueryBusConfigInterface';
import BusContainerIdServiceResolver from '../../Infrastructure/Bus/ServiceResolver/BusContainerIdServiceResolver';
import ServiceLayerLoaded from './Event/ServiceLayerLoaded/ServiceLayerLoaded';
import Application from '../Application/Application';
import controllerConfig from '../../Infrastructure/Api/Controller/index.controllerconfig';

class ApplicationLoader
{
    private static mounted: boolean = false;

    public static mount(): void
    {
        const self = new this();

        if (this.mounted)
        {
            return;
        }

        // These commands must be run in the correct order -- DIC must be loaded first.
        self.registerContainerBindings();
        self.registerEventHandlersToBus();
        self.registerCommandHandlersToBus();
        self.registerQueryHandlersToBus();
        self.startApplication();

        this.mounted = true;

        const eventBus = container.get<EventBus>(EventBus);

        // Dispatch Application Loaded event for handlers to hook into, also for dev debugging if needed.
        eventBus.dispatchEvent(new ServiceLayerLoaded());
    }

    private registerContainerBindings(): void
    {
        ServiceBinder.bindApplicationServicesToContainer(container);
    }

    private registerEventHandlersToBus(): void
    {
        const eventBus = container.get<EventBus>(EventBus);

        eventBusConfig.forEach((eventHandlerConfig: EventBusConfigInterface) =>
        {
            eventBus.registerHandlerToEvent(eventHandlerConfig.eventId, eventHandlerConfig.handlerClass);
        });
    }

    private registerCommandHandlersToBus(): void
    {
        const commandBus = container.get<CommandBus>(CommandBus);

        commandBusConfig.forEach((commandHandlerConfig: CommandBusConfigInterface) =>
        {
            commandBus.registerHandlerToCommand(
                commandHandlerConfig.commandId,
                new BusContainerIdServiceResolver(commandHandlerConfig.handlerClass)
            );
        });
    }

    private registerQueryHandlersToBus(): void
    {
        const queryBus = container.get<QueryBus>(QueryBus);

        queryBusConfig.forEach((queryHandlerConfig: QueryBusConfigInterface) =>
        {
            queryBus.registerHandlerToQuery(
                queryHandlerConfig.queryId,
                new BusContainerIdServiceResolver(queryHandlerConfig.handlerClass),
            );
        });
    }

    private startApplication(): void
    {
        const application = new Application(controllerConfig);
        application.listen();
    }
}

export default ApplicationLoader;
