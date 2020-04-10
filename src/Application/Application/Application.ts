import ControllerInterface from '../../Infrastructure/Api/Controller/ControllerInterface';
import express from 'express';
import AppConfig from '../Configuration/Appconfig';
import container from '../../Infrastructure/DependencyInjection/Container/instance';

class Application
{
    private readonly app: express.Application;

    public constructor(
        controllers: ControllerInterface[],
        private appConfig: AppConfig = container.get(AppConfig),
    )
    {
        this.app = express();
        this.initializeControllers(controllers);
        this.initializeMiddleware();
    }

    private initializeMiddleware(): void
    {
        // nothing
    }

    private initializeControllers(controllers:     ControllerInterface[]): void
    {
        controllers.forEach((controller: ControllerInterface) =>
        {
            controller.initialize(this.app);
        });
    }

    public listen(): void
    {
        console.log(this.appConfig.getPort());
        this.app.listen(this.appConfig.getPort());
    }
}
export default Application;
