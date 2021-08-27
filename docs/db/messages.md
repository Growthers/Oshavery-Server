## Messages

Messages

|カラム名|データ型|デフォルト値|Nullを許容するか|子テーブル|親テーブル|備考|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|id|char(36)|なし|false|||メッセージのUUID|
|creator_id|char(36)|なし|false||Users|作成者のUUID|
|guild_id|char(36)|なし|false||Guilds|送信ギルドのUUID|
|channel_id|char(36)|なし|false||Channels|送信チャンネルのUUID|
|content|text|なし|false|||テキストメッセージの内容|
|media|boolean|なし|false||Media|画像・動画の存在可否|
|ip|text|なし|false|||送信者のIPアドレス|
|created_at|datetime(6)|なし|false|||作成日時|
|updated_at|datetime(6)|なし|false|||更新日時|
|deleted_at|datetime(6)|なし|false|||削除日時|

Media

|カラム名|データ型|デフォルト値|Nullを許容するか|子テーブル|親テーブル|備考|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|id|char(36)|なし|false|||メッセージのUUID|
|channel|char(36)|なし|false||Channels|送信先チャンネルのUUID|
|name|text|なし|false|||ファイル名|
|mime|text|なし|false|||ファイルのMIMEタイプ|
|size|bigint(20)|なし|false|||ファイルサイズ(byte)|
