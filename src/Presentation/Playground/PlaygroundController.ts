import AbstractController, { TExpressMethods } from '../../Infrastructure/Api/Controller/AbstractController';
import ResponseInterface from '../../Infrastructure/Api/Response/ResponseInterface';
import JsonResponse from '../../Infrastructure/Api/Response/JsonResponse';
import diContainer from '../../Infrastructure/DependencyInjection/Container/instance';
import Container from '../../Domain/Container/Entity/Container';
import { injectable } from 'inversify';
import NewContainerRepository from '../../Infrastructure/Domain/Container/NewContainerRepository';

@injectable()
class PlaygroundController extends AbstractController
{
    constructor(
        private containerRepo: NewContainerRepository = diContainer.get(NewContainerRepository)
    )
    {
        super();
    }

    protected async processRequest(): Promise<ResponseInterface>
    {
        const containerInst = new Container();
        await this.containerRepo.saveOne(containerInst);

        return new JsonResponse({
            container: containerInst.getRepresentation().serializeForListing(),
        });
    }

    public route(): string
    {
        return '/playground';
    }

    public methods(): TExpressMethods
    {
        return [ 'get' ];
    }
}

export default PlaygroundController;
