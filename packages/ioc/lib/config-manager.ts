import { InversificationStrategy } from './types';

export class ConfigManager {
    private static instance: ConfigManager;

    strategy: InversificationStrategy;

    private constructor() {
        this.strategy = InversificationStrategy.AUTO;
    }

    static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }
}
