# Admin portal for videos + platform links (Paul, 2026-11-17)

Paul's request: an entry point / admin portal where adding a video also records every platform it's on. The mobile app should follow automatically.
He said it was a "Flutter app", but the app is actually the Capacitor wrapper of this site (iOS + Android), so it shares the data.
**Start only after the current video batch on the Mac is finished and published** (Paul: 「先把这电脑里面的视频全部做完」).

## Status
- **Phase 1 (remote content) — DONE 2026-11-18.** The native app fetches `https://actually-not.com/content/v1/content.json` at startup (all entries zh+en, revisions, videos, play questions), validates it, caches it and swaps it in; Android still filters medical categories. This covers plan step 4 for *all* content, not only videos. Details: HANDOVER.md §15. The app needs one store release (1.3) carrying this code before it takes effect on phones.
- Phase 2 (the `/admin` page, steps 1–3 and 5 below) — not started.

## Today
- `src/data/videos.ts` is hand-edited: entry id → { youtubeId, durationSec, style, publishAt, landscape, en{} }. YouTube only.
- ~~The app bundles the data at build time, so a new video needs a store release.~~ From app 1.3 on, a push to main is enough (phase 1).

## Plan
1. **Data**: move videos to `public/videos.json`, keyed by entry id. Each video gets `platforms`: { youtube, youtubeShorts, bilibili, channels(视频号), douyin, xiaohongshu, tiktok, instagram, facebook, threads, pinterest, wechatArticle }, split zh / en, plus duration, style, publishAt and orientation. Keep a typed loader and tests (valid URL patterns, the entry id exists).
2. **Admin page `/admin`**, Paul only:
   - Auth: Netlify Identity (invite-only, Paul's email), or a GitHub fine-grained token kept in the browser. Recommend Netlify Identity + a Netlify Function that commits `public/videos.json` through the GitHub API. That triggers the normal Netlify build, so there are no secrets in the client.
   - UI: search or pick an entry, add or edit a video, paste platform links, preview the entry card, save.
   - The page is noindex and never linked from public pages.
3. **Entry page**: a 「在这些平台观看 / Watch on」 row of platform chips; YouTube stays embedded.
4. ✅ **App** (done in phase 1, as `/content/v1/content.json` with everything, not just videos): at startup, fetch `https://actually-not.com/videos.json` (network-first, cached; fall back to the bundled copy). New videos then show up without a store release. Android keeps filtering medical categories.
5. **Automation hook**: after each publish, the publishing session writes the platform URL into videos.json, using the same function or a CLI `scripts/add-video-link.mjs`.
6. **Checks**: `npm run check`, a build, and the admin flow end to end on a deploy preview. Update HANDOVER.md.
