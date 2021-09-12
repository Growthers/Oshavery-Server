## Users

|カラム名|データ型|デフォルト値|Nullを許容するか|子テーブル|親テーブル|備考|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|id|char(36)|なし|false|||ユーザーのUUID|
|name|varchar(255)|なし|false|||ユーザー名|
|bot|boolean|なし|false|||botかどうか|
|created_at|datetime(6)|なし|false|||作成日時|
|origin|text|なし|false|||所属インスタンスのURL|
|messages|string|なし|false||Messages|送信メッセージ|
|guild_users_mappings|string|なし|false||Guild_users_mappings|ギルド毎の情報|
|guilds|string|なし|true||Guilds|所属ギルド|
|twitter_id|text|なし|true|||TwitterのID|
|github_id|text|なし|true|||GitHubのID|
