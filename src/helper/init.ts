const fs = require("fs-extra")


try
{
    fs.ensureDirSync("reports/"); // Ensure reports directory exists
    fs.emptyDirSync("reports/"); // Clear previous reports
    console.log("Reports directory is ready.");

}catch(err)
{
    console.log("Error creating reports directory: ", err);
}