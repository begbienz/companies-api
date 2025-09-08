/**
 * Validate the Company ID 
 * 
 * @param {} companyId String 
 * @returns Valid company id between 1 and 2. 
 */
function validateCompanyId(companyId) {
  if (isNaN(companyId)) {
    const errorData = {
        error: "ValidationError",
        error_description: `Not a Number! ${companyId}`
    };
    const error = {
        Error: errorData
    }
    return error;
  }
  if (!(companyId >= 1 && companyId <= 2)){
    const errorData = {
        error: "ValidationError",
        error_description: "Only numbers between 1 and 2 are allowed"
    };
    const error = {
        Error: errorData
    }
    return error;
  }

  return companyId

}

// Export as a named export
module.exports = {
  validateCompanyId,
};