# Apply action for all eligible ads

Target branch: `fix/seeker-approval-flow`

## Files to replace

Replace these five files with the versions in this package:

1. `src/data/mockSeeker.ts`
2. `src/components/features/SeekerAdDetail/AdApplyPanel.tsx`
3. `src/components/features/SeekerAdDetail/ApplyDialog.tsx`
4. `src/store/seeker/useSeekerStore.ts`
5. `src/pages/SeekerOpportunityDetailPage.tsx`

## Behavior

- Every non-expired sample ad in the seeker dashboard starts as `open`, so the details page shows `ارسال درخواست`.
- Historical sample requests for ads 1, 2 and 3 are marked `demoOnly` and are hidden from the real request list.
- The expired sample ad remains expired and cannot receive a new application.
- Every card on public opportunity search already opens `/seeker/opportunities/:opportunityId`; that details page now uses the same apply panel and dialog.
- A successful application from public search is added to the shared Zustand store, appears in `درخواست‌های من`, and has a matching SeekerAd record so the request detail page can open.
- Duplicate submissions and submissions for expired public opportunities are blocked in the store as well as in the UI.

## Test

1. Make sure the terminal is on `fix/seeker-approval-flow`.
2. Replace all five files.
3. Run `pnpm lint` and `pnpm build`.
4. Open the seeker dashboard and test a card in `همه`, `کاری`, `کارآموزی`, `مناسب تو`, and `ذخیره‌شده`.
5. Open `/search`, choose a result, and verify the details page has `ارسال درخواست`.
6. Submit a non-empty message. Verify the page changes to `درخواستت برای کارفرما ارسال شد`.
7. Open `درخواست‌های من` and open the new request detail.
8. Verify an expired opportunity has no enabled apply action.

## Important

This is still a frontend mock flow. The request is stored in Zustand and is not sent to the backend yet. The sample opportunity's budget is converted from thousand tomans to tomans when it is added to the seeker request store.
