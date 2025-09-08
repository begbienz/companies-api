const axios = require('axios')
const express = require('express')
const { parseXmlString } = require('./helpers/response-helper')
const { validateCompanyId } = require('./helpers/request-helper')
const app = express()
const port = 3000

/**
 * Main API entry point 
 * 
 * @param req request object
 * @param res response object
 */
app.get('/companies/:companyId', async (req, res) => {

  // Validate the companies details 
  const companyId = validateCompanyId(req.params.companyId)
  console.log(`companyId: ${companyId}`)
  if (companyId instanceof Object) {
    res.send(companyId);
    return null;
  }

  // Get the company details  
  const result = await getCompanyXML(companyId)
  console.log(`final result: ${JSON.stringify(result)}`);

  res.send(result);


})


/**
 * This method get the Company details middleware NZ backend Static serivce. 
 * 
 * @param {*} companyId 
 * @returns Company object for successfull calls to Company xml otherwise a Error object with an error message. 
 */
async function getCompanyXML(companyId) {
  const companyGet = `https://raw.githubusercontent.com/MiddlewareNewZealand/evaluation-instructions/main/xml-api/${companyId}.xml`
  try {
    console.log(`Calling company ${companyGet}`)
    const response = await axios.get(companyGet, {
      responseType: 'text' // Ensure the response is treated as plain text
    });
    return await handleGetCompanyResponse(response.data, companyId)

  } catch (err) {

    const errorData = {
      error: err.name || "UnknownError",
      error_description: err.message || "No description available"
    };
    const error = {
      Error: errorData
    }
    return error;
  }
}

/**
 * This method takes a XML String conatin company data nad the companyId and return the company object. 
 * 
 * @param {*} dataResponse 
 * @param {*} companyId 
 * @returns Company Object 
 */
async function handleGetCompanyResponse(dataResponse, companyId) {
  const result = await parseXmlString(dataResponse);

  console.log("name:", result.Data.name[0]);
  console.log("description:", result.Data.description[0]);

  const companyData = {
    id: companyId,
    name: result.Data.name[0],
    description: result.Data.description[0]
  };

  const company = {
    Company: companyData
  }

  return company;
}


// Catch-all middleware for 404 Not Found
// This route should be placed after all other specific routes
app.use((req, res, next) => {
  res.status(404).send('<h1>404 Not Found</h1><p>The requested resource could not be found.</p>');
});

// Displays the current port Express JS is using
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})