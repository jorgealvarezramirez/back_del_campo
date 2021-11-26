const user = "VENTAS-AGRO";
const pass = "VENTAS-AGRO";
const database = "del_campo";

module.exports = {
  cloud_db: `mongodb+srv://${user}:${pass}@cluster0.crdjk.mongodb.net/${database}`,
  local_db: `mongodb://localhost:27017/${database}`,
};

//   cloud_db: `mongodb+srv://ventas-agro:<password>@cluster0.crdjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
