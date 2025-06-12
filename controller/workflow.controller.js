import {createRequire} from "module";
import Subscription from "../models/subsription.model.js";
import dayjs from "dayjs";
import { sendReminderEmail } from "../utils/send-email.js";
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express')

const REMINDERS=[7,5,2,1];

export const sendReminders = serve(async(context)=>{
    const {subscriptionId} = context.requestPayload;

    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !=="active") return;

    // Import dayjs
    // setup qstash

    console.log("here 1")
    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
        return ;
    }

    for (const daysBefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysBefore,'day');
        console.log("here 2")

        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context,`Reminder ${daysBefore} days before`, reminderDate)
            console.log("here 3")

        }

        if(dayjs().isSame(reminderDate,'day')){
            await triggerReminder(context, `${daysBefore} days before reminder`, subscription)
            console.log("here 4")

        }

    }

});

const fetchSubscription = async(context,subscriptionId)=>{
    return await context.run("get subscription",async()=>{
        return Subscription.findById(subscriptionId).populate('user', "name email")
    })
}

const sleepUntilReminder = async(context, label, date)=>{
    console.log(`Sleeping until ${label} reminder at ${date}`);

    await context.sleepUntil(label,date.toDate())
}

const triggerReminder = async(context,label,subscription)=>{
    return await context.run(label,async()=>{
        console.log(`Trigger ${label} reminder`);
        // Send email, SMS 
        await sendReminderEmail({  
            to:subscription.user.email,
            type:label,
            subscription,
        })
        // nodemailer for email sending
    })
}