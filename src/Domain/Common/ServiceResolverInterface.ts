export default interface ServiceResolverInterface<TService = any> {
    resolveService(): TService;
}
