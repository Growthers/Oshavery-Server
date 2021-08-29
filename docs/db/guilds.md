## Guilds

| カラム名 | データ型 | デフォルト値 | Nullを許容するか | 子テーブル | 親テーブル | 備考 |
| ---------- | ------------ | ------- | -------- | -------- | ------- | ------------------- |
| id  | char(36) | | false | | | ギルドのID(UUIDv4) |
| name | varchar(255) | | false | | | ギルド名 |
| topic | text | | false | | | ギルドトピック |
| creator_id | char(36) | | false | | users | 作成者ID(UUIDv4) |
| owner_id | char(36) | | false | | users | 管理者ID(UUIDv4) |
| updater_id | char(36) | | false | | users | 更新者UUID(UUIDv4) |
| created_at | datetime(6) | | true | | | 作成日時 |
| updated_at | datetime(6) | | true | | | 更新日時 |
| deleted_at | datetime(6) | | true | | | 削除日時 |


## Constraints

|     Name    |     Type    |          Definition          |
| ----------- | ----------- | ---------------------------- |
| name_parent | UNIQUE      | UNIQUE KEY name(name)        |
| PRIMARY     | PRIMARY KEY | PRIMARY KEY (id)             |

