import axios from "axios";
// import { retrieveData } from '../helpers/mongodb-query';

// import { evalRun } from '/helpers/running_evals';

import { MongoClient } from 'mongodb';

// let first = true;
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  // const backgroundreq = ",   if the query had a keyword of law, just return No-sql code for the query based on the folloeing information of the dataset , its keys and their corresponding information include : {t : Case title, s: source, id: indiankanoon ID, d: case proeedings, c: citations, cl: citatoins length, b: bench, a: author} . Just give me the code without any explainnation, only the output query should be seen in the output";
  
  const jsonString: string = `{
    "_id": {"$oid":"6588cf034a9a74487cd4ad61"},
    "name": "DND",
    "email": "dnd@gmail.com",
    "password": "$2b$10$LIoN7lR0U.eWbWMshOzOZeo3zJ/2lY.J2/6VO8MB84eksVmLWpl0u"
  }`;

  
const evalString = `
async function retrieveData(filter, projection) {
  let client;
  try {
      const uri = ""; // Your Database connection URI
  
      const { MongoClient } = await import('mongodb');
      client = new MongoClient(uri);

      await client.connect();

      const database = client.db("chatbot");
      const collection = database.collection('users');

      const result = await collection.find(filter, projection).toArray();

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

// Usage: Call retrieveData function with filter and projection objects
const filter = { "name": "testing1" };
const projection = { "email": 1 };

retrieveData(filter, projection);
`;


  const backgroundreq = ",   if the question asked upto now had a the words 'user' used, just return No-sql code inculcated into a .ts file which must be in the form (an example) \n :"+evalString+"\n it must folllow the above fofrmat for calling and connecting to the datasbe it is very important, just change the result part based on the query based on the following information of the dataset , one of the documents in the dataset is as follows: "+jsonString+" just make up reply for my question in the most human like way possible without showing that you are AI, else just answer questions normaly like a chatbot and dont reference this query much";
  // const backgroundreq = ", this is a roleplay and you are a know-it-all machine, even if you dont know an answer make sure you tell you make the most accurate guess and give";

  // const tmessage = message
  message = message + backgroundreq;
  console.log(typeof (message))
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  console.log("awaiting data")
  const data = await res.data;
  console.log(data)
  // message = message - backgroundreq;
  // Loop from 0 to 4
  for (let i = 0; i <= data.chats.length-2; i+=2) {
    data.chats[i].content = data.chats[i].content.slice(0,data.chats[i].content.length - backgroundreq.length);
  }
  console.log(data.chats[data.chats.length-1].content)
// ------------------------------------------------------
  // extracting the whole thing
const s = data.chats[data.chats.length-1].content
const startMarker = "```typescript";
const endMarker = "```";

const startIndex = s.indexOf(startMarker);
const endIndex = s.indexOf(endMarker, startIndex + startMarker.length);

if (startIndex !== -1 && endIndex !== -1) {
    const b = s.substring(startIndex + startMarker.length, endIndex).trim();
    console.log(b); // This will log the content between 'typescript' markers without the markers
    
    
  
  // now im trying to run using eval bas  

  try {
    eval(b); // Execute the code
  } catch (err) {
    console.error(err); // Handle any errors that occur during execution
  }

} else {
    console.log("Markers not found or invalid");
}





  //-----------------------------------------------------------------------------------------------
  // instead of mongodb-query, bringing it here

  
// function extractComponents(queryString: string) {
//   const parts = queryString.split('.');

//   if (parts.length === 4 && parts[0] === 'db' && parts[1] === 'collection' && parts[2] === 'find') {
      
//       const queryStart = queryString.indexOf('{');
//       const queryEnd = queryString.lastIndexOf('}');
//       const query = queryString.substring(queryStart + 1, queryEnd).trim();

//       return {
//           query
//       };
//   } else {
//       throw new Error('Invalid query format');
//   }
// }

// async function retrieveData(queryString: string) {
//   console.log("Inside retrieve data")
//   let client: MongoClient | undefined;
//   try {
//       // Extract components from the input string
//       const { query } = extractComponents(queryString);

//       // Connection URI and client
//       const uri = add the database address
//       const client = new MongoClient(uri);

//       await client.connect();

//       const database = client.db("chatbot");
//       const collection = database.collection('users');

//       // Convert the query string to an actual object (you might need to improve this conversion logic)
//       const actualQuery = JSON.parse(query);

//       const result = await collection.find(actualQuery).toArray();

//       console.log('Retrieved data:');
//       console.log(result);
//   } 
//   catch (err) {
//       console.error('Error retrieving data:', err instanceof Error ? err.message : 'Unknown error');
//   } finally {
//       if (client) {
//           await client.close();
//       }
//   }
// }

  // removin the async

  // function retrieveData(queryString: string) {
  //   console.log("Inside retrieve data");
  //   let client: MongoClient | undefined;
  
  //   // Promisify MongoClient.connect
  //   function connectToClient(uri: string): Promise<MongoClient> {
  //     return new Promise((resolve, reject) => {
  //       const client = new MongoClient(uri);
  //       client.connect((err) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(client);
  //         }
  //       });
  //     });
  //   }
  
  //   try {
  //     const { query } = extractComponents(queryString);
  //     const uri = add the address of database
  //     connectToClient(uri)
  //       .then((connectedClient) => {
  //         client = connectedClient;
  //         const database = client.db("chatbot");
  //         const collection = database.collection('users');
  //         const actualQuery = JSON.parse(query);
          
  //         collection.find(actualQuery).toArray((err, result) => {
  //           if (err) {
  //             console.error('Error retrieving data:', err instanceof Error ? err.message : 'Unknown error');
  //           } else {
  //             console.log('Retrieved data:');
  //             console.log(result);
  //           }
  //           if (client) {
  //             client.close();
  //           }
  //         });
  //       })
  //       .catch((err) => {
  //         console.error('Error connecting to MongoDB:', err instanceof Error ? err.message : 'Unknown error');
  //         if (client) {
  //           client.close();
  //         }
  //       });
  //   } catch (err) {
  //     console.error('Error:', err instanceof Error ? err.message : 'Unknown error');
  //     if (client) {
  //       client.close();
  //     }
  //   }
  // }
  

  // -------------------------------------------------
  // passing the query inside

  // console.log("HI")
  // function extractDbCollectionWords(input: string): string[] {
  //   const words = input.split(' ');
  //   console.log("The borken up words",words)
  //   const dbCollectionWords: string[] = [];
  
  //   words.forEach(word => {
  //     if (word.startsWith('db.collection')) {
  //       dbCollectionWords.push(word);
  //     }
  //   });
  
  //   return dbCollectionWords;
  // }
  // console.log("Going inside extractingcollection")
  // // Example usage:
  // // const inputString = 'db.collection.find db.collection.update some other words db.collection.delete';
  // const dbCollectionWords = extractDbCollectionWords(data.chats[data.chats.length-1].content);
  // // const dbCollectionWords = extractDbCollectionWords(inputString);
  
  // console.log('Words starting with db.collection:', dbCollectionWords);
  
  // // below causing problem
  // retrieveData(dbCollectionWords[0]);
  // // retrieveData(' db.collection.findOne({ "name": "testing1" }, { "email": 1 }) ');

  //---------------------------------------------------
  // data.chats[data.chats.length-2].content = tmessage;
  return data;

  // const first_message = "I am playing a game in which you are a chatbot as well a MongoDB data retriever, it is upto you to understand weather you as a chatbot can answer my questions answer my questions or you need to write a no sql query to fetch it from the law database. the convserations and queries that i am going to ask you next are a part of that experiment";
  // if (first){
  //   const res = await axios.post("/chat/new", { first_message });
  //   if (res.status !== 200) {
  //     throw new Error("Unable to send chat");
  //   }
  //   const data = await res.data;
  //   console.log(data)
  //   first=false;
  //   return data;
  // }
  // else{

// const res = await axios.post("/chat/new", { message });
// if (res.status !== 200) {
// throw new Error("Unable to send chat");
// }
//   const data = await res.data;
//   console.log(data)
//   return data;
  
  

  
  // message = message - backgroundreq;
  // data.chats[data.chats.length-2].content = tmessage;
  
  
  
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};
