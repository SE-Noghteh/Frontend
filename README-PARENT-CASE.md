# Parent case tracking + correction screens

Target branch:
`feat/parent-auth`

Extract directly into:
`C:\Noghteh\Frontend`

Choose **Replace all**.

## New routes

- `/parent/case`
- `/parent/case/edit`

After a successful parent login, the user is redirected to `/parent/case`.

## Real backend integration

The tracking screen is connected to:

- `GET /parents/me`
- `POST /parents/logout`

`GET /parents/me` supplies:
- first name
- last name
- phone
- relationship
- admin approval status
- admin review message
- admin reviewed timestamp

Statuses supported:
- `pending`
- `approved`
- `rejected`

The page renders a different state for each status.

## Correction flow limitation

The supplied Swagger currently does **not** contain an endpoint for:
- updating a parent's identity document,
- replacing the consent video,
- resubmitting a rejected parent case for admin review.

Because of that, `/parent/case/edit` implements the complete responsive UI from the supplied design and validates the new files, but it deliberately does not invent a backend request.

When the backend endpoint is added, wire it inside:
`src/components/features/Auth/Parent/ParentCaseCorrectionForm.tsx`

## Reused components

- ParentAuthLayout
- AuthNotice
- ParentDocumentUpload
- ParentConsentVideo
- Button
- SectionCard
- existing Toast
- existing httpClient / auth token

## Test

```cmd
pnpm lint
pnpm build
pnpm dev
```

Then:

1. Login at `/parent/login`.
2. Successful login should redirect to `/parent/case`.
3. Test a parent with `pending` review status.
4. Test a parent with `approved` review status.
5. Test a parent with `rejected` status and `admin_review_message`.
6. Rejected status should expose `اصلاح پرونده`.
7. `/parent/case/edit` should accept a new identity image and consent video.
8. Mobile layout should remain usable.
