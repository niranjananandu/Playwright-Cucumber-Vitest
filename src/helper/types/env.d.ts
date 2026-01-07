export {} // To make this file a module and avoid global scope pollution

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER?: 'chromium' | 'firefox' | 'webkit' | 'chrome';
            BASE_URL?: string;
            ENV: 'prod' | 'dev' | 'qa' | 'staging';
            TIMEOUT?: string;
        }
    }       
}

