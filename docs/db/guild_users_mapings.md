## Guild_users_mappings

| カラム名 | データ型 | デフォルト値 | Nullを許容するか | 子テーブル | 親テーブル | 備考 |
| ---------- | ------------ | ------- | -------- | -------- | ------- | ------------------- |
| id         | char(36)     |    なし     | false    | * | | マッピングUUID |
| guild_id | char(36) | | false | | Guilds | 所属するギルドID |
| user | char(36) | | false | | | ユーザーUUID |
| name | varchar(32) || false | | | ユーザーの表示名 |
