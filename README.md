# AnyFin
This is express-react-typescript application

This is anyFin backend API server.
##Setup Backend;

1. Go to backend root and run
`$ npm install`;

### MongoDb setup;
1. dbname:'anyfin,
2. dbuser: 'tony,
3. password: 'password'
#### To create db and connect

1. To crate database: `use anyfin`.
2. To create user run: ```db.createUser({user:"tony",pwd:"password",roles:[{role:"readWrite",db:"anyfin"}]})```
3. Update `FIXER_ACCESS_TOKEN` at in backend/credentials.ts file
4. To run backend: `npm start`
5. If cannot register or login then place this code inside server.ts file right after db coonection if cant able to 
register or login. 
```
const userSchema = new mongoose.Schema({ email: String, name: String, password: String});                        
export const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);
```
5. To test backend: `npm test`
6. API andend: `{host}:{port}/api/`

#### Frontend setup;
This is anyFin front UI components.

## To Setup:
 
1. Go to frontend root and run `$ npm install`;
2. To run frontend: `npm start`
4. Routes: `{host}:{port}/ and {host}:{port}/countries`


#### Created By Aziz (Tony) 
