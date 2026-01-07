import * as dotenv from "dotenv";
const env = process.env.ENV ?? "staging";
export const getEnv = () =>    {
    dotenv.config({
        override: true,
        path: `src/helper/env/.env.${env}`        

    });

}