import {chromium, firefox, webkit} from '@playwright/test';    

export const invokeBrowser = () =>{
    const browserType = process.env.BROWSER || 'chromium';
    switch(browserType.toLowerCase()){
        case 'chrome':
            return chromium.launch({ headless: false });
        case 'chromium':
            return chromium.launch({ headless: true });
        case 'firefox':
            return firefox.launch({ headless: true });
        case 'webkit':
            return webkit.launch({ headless: true });
        default:
            throw new Error(`Unsupported browser type: ${browserType}`);
    }
}