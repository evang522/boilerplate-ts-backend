import ControllerInterface from '../../Infrastructure/Api/Controller/ControllerInterface';
import express from 'express';
import AppConfig from '../Configuration/Appconfig';
import diContainer from '../../Infrastructure/DependencyInjection/Container/instance';
import cors from 'cors';

class Application
{
    private readonly app: express.Application;

    public constructor(
        controllers: ControllerInterface[],
        private appConfig: AppConfig = diContainer.get(AppConfig),
    )
    {
        this.app = express();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
    }

    private initializeMiddleware(): void
    {
        this.app.use(cors());
        this.app.use(express.json());
        this.setupStaticFolder();
    }

    private setupStaticFolder(): void
    {
        this.app.use(express.static('public'));
    }

    private initializeControllers(controllers: ControllerInterface[]): void
    {
        controllers.forEach((controller: ControllerInterface) =>
        {
            controller.initialize(this.app);
        });
    }

    public listen(): void
    {
        this.app.listen(this.appConfig.getPort());
    }
}
export default Application;
