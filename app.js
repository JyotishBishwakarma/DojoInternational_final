const express = require('express');
const ejsMate = require('ejs-mate'); // Import ejs-mate
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const serverless = require("serverless-http");
require("dotenv").config({ path: "./settings.env" });

const app = express();

// Set 'ejs-mate' as the view engine
app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');


// Set the views directory (optional, default is './views')
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to receive email
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Example route
app.get('/', (req, res) => {
  res.render('pages/index', { title: 'Dojo International | Home' });
});

app.get('/aboutus', (req, res) => {
  res.render('pages/aboutus',{ title: 'Dojo International | About Us' }); // Renders the aboutus.ejs file
});

app.get('/contact', (req, res) => {
  res.render('pages/contact_us',{ title: 'Dojo International | Contact Us' }); // Renders the aboutus.ejs file
});


//services-section
app.get('/japanese_language', (req, res) => {
  res.render('pages/japanese_language',{ title: 'Dojo International | Japanese Language' }); // Renders the aboutus.ejs file
});

app.get('/work_japan', (req, res) => {
  res.render('pages/work_japan',{ title: 'Dojo International | Work in Japan' }); // Renders the aboutus.ejs file
});

app.get('/career_counselling', (req, res) => {
  res.render('pages/career_counselling',{ title: 'Dojo International | Career counselling' }); // Renders the aboutus.ejs file
});

app.get('/visa_processing', (req, res) => {
  res.render('pages/visa_processing',{ title: 'Dojo International | Visa Proessing' }); // Renders the aboutus.ejs file
});

app.get('/documentation_guidance', (req, res) => {
  res.render('pages/documentation_guidance',{ title: 'Dojo International | Documentation Guidance' }); // Renders the aboutus.ejs file
});

app.get('/finance_assistance', (req, res) => {
  res.render('pages/finance_assistance',{ title: 'Dojo International | Finance Assistance' }); // Renders the aboutus.ejs file
});

app.get('/admission_guidance', (req, res) => {
  res.render('pages/admission_guidance',{ title: 'Dojo International | Admission_Guidance' }); // Renders the aboutus.ejs file
});



// Handle form submission and send email
app.post("/request-consultation", (req, res) => {
  console.log(`email:`+process.env.EMAIL);
  const { name, phone, email, message } = req.body;
  console.log(`name: ${name}, phone: ${phone}, email: ${email}, message: ${message}`);

  // Configure Nodemailer transport (using Gmail in this example)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email password or App password (for Gmail)
    },
  });

  // Setup email data
  const mailOptions = {
    from: email, // sender address
    to: "contact.dojointernational@gmail.com", // receiver address (your email)
    subject: `Inquiry for consultation from website - ${name} - Phone - ${phone}`, // subject of the email
    text: `Message from: ${name}\n\nPhone_Number: ${phone}\n\nEmail: ${email}\n\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ success: false, message: "Error occurred while sending the message" });
    } else {
      res.status(200).json({ success: true, message: "Message sent successfully! We will get back to you soon." });
    }
  });
});



//send-email for contact us

app.post('/send-email', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Configure Nodemailer transport (using Gmail in this example)
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or App password (for Gmail)
      },
  });

  // Setup email data
  const mailOptions = {
      from: email, // sender address
      to: 'contact.dojointernational@gmail.com', // receiver address (your email)
      subject: `Inquiry from Portfolio website - ${subject}`, // subject of the email
      text: `Message from: ${name}\n\nPhone_Number: ${phone}\n\nEmail: ${email}\n\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return res.status(500).send('Error occurred while sending the message');
      } else {
          res.status(200).send('Message sent successfully! We will get back to you soon.');
      }
  });
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

//module.exports = app; 
