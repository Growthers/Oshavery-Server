## Channels

チャンネルテーブル

| カラム名 | データ型 | デフォルト値 | Nullを許容するか | 子テーブル | 親テーブル | 備考 |
| ---------- | ------------ | ------- | -------- | -------- | ------- | ------------------- |
| id         | char(36)     |    なし     | false    |          |         | チャンネルのUUID |
| name | varchar(255) | | false | | | チャンネル名 |
| guild_id | char(36) | | false | | Guilds | 所属するギルドID |
| type | varchar(255) | | false | | | チャンネルタイプ |
| topic | text | | false | | | チャンネルトピック |
| creator_id | char(36) | | false | | | 作成者ID(UUIDv4) |
| updator_id | char(36) | | false | | | 更新者ID(UUIDv4) | 
| created_at | datetime(6)  | | true | | | 作成日時 |
| updated_at | datetime(6)  | | true | | | 更新日時 |
| deleted_at | datetime(6)  | | true | | | 削除日時 |

ToDo: チャンネルタイプ指定方法を決めておく
