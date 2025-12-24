import { MongoClient } from 'mongodb';

function extractComponents(queryString: string) {
    const parts = queryString.split('.');

    if (parts.length === 4 && parts[0] === 'db' && parts[1] === 'collection' && parts[2] === 'find') {
        
        const queryStart = queryString.indexOf('{');
        const queryEnd = queryString.lastIndexOf('}');
        const query = queryString.substring(queryStart + 1, queryEnd).trim();

        return {
            query
        };
    } else {
        throw new Error('Invalid query format');
    }
}

export async function retrieveData(queryString: string) {
    let client: MongoClient | undefined;
    try {
        // Extract components from the input string
        const { query } = extractComponents(queryString);

        // Connection URI and client
        const uri = "mongodb+srv://dnd_chatbot:ciipHFyZOMwmOyZK@cluster0.hjw1hhx.mongodb.net/chatbot?retryWrites=true&w=majority"; // Your MongoDB connection URI
    
        const client = new MongoClient(uri);

        await client.connect();

        const database = client.db("chatbot");
        const collection = database.collection('users');

        // Convert the query string to an actual object (you might need to improve this conversion logic)
        const actualQuery = JSON.parse(query);

        const result = await collection.find(actualQuery).toArray();

        console.log('Retrieved data:');
        console.log(result);
    } 
    catch (err) {
        console.error('Error retrieving data:', err instanceof Error ? err.message : 'Unknown error');
    } finally {
        if (client) {
            await client.close();
        }
    }
}

// Usage: Call retrieveData function with the query string
// const queryString = 'db.collection.find({ "d": /law/ })';
// retrieveData(queryString);



