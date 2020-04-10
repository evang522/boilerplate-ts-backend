import ServiceResolverInterface from '../../../Domain/Common/ServiceResolverInterface';

class BusInstanceServiceResolver<TService> implements ServiceResolverInterface<TService>
{
    public constructor(private serviceInstance: TService)
    {}

    public resolveService(): TService
    {
        return this.serviceInstance;
    }
}

export default BusInstanceServiceResolver;
