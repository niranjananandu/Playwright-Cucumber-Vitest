import {chromium, firefox, webkit} from '@playwright/test';    

export const invokeBrowser = () =>{
    const browserType = process.env.BROWSER || 'chromium';
    switch(browserType.toLowerCase()){
        case 'chrome':
            return chromium.launch({ headless: false });
        case 'chromium':
            return chromium.launch({ headless: false });
        case 'firefox':
            return firefox.launch({ headless: false });
        case 'webkit':
            return webkit.launch({ headless: false });
        default:
            throw new Error(`Unsupported browser type: ${browserType}`);
    }
}