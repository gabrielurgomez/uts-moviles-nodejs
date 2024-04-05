import app from './app';
import { PORT } from './config'
//import cron from 'node-cron'



/*
cron.schedule('* * * * *', () => {
    console.log('Hola!');
});
*/

app.listen(PORT);
console.log("servidor corriendo en puerto", PORT);