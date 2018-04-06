import config from './knexfile'
const env = process.env.NODE_ENV || 'development';  
import knex from 'knex'
export const db = knex(config[env])

// db('users').count("* as cnt").then(res => {
//   console.log(['user count', res]);
// })


// // methods ======================
// // generating a hash
// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

