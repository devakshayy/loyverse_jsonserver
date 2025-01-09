const jsonServer = require('json-server')
const multer  = require('multer')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')      //storage of image
    },
    filename: function (req, file, cb) {
      let date = new Date()
      let imageFilename = date.getTime() + "_" + file.originalname
      req.body.imageFilename = imageFilename
      cb(null, imageFilename)
    }
  })
  
  const bodyParser = multer({ storage: storage }).any()


// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(bodyParser)
server.post("/items",(req, res, next) => {
  let date = new Date()
  req.body.createdAt = date.toISOString()

  if(req.body.price) {
    req.body.price = Number (req.body.price)
  }

  let hasErrors = false
  let errors = {}
  
  
  if(req.body.code  <= 4) {
    hasErrors = true
    errors.code = "The Code must have 4 digit"
  }
  if(req.body.barcode <= 13) {
    hasErrors = true
    errors.barcode = "The Barcode must have 13 digit"
  }
  if(req.body.name.length < 2) {
    hasErrors = true
    errors.name = "The name length should be at least 2 characters"
  }
  if(req.body.price  <= 0) {
    hasErrors = true
    errors.price = "The Price is not valid"
  }
  if(req.body.cost  <= 0) {
    hasErrors = true
    errors.cost = "The Cost is not valid"
  }
  if(req.body.category.length < 2) {
    hasErrors = true
    errors.category = "The category should be at least 2 characters"
  }
  if(req.body.description.length < 10) {
    hasErrors = true
    errors.description = "The description length should be at least 10 characters"
  }

  if (hasErrors) {
    // return bad request (400) with validation errors
    res.status(400).jsonp(errors)
    return
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running')
})












// const jsonServer = require('json-server');
// const multer = require('multer');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();
// require('dotenv').config(); // For environment variables

// // Set default middlewares (logger, static, cors, and no-cache)
// server.use(middlewares);

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/images'); // Temporary storage (non-persistent in Glitch)
//   },
//   filename: function (req, file, cb) {
//     let date = new Date();
//     let imageFilename = date.getTime() + "_" + file.originalname;
//     req.body.imageFilename = imageFilename;
//     cb(null, imageFilename);
//   },
// });

// const uploadLimits = {
//   fileSize: 5 * 1024 * 1024, // 5MB limit
// };
// const bodyParser = multer({ storage: storage, limits: uploadLimits }).any();

// // Use Multer as middleware
// server.use(bodyParser);

// // Validation for POST requests
// server.post('/items', (req, res, next) => {
//   let date = new Date();
//   req.body.createdAt = date.toISOString();

//   if (req.body.price) {
//     req.body.price = Number(req.body.price);
//   }

//   let hasErrors = false;
//   let errors = {};

//   if (String(req.body.code).length !== 4) {
//     hasErrors = true;
//     errors.code = "The Code must have 4 digits";
//   }
//   if (String(req.body.barcode).length !== 13) {
//     hasErrors = true;
//     errors.barcode = "The Barcode must have 13 digits";
//   }
//   if (req.body.name.length < 2) {
//     hasErrors = true;
//     errors.name = "The name length should be at least 2 characters";
//   }
//   if (req.body.price <= 0) {
//     hasErrors = true;
//     errors.price = "The Price is not valid";
//   }
//   if (req.body.cost <= 0) {
//     hasErrors = true;
//     errors.cost = "The Cost is not valid";
//   }
//   if (req.body.category.length < 2) {
//     hasErrors = true;
//     errors.category = "The category should be at least 2 characters";
//   }
//   if (req.body.description.length < 10) {
//     hasErrors = true;
//     errors.description = "The description length should be at least 10 characters";
//   }

//   if (hasErrors) {
//     // Return bad request (400) with validation errors
//     res.status(400).jsonp(errors);
//     return;
//   }
//   // Continue to JSON Server router
//   next();
// });

// // Use default router
// server.use(router);
// server.listen(process.env.PORT || 4000, () => {
//   console.log('JSON Server is running');
// });







