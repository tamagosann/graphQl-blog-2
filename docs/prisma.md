## migration でハマったので覚書

```
yarn prisma migrate dev --name init --preview-feature
```

が失敗するが、docker 上の mysql のユーザーにフル権限を与えてあげないといけない模様。

mysql の docker 内に入り、

```
mysql -u root -ppass
```

（-p[パスワード]）

で mysql にログインした後に、

grant all on _._ to admin

（admin はユーザー名）

で権限を付与したら成功した。
