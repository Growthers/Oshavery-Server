## Invites

|カラム名|データ型|デフォルト値|Nullを許容するか|子テーブル|親テーブル|備考|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|id|char(36)|なし|false|||招待のUUID|
|creator_id|char(36)|なし|false||Users|作成者のUUID|
|updater_id|char(36)|なし|false||Users|更新者のUUID|
|guild_id|char(36)|なし|false||Guilds|招待ギルドのUUID|
|channel_id|char(36)|なし|false||Channels|招待チャンネルのUUID|
|enable|boolean|true|false|||招待が有効かどうか|
|content|char(n)|なし|false|||ユーザーが使用する招待文字列|
|max|int|なし|true|||最大招待使用可能回数|
|count|int|0|false|||招待使用回数|
|expires_at|datetime(6)|なし|true|||招待使用可能期限|
|created_at|datetime(6)|なし|false|||作成日時|
|updated_at|datetime(6)|なし|false|||更新日時|
|deleted_at|datetime(6)|なし|false|||削除日時|
