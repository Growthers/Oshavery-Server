# /

その他のAPI

## エンドポイント一覧
**一部のエンドポイントで認証が必須です**

| 絶対パス    | メソッド | パラメータ | 備考    |
|---------|------|-------|-------|
| /login  | POST | none  | ログイン  |
| /logout | POST | none  | ログアウト |

------

### GET_/login
ログインします

#### Response

#####  201 - success (application/json)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImlhdCI6MTYzOTIwNTk0MSwiZXhwIjoxNjM5Mzc4NzQxfQ.O6XPP2GmmUwLhTNtSQ0wImQ6pPqJB5NmECuR1nOlm5o"
}
 ```
##### 400 - Invalid Request

----

### POST /logout
ログアウトします
**このエンドポイントは認証(トークン)が必要です**

#### Request Body
*リクエストボディは空です*

#### Response
##### 204 - No Content
##### 400 - Bad Request
