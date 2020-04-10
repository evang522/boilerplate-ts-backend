import EventHandlerInterface from '../../../../Infrastructure/Bus/EventBus/EventHandlerInterface';
import ServiceLayerLoaded from './ServiceLayerLoaded';
import { injectable } from 'inversify';
import AppConfig from '../../../Configuration/Appconfig';

@injectable()
class ServiceLayerLoadedHandler implements EventHandlerInterface<ServiceLayerLoaded>
{
    public constructor(private appConfig: AppConfig = AppConfig.fromEnvironment())
    {}

    public handle(event: ServiceLayerLoaded): void
    {
        if (this.appConfig.inEnvironment('development'))
        {
            // eslint-disable-next-line no-console
            console.log('Service layer loaded at: ' + new Date(event.getTimestamp()));
        }
    }
}

export default ServiceLayerLoadedHandler;
