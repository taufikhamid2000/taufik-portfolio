# Repository Audit & Strategic Plan

**Generated:** 2026-05-19 (original audit). The inventory and recommendations from "Executive Summary" onward are **historical** — they describe the state on that date. The status update immediately below records what has changed since, verified against this repo's git log, `supabase/migrations/`, and `gh repo list` on 2026-09-02.
**Total repositories audited:** 18 (including this portfolio)
**Owner:** taufikhamid2000

---

## Status update — 2026-09-02

Evidence: `git log` since 2026-05-19 (~85 commits), migration files dated 20260524 onward (they double as a changelog), and `gh repo list --json name,isArchived,updatedAt`.

### Portfolio (this repo)
- **Slim-down done, but not as a static site.** Part 6 said "auth/admin/Supabase removed"; the opposite happened. On 2026-05-20 the portfolio became a DB-backed showcase (`public.projects`) with an owner-only admin CMS, sprint planning, Google/email sign-in, and password reset. Sprints/tasks were made publicly readable on 2026-08-08.
- All standalone-worthy subprojects left `app/projects/`: SBMP and JobMatch migrated to new repos `sbmp`/`jobmatch`; TekaTeki, UYE, Veyoyee, ACCodeSEA folders deleted (2026-05-24). Only `InteractiveReflection` remains, as recommended.
- Dead API routes and 12 unused npm deps trimmed; Next.js 14 -> 16.3; ESLint 8 -> 9 with lint re-enabled (2026-06-08); Node pinned to >= 24 (2026-08-25).
- New since May: "Vision for Malaysia" section (`/vision`, `/ms/vision`) with public idea submissions and Claude-backed BM translations (2026-06-22); full visual redesign (WebGL hero, tilt cards, glassmorphism dark mode, unified sidebar, 2026-08); accessibility pass; `projects.image_url` + `public/screenshots/` (2026-09-02).

### Standalone repos — corrections to the May inventory
- **myquiza** is no longer "empty boilerplate". It is an ASP.NET Core (.NET 10) REST API, live on Render at https://myquiza-api.onrender.com (Scalar docs at `/scalar/v1`), validating Supabase JWTs and serving content/quiz/attempt/progress/leaderboard endpoints against EduBridge's Supabase DB. Sprint 5 built it (2026-06-09), live-verified the same day; Sprint 6 wired EduBridge to consume it (2026-06-14). The TekaTeki -> myquiza migration never happened; the Next.js boilerplate was removed instead.
- **Syllabuzz** is no longer an incomplete stub. Sprint 7 (2026-06-14 to 06-16) turned it into a native Android (Kotlin) client for the MyQuiza API — Retrofit, Supabase auth via REST, subject/chapter/topic/quiz tree, scoring, progress, leaderboard — verified on a physical device. It was **archived on 2026-06-08 and then un-archived**; `gh` shows `isArchived: false`.
- **EduBridge** ran a hardening sprint (Sprint 8, 2026-06-17): 8/10 shipped (privilege-escalation fix, lint/type-check in CI, ~20 debug routes deleted, API tests, dependency monitoring), 2 blocked.
- **contoh** and **studenthub** no longer exist (deleted 2026-06-08).
- **mysertifico** deployment taken down (2026-05-24); repo is archived and private.
- **ACCodeSEA**: `nextjs-animated-slider` is archived; the new home is `ac-code-sea` (pivoted to a platformer, 2026-05-24).
- **nogipin** was renamed to **MyBeratur**.
- Archive recommendation vs reality (`gh`, 2026-09-02): `WXGeoDemo.API` archived; `pokemonapp` archived; `tiwikom` archived (tiwikom-v2 is canonical); `Syllabuzz` **not** archived (revived, see above); `proxlox` **not** archived — it was archived on 2026-06-08 but has fresh commits from 2026-08-04 (dark-mode fixes, tab titles), so it was un-archived and is being developed.
- New repos not in the May audit: `duitduit` (private), `atlas` (private), `quizapp`, `TongTong`, `JomKomute`, `georepo-webapp-taufik` (private). Current total: 25 repos, 5 archived.

### Still open
- [ ] Decide `proxlox`'s purpose (Part 4 item 2) — it is active again but still has no stated goal in the audit.
- [ ] `myquiza -> tekateki` rename is moot; consider closing that item. `TekaTeki`'s hierarchical quiz code was deleted, not migrated.
- [ ] `selectyourleague` / `slidemarket` remain concept-only cards (deliberate, per Part 6).
- [ ] EduBridge Sprint 8 leftovers: per-question results breakdown (blocked on MyQuiza returning per-question correctness) and the auth-session caching refactor (held for sign-off).
- [ ] MyQuiza data flags from Sprint 7: sparse quiz content, leaderboard `displayName` all null.
- [ ] Portfolio: `ANTHROPIC_API_KEY` is not in `.env.example`; `docs/` audit refresh cadence is manual.
- [ ] Update this document's Part 5 "final repo list" — the real list has grown (6 new repos) rather than shrunk to 13.

---

## Executive Summary

You have **18 repositories** on your local machine. After analysis:

- **2 are completely empty** (delete candidates)
- **3 are early-stage stubs** (review / decide)
- **2 are learning/tutorial projects** (could be archived)
- **8 are substantial, active projects** (keep & maintain)
- **3 are duplicates/overlaps** between portfolio and standalone repos
- **5 portfolio subprojects have no standalone repo** (migration candidates)

The portfolio repo has grown into a **monolithic showcase** that duplicates and outdates work in your standalone repos. The recommended path is to **simplify the portfolio** into a clean landing page, **migrate the unique subprojects out**, and **delete the empty stubs**.

---

## Part 1 — Repository Inventory (All 18)

### A. Delete Candidates (Empty Stubs)

| Repo | Commits | Files | Status | Recommendation |
|------|---------|-------|--------|----------------|
| **contoh** | 1 | Just README "# contoh" | Completely empty | **DELETE** — name means "example" in Malay, likely a test repo |
| **studenthub** | 1 | Just README "# studenthub" | Completely empty | **DELETE** — never started |

### B. Review / Decide (Minimal Content)

| Repo | Commits | Stack | Status | Recommendation |
|------|---------|-------|--------|----------------|
| **myquiza** | 2 | Next.js 15 + Supabase | Boilerplate + TODO.md only | **DELETE or REVIVE** — overlaps with TekaTeki (portfolio) and edubridge |
| **proxlox** | 2 | Next.js | Just sidebar/header components | **DELETE or DEVELOP** — unclear purpose, very minimal |
| **WXGeoDemo.API** | 3 | C# .NET API | No README, no clear purpose | **ARCHIVE** — looks like tutorial/learning |
| **Syllabuzz** | 3 | Android (Java/Kotlin, Gradle) | 2 fragments only, no README | **ARCHIVE or COMPLETE** — incomplete mobile app |
| **tiwikom-v2** | 2 | ASP.NET Core 8 | Solid foundation, recent rewrite | **DEVELOP** — V2 of tiwikom (Angular) in C# |

### C. Learning / Tutorial Projects

| Repo | Commits | Stack | Status | Recommendation |
|------|---------|-------|--------|----------------|
| **pokemonapp** | 5 | Vue 3 + Vite + Pinia | PokeAPI tutorial completed | **KEEP as learning sample** or archive |
| **template** | 4 | Next.js 13 + Supabase Auth | Starter template for future projects | **KEEP** — useful for bootstrapping new projects |
| **nextjs-animated-slider** | 27 | Next.js 13 (cloned from K-H-Rayhan) | Original "ACCodeSEA" — has feedback CRUD, storyline | **KEEP or RENAME to ACCodeSEA** — historically meaningful |

### D. Substantial, Active Projects (Keep & Maintain)

| Repo | Commits | Stack | Description |
|------|---------|-------|-------------|
| **BilikSewa** | 62 | ASP.NET Core (multi-project solution) | Rental room platform with verification, shuttle vans, dark mode, Render deployment |
| **edubridge** | **159** | Next.js 15 + Supabase + React Query + Jest | Full educational platform with admin panel, quiz attempts, leaderboard, comments, performance optimizations |
| **mysertifico** | 68 | Next.js 13 + Supabase + PWA | Digital certificate management & verification, student profiles, animations |
| **nogipin** ("MyBeratur") | 29 | Next.js | Malaysian gov queue system (IC/license/passport renewal), QR/PDF download |
| **tiwikom** | 23 | Angular 20 | Knowledge-sharing platform with auth, roles, posts, comments, filtering |
| **uye** | 20 | Laravel/PHP + Docker | University Young Entrepreneur platform with business profiles, listings |
| **veyoyee** | **115** | Next.js 15 + Supabase + Shadcn UI + Zustand | Survey platform with admin panel, marketplace, leaderboard, claim system, reputation |
| **taufik-portfolio** | 80 | Next.js 14 + Supabase | This portfolio (overgrown, see Part 2) |

---

## Part 2 — Portfolio Audit (taufik-portfolio)

The portfolio has **9 subprojects** in `app/projects/`. Here's how they map to standalone repos:

### Mapping: Portfolio Subprojects ↔ Standalone Repos

| Portfolio Subproject | Files | Standalone Repo | Status |
|---------------------|-------|----------------|--------|
| **ACCodeSEA** | ~40 (complex) | `nextjs-animated-slider` (original) | **DUPLICATE-ISH** — portfolio version is complete rewrite |
| **Veyoyee** | 10 | `veyoyee` (much more advanced) | **OUTDATED DUPLICATE** — standalone is far better |
| **UYE** | 3 (about page only) | `uye` (Laravel) | **NO OVERLAP** — different tech, portfolio is just a stub |
| **TekaTeki** | 11 | None (related to `myquiza` concept) | **NO REPO** |
| **SBMP** | 35 | None | **NO REPO** |
| **jobmatch** | 14 | None | **NO REPO** |
| **InteractiveReflection** | 4 | None | **NO REPO** |
| **selectyourleague** | 3 (about only) | None | **NO REPO** |
| **slidemarket** | 3 (about only) | None | **NO REPO** |

### Portfolio Bloat — Things That Don't Belong in a Portfolio

The portfolio repo currently includes infrastructure that's overkill:

1. **Supabase auth + OAuth** (`app/auth/`, `app/middleware.ts`)
2. **Admin dashboard** (`app/projects/ACCodeSEA/Admin/`)
3. **CRUD API routes** (`app/api/projects`, `app/api/surveys`, `app/api/quizzes`, `app/api/hierarchy`)
4. **Database hierarchy management** (`app/api/hierarchy/[type]/`)
5. **Project creation forms** (`app/create-project/`)
6. **Survey response collection** (`app/api/surveys/responses/`)

A portfolio should be a **showcase**, not a **platform**.

---

## Part 3 — Migration Opportunities

### Portfolio → Standalone Repos

#### 1. **TekaTeki → Create new repo OR migrate to `myquiza`**
- Portfolio's TekaTeki is a fairly complete quiz platform: AdminPage, AnswerQuiz, CreateQuiz, VerifyQuiz, MostAnswered
- Uses hierarchical structure (Levels → Subjects → Chapters → Lessons)
- `myquiza` is empty boilerplate — **rename `myquiza` to `tekateki` and migrate the code there**
- Alternatively: this overlaps with `edubridge` (also educational+quiz). Decide if it's a separate product or part of edubridge.

#### 2. **SBMP → Create new repo `sbmp`**
- Substantial: 35 files across Dashboard, FAQSupport, InventoryManagement, OrderProcessing, Profile
- No standalone repo exists — this is genuinely portfolio-only work that deserves its own home
- **Recommendation:** Create `sbmp` repo and migrate

#### 3. **jobmatch → Create new repo `jobmatch`**
- 14 files: Dashboard, ApplicationTracking, JobPostingManagement, UserManagement, FAQSupport, Profile
- No standalone repo — **create one and migrate**

#### 4. **ACCodeSEA → Consolidate with `nextjs-animated-slider` OR new repo `accodesea`**
- The original `nextjs-animated-slider` is old (Next.js 13 Pages Router, SQLite) and limited
- The portfolio version is much more complete (Storyline w/ choice pathways, sound, Admin, Contact, Join, Feedback)
- **Recommendation:** Rename `nextjs-animated-slider` → `accodesea` and migrate the portfolio version into it (it's a generational upgrade)

#### 5. **InteractiveReflection** — Keep in portfolio
- Only 4 files, it's a small interactive component demo
- Doesn't need its own repo

#### 6. **selectyourleague, slidemarket** — Keep as concept pages OR build them
- Both are just "about" pages with descriptions
- Either: build them out into real apps with their own repos, OR keep as idea landing pages in portfolio

### Standalone → Portfolio (What to Remove from Portfolio)

#### 1. **Portfolio's Veyoyee → DELETE from portfolio**
- The standalone `veyoyee` repo is **far** more advanced (115 commits, full admin panel, marketplace, leaderboard)
- Portfolio version is outdated prototype
- **Action:** Delete `app/projects/Veyoyee/` from portfolio, replace with a link card pointing to the standalone repo/deployment

#### 2. **Portfolio's UYE → DELETE from portfolio**
- Portfolio has only an "about" page
- Real work is in standalone `uye` Laravel repo
- **Action:** Replace with link card to standalone repo

---

## Part 4 — Strategic Recommendations

### Immediate Actions (Easy Wins)

1. **DELETE these GitHub repos** (after confirming they're truly empty):
   - `contoh`
   - `studenthub`

2. **ARCHIVE these GitHub repos** (mark read-only, keep for history):
   - `WXGeoDemo.API` — unless you remember its purpose
   - `Syllabuzz` — incomplete Android project
   - `pokemonapp` — tutorial completed
   - `proxlox` — unclear purpose

### Medium-term Actions (Refactoring)

3. **Reshape the portfolio** into a clean showcase:
   - Remove all auth/Supabase/admin infrastructure
   - Replace subproject pages with project cards (name, description, screenshot, live link, GitHub link)
   - Keep only `InteractiveReflection` (and similar small demos) as embedded showcases
   - Result: ~10 files instead of 100+

4. **Migrate portfolio-only work to standalone repos:**
   - SBMP → new repo `sbmp`
   - jobmatch → new repo `jobmatch`
   - TekaTeki → revive `myquiza` (rename) or new repo `tekateki`
   - ACCodeSEA → migrate into `nextjs-animated-slider` (consider renaming to `accodesea`)

5. **Resolve duplicates:**
   - Delete portfolio's `Veyoyee/` (standalone is canonical)
   - Delete portfolio's `UYE/` (standalone is canonical)

### Long-term Decisions (Product Strategy)

6. **Decide on overlapping projects:**
   - `tiwikom` (Angular) vs `tiwikom-v2` (ASP.NET) — pick one, archive the other
   - `myquiza` vs `TekaTeki` vs `edubridge` (quiz/learning) — consolidate or differentiate

7. **selectyourleague & slidemarket** — Either:
   - Build them as standalone apps (new repos), OR
   - Remove from portfolio (concept-only doesn't showcase technical skill)

---

## Part 5 — Final Recommended Repo List

After cleanup, your GitHub profile would have these focused repos:

### Active Products (8)
1. **edubridge** — educational platform (flagship)
2. **veyoyee** — survey platform (flagship)
3. **BilikSewa** — rental room platform (ASP.NET)
4. **mysertifico** — certificate management
5. **nogipin** (MyBeratur) — Malaysian gov queue system
6. **uye** — Laravel university entrepreneur platform
7. **tiwikom** OR **tiwikom-v2** — knowledge sharing (pick one)
8. **accodesea** (formerly nextjs-animated-slider) — Assassin's Creed community

### New Migrations from Portfolio (3)
9. **sbmp** — Small Business Management Platform
10. **jobmatch** — job tracking platform
11. **tekateki** (or revive myquiza) — quiz platform

### Tooling / Templates (1)
12. **template** — Next.js + Supabase starter

### The Portfolio (1)
13. **taufik-portfolio** — slim landing page linking to all of the above

**Total: ~13 focused repos** (down from 18, with much clearer purpose for each)

---

## Part 6 — Decisions Made (2026-05-19)

User delegated decisions. Resolutions:

1. **`nextjs-animated-slider` history kept.** Will migrate portfolio's ACCodeSEA into this repo (consider renaming repo to `accodesea` later). K-H-Rayhan attribution stays as learning-journey artifact.
2. **`selectyourleague` and `slidemarket` stay as concepts** — keep as idea cards in portfolio; don't build unless interest revives.
3. **TekaTeki stays separate from edubridge** — different focus (quiz hierarchy vs full LMS). Will migrate TekaTeki into the empty `myquiza` repo.
4. **`tiwikom-v2` replaces `tiwikom`.** Angular version archived; ASP.NET version is the going-forward path.
5. **Auth/admin/Supabase removed from portfolio** — portfolio is now a static showcase.
6. **Execution started** — safe local changes done; destructive remote ops (repo deletes, pushes) deferred to user.

## Part 7 — Execution Status

### Completed (2026-05-19)
- [x] Audit document created
- [x] Landing page refactored to clean static showcase (no Supabase dependency, hardcoded project list)

### Pending — Local (safe, no remote impact)
- [ ] Remove unused subproject folders from `app/projects/` (after migrating their unique content)
- [ ] Migrate `app/projects/SBMP/` → new local folder `../sbmp/`
- [ ] Migrate `app/projects/jobmatch/` → new local folder `../jobmatch/`
- [ ] Migrate `app/projects/TekaTeki/` → into `../myquiza/`
- [ ] Migrate `app/projects/ACCodeSEA/` → into `../nextjs-animated-slider/`
- [ ] Delete `app/projects/Veyoyee/` (standalone is canonical)
- [ ] Delete `app/projects/UYE/` (standalone is canonical)
- [ ] Remove `app/api/` routes that are no longer used by the slim portfolio
- [ ] Remove `app/auth/`, `app/create-project/`, `app/middleware.ts` (auth infrastructure)
- [ ] Trim `package.json` dependencies (Supabase, Chart.js, Leaflet, etc. — only needed by removed subprojects)

### Pending — Remote (user must execute)
- [ ] `gh repo delete taufikhamid2000/contoh --yes`
- [ ] `gh repo delete taufikhamid2000/studenthub --yes`
- [ ] `gh repo archive taufikhamid2000/WXGeoDemo.API`
- [ ] `gh repo archive taufikhamid2000/Syllabuzz`
- [ ] `gh repo archive taufikhamid2000/pokemonapp`
- [ ] `gh repo archive taufikhamid2000/proxlox`
- [ ] `gh repo archive taufikhamid2000/tiwikom` (replaced by tiwikom-v2)
- [ ] Create new GitHub repos for: `sbmp`, `jobmatch` (after local migration)
- [ ] Rename `myquiza` → `tekateki` (optional, after migration)
- [ ] Rename `nextjs-animated-slider` → `accodesea` (optional)
- [ ] Push portfolio cleanup commit
