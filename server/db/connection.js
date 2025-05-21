import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  //mongodbに接続
  await client.connect();

  //pingを送信して接続を確認
  await client.db("admin").command({ ping: 1 });

  console.log("You successfully connected to MongoDB");
} catch (error) {
  console.error(err);
}

//employeesデータベースを取得
let db = client.db("employees");

export default db;
