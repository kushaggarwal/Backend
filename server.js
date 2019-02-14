const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser')
const path = require('path')
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer')
const PORT = process.env.PORT || 3987

app.engine('handlebars', exphbs())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//this is used to render the html file saved in the views folder
app.set("view engine", "hbs")
app.use(express.static('public'));
app.get('/job',(req,res)=>{

    db.getAllPersons()  
       .then((persons) => {
        res.render('job', {persons})
         })
       .catch((err)=>{
             res.send(err) })
    })

    app.get('/about',(req,res)=>{
        res.render('about')
    })

app.get('/contact',(req,res)=>{
    res.render('contact')
})

app.get('/events',(req,res)=>{
    res.render('Events')
})

app.get('/main',(req,res)=>{
    res.render('main')
})
app.get('/gallery',(req,res)=>{
    res.render('gallery')
})
app.get('/new',(req,res)=>{
    res.render('new')
})
app.get('/add',(req,res)=>{
    res.render('job_add')
})

app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/add',(req,res)=>{
     db.addNewPerson(req.body.name,req.body.ate,req.body.thick,req.body.material,
        req.body.time,req.body.job )
        .then(()=>{
            res.redirect('/job')
        })
        .catch((err)=>{
            res.send(err)
        })
})
app.listen(PORT, ()=>{
    console.log("Server started at localhost 4444")
})




app.use('/public', express.static(path.join(__dirname,'public')))
app.get('/', (req,res) => {
res.render('contact')
});

app.post('/send',(req,res)=>{
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Message: ${req.body.message}</li>
    <li>Number: ${req.body.number}</li>
    </ul>`;
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }
    
        console.log('Credentials obtained, sending message...');
    
        // Create a SMTP transporter object
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'jiiyyv5hj6wez47u@ethereal.email',
                pass: 'nvaXDVafRWqMat2TdV'
            }
        });
    
        // Message object
        let message = {
            from: 'Sender Name <kush.aggarwal110085@gmail.com>',
            to: 'Recipient <hmwlaser@gmail.com>',
            subject: 'Nodemailer is unicode friendly ✔',
            text: 'Hello to myself!',
            html: output
        };
    
        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
    
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.render('contact',{msg:'Email has been sent'})
        });
    });
    
})





