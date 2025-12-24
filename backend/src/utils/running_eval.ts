import { MongoClient } from 'mongodb';

export async function evalRun(evalString:string) {
    try {
        eval(evalString); // Execute the code
        } catch (err) {
        console.error(err); // Handle any errors that occur during execution
        }
}