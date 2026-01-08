module.exports = {
   default: {
        tags: process.env.npm_config_TAGS || "",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "src/test/features/**/*.feature"
        ],
        require: [
            "src/hooks/**/*.ts",
            "src/test/steps/**/*.ts",
            "src/test/support/**/*.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:reports/cucumber-report.html",
            "json:reports/cucumber-report.json",
            "rerun:@reports/rerun.txt"
        ],
        publishQuiet: true,
        dryRun: false,
        parallel: 1
    },
    
    rerun: {
        formatOptions: {
            snippetInterface: "async-await"
        },

        require: [
            "src/hooks/**/*.ts",
            "src/test/steps/**/*.ts",
            "src/test/support/**/*.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:reports/cucumber-report.html",
            "json:reports/cucumber-report.json",
            "rerun:@reports/rerun.txt"
        ],
        publishQuiet: true,
        dryRun: false,
        parallel: 2
    }
};