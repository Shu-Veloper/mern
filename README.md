# Server:

1. server フォルダを作る
2. npm init -y -> npm i mongodb express cors
3. Atlas にてデータベースを作成し、環境変数を env ファイルに記載する
4. db フォルダを作成して connection ファイルを作成する

mongodb の ID を query にて作成する際 ObejectID で作成する必要がある
MongoDB の各ドキュメント（データ行）には、自動的に \_id というフィールドが付与されており、その値は通常 ObjectId 型です。
**_ let query = { id: new ObjectId(req.params.id) }; _**
