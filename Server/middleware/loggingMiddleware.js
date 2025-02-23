// loggingMiddleware.js
const loggingMiddleware = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next(); // Continue to the next middleware or route handler
  };
  
  export default loggingMiddleware;
  