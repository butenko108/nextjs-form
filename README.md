# Assignment Form App

Додаток являє собою форму відправки завдання для кандидатів. Він дозволяє користувачеві заповнити форму, вибравши рівень кандидата з динамічно завантажуваного списку, і після успішної відправки — побачити сторінку з підтвердженням.

[Vercel](https://nextjs-form-wpav.vercel.app/)

## Технології
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Vercel (deployment)
- BiomeJS (instead of eslint, prettier)

## Інструкція по запуску
1. Встановити залежності: `npm i`
2. Запустити додаток: `npm run dev`

## Структура
src/
├── app/
│   ├── page.tsx                  # Home page
│   └── thank-you/page.tsx        # Thank you page
├── features/
│   └── assignment/
│       ├── AssignmentFormContainer.tsx  # Server Component
│       ├── AssignmentForm.tsx           # Client Component
│       ├── FormInput.tsx                # Reusable input component
│       ├── FormTextarea.tsx             # Reusable textarea component
│       ├── FormSelect.tsx               # Reusable select component
│       └── schemas.ts                   # Schemas definitions
│       └── types.ts                     # Type definitions

## Функціональність
Головна сторінка (/) з формою відправки завдання:
- Поля: ім'я, email, опис завдання, посилання на репозиторій, рівень кандидата.
- Всі поля валідуються за допомогою Zod і React Hook Form.
- Рівні кандидатів завантажуються з API
- При помилці (API або валідації) відображається повідомлення про помилку.
- Відправка даних API POST.
- При успішній відправці відбувається перенаправлення на сторінку подяки.

Сторінка «Дякуємо» (/thank-you):
- Відображається повідомлення про підтвердження відправлення.
- Показується коротке резюме: ім'я, email, рівень кандидата.
- Кнопка повернення на головну сторінку.