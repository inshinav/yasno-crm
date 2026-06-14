# Деплой — inshinlab.com/yasno-crm/

Статический сайт на VPS (nginx, `root /var/www/html`). Живёт в подпапке
`/var/www/html/yasno-crm/`, отдаётся по `https://inshinlab.com/yasno-crm/`.

## 1. Сборка под подпапку (локально)

Base ОБЯЗАТЕЛЕН — иначе ассеты ищутся в корне домена и ловят 404.
В git-bash используем `MSYS_NO_PATHCONV=1`, иначе MSYS подменяет `/yasno-crm/` на путь Windows.

```bash
cd ~/yasno-crm-strategy
MSYS_NO_PATHCONV=1 npx vite build --base=/yasno-crm/
# стейджим под именем папки на сервере
rm -rf _deploy/yasno-crm && mkdir -p _deploy && cp -r dist _deploy/yasno-crm
```

Проверка, что base применился: в `dist/index.html` ссылки должны быть на `/yasno-crm/assets/...`.

## 2. Заливка (scp → VPS)

```bash
scp -r _deploy/yasno-crm root@kewvvegxjv:/var/www/html/
```

## 3. nginx-маршрут (один раз)

В `/etc/nginx/sites-available/inshinlab.com`, после строки `root /var/www/html;`:

```nginx
location /yasno-crm/ { try_files $uri $uri/ /yasno-crm/index.html; }
```

## 4. Права + перезагрузка (на сервере)

scp кладёт файлы под root с 600/700 → www-data ловит 403/404. Обязательно:

```bash
chmod -R a+rX /var/www/html/yasno-crm
nginx -t && systemctl reload nginx
```

## 5. Проверка

```bash
curl -sI https://inshinlab.com/yasno-crm/ | head -1     # 200
curl -s  https://inshinlab.com/yasno-crm/ | grep -o '<title>[^<]*'
```

---

**Доступ:** серверные шаги (scp/nginx/chmod) исторически Alex запускает руками — команды
выше готовы к копипасту. После заливки проверяю результат через `curl`.
