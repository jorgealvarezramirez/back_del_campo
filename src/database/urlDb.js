let user = process.env.NODE_USER;
let pass = process.env.NODE_PASS;

// const user = "ventas-agro";
// const pass = "HGuHFzLJY7TpwF90";
const database = "Cluster0";

module.exports = {
  cloud_db: `mongodb+srv://${user}:${pass}@cluster0.crdjk.mongodb.net/${database}`,
  local_db: `mongodb://localhost:27017/${database}`,
};

//   cloud_db: `mongodb+srv://ventas-agro:<password>@cluster0.crdjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
// db_web19
