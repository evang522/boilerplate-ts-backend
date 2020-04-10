import { injectable } from 'inversify';

@injectable()
class AppConfig
{
    private constructor(
        private environment: ENVIRONMENT,
        private port: number,
    )
    {
        if (!environment || !port)
        {
            throw new Error('Cannot launch app. An Env variable is undefined.');
        }
    }

    public static fromEnvironment(): AppConfig
    {
        return new this(
            process.env.APP_ENV as ENVIRONMENT,
            Number(process.env.PORT),
        );
    }

    public inEnvironment(env: ENVIRONMENT): boolean
    {
        return this.environment === env;
    }

    public inAnyEnvironment(envs: ENVIRONMENT[]): boolean
    {
        return envs.some((env: ENVIRONMENT) => this.inEnvironment(env));
    }

    public getPort(): number
    {
        return this.port;
    }
}

export default AppConfig;

type ENVIRONMENT = 'test' | 'development' | 'production';
