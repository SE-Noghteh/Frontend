# Parent authentication package

Target branch:
`feat/parent-auth`

Extract directly into:
`C:\Noghteh\Frontend`

Then choose **Replace all**.

## Implemented screens

Based on the supplied Figma screenshots:

- Parent login
- Parent signup
- Invitation-code validation
- Parent identity information
- Relationship selection
- Password + confirmation
- Identity document upload
- Parent consent video upload
- Browser camera/video recording
- Signup OTP dialog
- Signup success / admin-review state
- Forgot password
- Password-reset OTP dialog
- New password
- Password reset success
- Mobile responsive layouts

## Reused existing project components

The package deliberately reuses the components already present on `feat/parent-auth`:

- `Button`
- `Dialog`
- `Dropdown`
- `ToastViewport`
- `useToastStore`
- `httpClient`
- existing design tokens
- existing logo

No new UI framework or dependency is added.

## Backend endpoints used

- `POST /parents/login`
- `POST /parents/invitations/validate`
- `POST /parents/signup`
- `POST /parents/otp`
- `POST /parents/verify-otp`
- `POST /parents/forgot-password`
- `POST /parents/verify-reset-otp`
- `POST /parents/reset-password`

API base URL is inherited from the existing `httpClient`:
`https://senoghteh.fpna.ir/v1`

## Routes

- `/parent/login`
- `/parent/signup`
- `/parent/forgot-password`
- `/parent` -> redirects to `/parent/login`
- `/parentlogin` -> compatibility redirect

## Parent login token

A successful parent login stores the JWT under `access_token`.
The existing `src/services/api/authToken.ts` already reads this key, so protected API requests can reuse the same authorization interceptor.

`remember me`:
- ON -> localStorage
- OFF -> sessionStorage

## Signup constraints from Swagger

- A valid invitation is required.
- Parent first name / last name / phone come from the invitation and are read-only.
- relationship: father / mother / guardian
- password: 8–72 bytes
- identity document: PNG/JPEG, maximum 5 MiB
- consent video: MP4/MOV/WebM, 1–20 seconds, maximum 50 MiB
- consent must be accepted.
- OTP is required before the parent account is created.

The frontend validates file type/size. Final video-duration validation is still authoritative on the backend.

## Apply

After extraction:

```cmd
git branch --show-current
pnpm install
pnpm lint
pnpm build
pnpm dev
```

Expected branch:
`feat/parent-auth`

Test:

1. `/parent/login`
2. `/parent/signup`
3. `/parent/forgot-password`
4. Desktop and mobile widths.
5. Invitation validation using a real backend invitation code.
6. Identity-image upload.
7. Video upload.
8. Camera recording (browser must have camera/microphone permission).
9. Signup OTP.
10. Login with created account.
11. Forgot-password OTP and new password.

## Note about the right-side image

`public/images/parent-auth-hero.jpg` was cropped from the supplied Figma reference screenshot so the layout remains visually aligned with the provided parent-auth screens.
