const ServiceId = {
    EventBusInterface: Symbol.for('app.services.common.infrastructure.event_bus_interface'),

    CommandBusInterface: Symbol.for('app.services.common.infrastructure.command_bus_interface'),

    QueryBusInterface: Symbol.for('app.services.common.infrastructure.query_bus_interface'),

    AppConfig: Symbol.for('app.services.common.infrastructure.app_configuration'),
};

export default ServiceId;
