# Parent JWT isolation fix

Problem:
The first Parent Auth version stored the parent JWT under the generic
`access_token` key. If a job-seeker JWT already existed, `/parents/me`
could be called with the wrong token.

Fix:
- Parent now uses `parent_access_token`.
- Parent API requests use a dedicated Axios client.
- Job-seeker/global auth tokens are no longer used by parent endpoints.
- Legacy parent sessions can still be migrated when `parent_auth` and
  the old `access_token` exist in the same storage.
- Parent logout no longer removes an unrelated job-seeker token.

Apply:
Extract into the project root and Replace all.

Important after applying:
1. Refresh.
2. If the old session still behaves strangely, log out of Parent once.
3. Login again at `/parent/login`.
4. The new login will store `parent_access_token`.
5. `/parent/case` should then call `GET /parents/me` with the parent JWT.
