# Zedlancer frontend -> backend opportunity integration

Target project:
`C:\Noghteh\Frontend`

Target branch used as the baseline:
`fix/seeker-approval-flow`

Backend base URL:
`https://senoghteh.fpna.ir/v1`

## Connected to real backend

- Public search: `GET /opportunities`
- Public opportunity detail: `GET /opportunities/{id}`
- Seeker dashboard tabs: `GET /job-seekers/opportunities`
- Save: `PUT /job-seekers/opportunities/{id}/saved`
- Unsave: `DELETE /job-seekers/opportunities/{id}/saved`

Search uses backend `limit=20` and `offset` and displays real pagination.

Dashboard uses:
- all -> `tab=all`
- مناسب تو -> `tab=for_me`
- کاری -> `tab=work`
- کارآموزی -> `tab=internship`
- ذخیره‌شده -> `tab=saved`

## Still mock by request

- Sending an application
- Requests workflow
- Collaborations
- Parent-after-contract workflow

Swagger currently has no application endpoint, so the Apply dialog creates a mock Zustand request from the real backend opportunity.

## Authentication

The protected dashboard/save endpoints require `Authorization: Bearer <access_token>`.

The included API client does not replace your login implementation. It searches localStorage and sessionStorage for common token keys (`access_token`, `accessToken`, `auth_token`, `authToken`, `token`) and also looks inside JSON auth-state objects.

If your already-working login stores the JWT under one of those forms, no login-file change is required.

## Apply

Extract the ZIP directly into:

`C:\Noghteh\Frontend`

Choose Replace / Replace all.

Then run:

```cmd
pnpm install
pnpm lint
pnpm build
pnpm dev
```

## Test order

1. Login as a job seeker.
2. Open `/seeker/ads`.
3. Test tabs: همه / مناسب تو / کاری / کارآموزی / ذخیره‌شده.
4. Save and unsave one opportunity.
5. Open one dashboard opportunity detail.
6. Open `/search`.
7. Confirm search shows 20 results per page when enough data exists.
8. Test next/previous pagination and URL `?page=2`.
9. Open a search result detail.
10. Check description, skills, deliverables, delivery formats and attachment links.
11. Click ارسال درخواست. This remains mock and should appear in درخواست‌های من.

## Swagger limitations intentionally preserved

Swagger does not currently expose:
- submit application endpoint,
- request list/workflow endpoint,
- collaboration endpoint in the provided document,
- opportunity category-list endpoint,
- trending-search endpoint,
- explicit "no experience required" public-search filter.

Therefore those areas are not silently invented as backend features.
