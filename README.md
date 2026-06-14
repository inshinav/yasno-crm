# CRM-стратегия Ясно — сопровождение, а не продажи

Внутренний одностраничный документ команды роста Ясно: визионерская CRM-стратегия для
онлайн-психотерапии. Центральный тезис — **CRM для терапии нельзя строить по лекалам
e-commerce**; next-level CRM здесь это сопровождение терапевтического пути, а выручка и
retention следуют за исходом.

Голос «мы / наши клиенты / наш Mindbox». Без контактов, CTA и упоминаний найма.
Часть бренд-семейства с хабом Growth OS и Growth-стратегией.

## Сигнатура

Интерактивная «Карта терапевтического пути» — змейка из 11 стадий (от «сомнения» до
«адвоката»), цвет узла отражает эмоциональное состояние, клик/hover раскрывает каскад
`состояние → риск → цель → канал → тон → метрика`. Стадия 5 (переход 1→2) помечена ★ как
критическая активация. На мобиле — вертикальная дорожка с tap-to-expand.

## Стек

Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion + lucide-react.
Шрифты: Onest (display) / Inter (body) / JetBrains Mono (data) через `@fontsource-variable`.
Контент — данными в `src/data/*.ts`.

## Команды

```bash
npm install      # установка
npm run dev      # дев-сервер (по умолчанию :5173, в семье — :5181)
npm run build    # прод-сборка (tsc -b && vite build)
npm run preview  # предпросмотр сборки
```

## Деплой

Прод: `https://inshinlab.com/yasno-crm/` (VPS, nginx, статика в `/var/www/html/yasno-crm/`).
Сборка под подпапку — с флагом base. Полный рунбук — в [DEPLOY.md](DEPLOY.md).

```bash
MSYS_NO_PATHCONV=1 npx vite build --base=/yasno-crm/
```

Доступность: mobile-first 360px→desktop, keyboard-focus, контраст AA, `prefers-reduced-motion`.
