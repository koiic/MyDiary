
import cron from 'node-cron';
import mailer from 'nodemailer';
import db from '../model/connect';
import { fetchSubscribedUser } from '../model/queryHelper';
import dotenv from 'dotenv';

dotenv.config();

    //configure mail transporter
    let transporter = mailer.createTransport({
        service: process.env.EMAIL_PROVIDER,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    
    })
    
    cron.schedule('* * 23 * * *', () => {
        db.query(fetchSubscribedUser())
        .then((result) => {
            console.log(result);
            if(result.rowCount > 0){
                const userInfo = result.rows;
                userInfo.map((element) => {
                    const userEmail = element.email;
                    const name = element.firstname;
               
                    const url = 'https://diarry.herokuapp.com/'
                    const body = `<h3>Hi <strong><i>${name}</i></strong></h3> <p>It's Time For Pening your thoughts and ideas, Don't keep it at heart!</p> 
                    <p> <a href = ${url}>CLICK HERE TO PEN IT DOWN</a></p>
                    <p><strong>The Diarry Team</strong></p>`;
                    const subject = 'My Diarry Reminder';
                    const emailOptions = {
                        from: 'The Diary Team',
                        to: userEmail,
                        subject,
                        html: `<div style="padding: .5em;"><h4>${body}</h3></div>`,
                    };
                    console.log(emailOptions);
                    return transporter.sendMail(emailOptions, (error) => {
                        if (error) {
                        console.log('>>>>>>>>>>>>>>', error);
                        return 'Error occurred';
                        }
                        return 'Reminder Email sent Successfully';
                    });
                });    
            }
            return 'No email notification subcriber yet'
            
            
        }).catch((err) => {
          console.log(err.message);
            
        });
    })

        
   

    

    




