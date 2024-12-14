import { z } from 'zod';

const configSchema = z.object({
    VITE_FIREBASE_API_KEY: z.string(),
    VITE_FIREBASE_AUTH_DOMAIN: z.string(),
    VITE_FIREBASE_PROJECT_ID: z.string(),
    VITE_FIREBASE_STORAGE_BUCKET: z.string(),
    VITE_FIREBASE_MESSAGING_SENDER_ID: z.string(),
    VITE_FIREBASE_APP_ID: z.string(),
});

type configSchemaType = z.infer<typeof configSchema>;

class Config {
    public readonly FIREBASE_API_KEY: string;
    public readonly FIREBASE_AUTH_DOMAIN: string;
    public readonly FIREBASE_PROJECT_ID: string;
    public readonly FIREBASE_STORAGE_BUCKET: string;
    public readonly FIREBASE_MESSAGING_SENDER_ID: string;
    public readonly FIREBASE_APP_ID: string;

    constructor() {
        const parsedConfig = configSchema.safeParse(import.meta.env);
        if (!parsedConfig.success) {
            const missingKeys = parsedConfig.error.errors.map(e => e.path.join('.'));
            throw new Error(`Missing environment variables: ${missingKeys.join(', ')}`);
        }
        const config: configSchemaType = parsedConfig.data;
        this.FIREBASE_API_KEY = config.VITE_FIREBASE_API_KEY;
        this.FIREBASE_AUTH_DOMAIN = config.VITE_FIREBASE_AUTH_DOMAIN;
        this.FIREBASE_PROJECT_ID = config.VITE_FIREBASE_PROJECT_ID;
        this.FIREBASE_STORAGE_BUCKET = config.VITE_FIREBASE_STORAGE_BUCKET;
        this.FIREBASE_MESSAGING_SENDER_ID = config.VITE_FIREBASE_MESSAGING_SENDER_ID;
        this.FIREBASE_APP_ID = config.VITE_FIREBASE_APP_ID;
    }
}

export default new Config();
