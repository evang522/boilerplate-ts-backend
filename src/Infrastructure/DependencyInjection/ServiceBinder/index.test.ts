import ServiceBinder from './ServiceBinder';
import { Container } from 'inversify';
import EventBus from '../../Bus/EventBus/EventBus';
import CommandBus from '../../Bus/CommandBus/CommandBus';
import ServiceId from '../ServiceId';
import TestableCommandBus from '../../Bus/CommandBus/Test/TestableCommandBus';
import AppConfig from '../../../Application/Configuration/Appconfig';

describe('Binds Proper Services with Global Binding Config', () =>
{
    it('Binds Event Bus', () =>
    {
        const container = new Container();

        ServiceBinder.bindApplicationServicesToContainer(container);

        expect(container.get(EventBus)).toBeInstanceOf(EventBus);
        expect(container.get(ServiceId.EventBusInterface)).toBeTruthy();
    });
    it('Binds Command Bus', () =>
    {
        const container = new Container();

        ServiceBinder.bindApplicationServicesToContainer(container);

        expect(container.get(CommandBus)).toBeInstanceOf(CommandBus);
        expect(container.get(ServiceId.CommandBusInterface)).toBeTruthy();
    });

    it('Binds Correct Versions of Busses in different Environments', () =>
    {
        // Prod Environment
        const prodAppConfig = new AppConfig('production');
        const prodContainer = new Container();

        const prodBinder = new ServiceBinder(prodAppConfig);
        prodBinder['createContainerBindingsBasedOnEnvironment'](prodContainer);

        expect(prodContainer.get(CommandBus)).toBeInstanceOf(CommandBus);

        // Test Environment
        const testAppConfig = new AppConfig('test');
        const testContainer = new Container();

        const testBinder = new ServiceBinder(testAppConfig);
        testBinder['createContainerBindingsBasedOnEnvironment'](testContainer);

        expect(testContainer.get(CommandBus)).toBeInstanceOf(TestableCommandBus);

        // Dev Environment
        const devAppConfig = new AppConfig('development');
        const devContainer = new Container();

        const devBinder = new ServiceBinder(devAppConfig);
        devBinder['createContainerBindingsBasedOnEnvironment'](devContainer);

        expect(devContainer.get(CommandBus)).toBeInstanceOf(CommandBus);
    });

    it('Binds Interfaces', () =>
    {
        const container = new Container();

        ServiceBinder.bindApplicationServicesToContainer(container);

        expect(container.get(ServiceId.AppConfig)).toBeInstanceOf(AppConfig);
    });
});
