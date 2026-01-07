const fs = require("fs-extra")


try
{
    fs.ensureDirSync("reports/"); // Ensure reports directory exists
    fs.emptyDirSync("reports/"); // Clear previous reports

}catch(err)
{
    console.log("Error creating reports directory: ", err);
}