---
description: Create a feature branch, implement a Jira story plan, review UI/UX and code quality, and apply fixes
argument-hint: <story-key> (e.g., CHL-1)
---

## Step 1 — Read the Jira Story

Use the Atlassian MCP to fetch the story **$ARGUMENTS** from the **apsys-dev** cloud instance (cloud ID: `c2bc3e1f-7de4-45c6-a72b-55c7cd584aa8`).

1. Call `searchJiraIssuesUsingJql` with:
   - `cloudId`: `c2bc3e1f-7de4-45c6-a72b-55c7cd584aa8`
   - `jql`: `key = $ARGUMENTS`
   - `fields`: `["summary", "description", "status", "issuetype", "priority", "assignee"]`
2. Extract the **summary**, **description**, and **acceptance criteria** from the story.

## Step 2 — Create a Feature Branch

1. Run `git checkout main && git pull origin main` to ensure you start from the latest main.
2. Create and checkout a new branch named `feat/<story-key-lowercase>-<short-slug>`.
   - Example: for CHL-1 "Add real-time search filter to employees table" → `feat/chl-1-search-filter`
   - Keep the slug short (3-4 words max, kebab-case).

## Step 3 — Analyze the Project and Plan

1. Read `CLAUDE.md` to understand architecture and conventions.
2. Explore the existing codebase under `src/` to identify:
   - Existing features, their structure and patterns
   - Shared components in `src/shared/components/`
   - Redux store configuration in `src/store/store.ts`
   - Existing patterns (RTK Query slices, table components, form components) that can be reused or extended
3. Identify which files need to be modified and which new files must be created.

## Step 4 — Look Up Documentation with context7

Use the **context7 MCP** to look up the latest documentation for any libraries involved in the implementation:

- Table changes → **TanStack Table** docs
- Form changes → **React Hook Form** and **Zod** docs
- State/data fetching → **Redux Toolkit / RTK Query** docs
- Styling → **Tailwind CSS** docs

Only look up libraries directly relevant to the story requirements.

## Step 5 — Implement the Feature

Based on the story, acceptance criteria, project analysis, and library docs:

1. Implement the feature following the apsys architecture in @CLAUDE.md.
2. Ensure **every acceptance criterion** is satisfied.
3. Prefer extending existing components over creating new ones when possible.
4. Use proper TypeScript types everywhere — no `any`.
5. Use RTK Query for server state, React Hook Form + Zod for forms.
6. Keep code style consistent with the existing codebase.

## Step 6 — Verify Build

Run `npm run build` to ensure there are no TypeScript or build errors. Fix any issues before proceeding.

## Step 7 — UI/UX Review

Use the **ui-ux-reviewer** agent to evaluate the implemented feature. The agent must:

1. Navigate to the app at `http://localhost:5173`
2. Take screenshots of the new/modified UI
3. Evaluate:
   - **Placement** — Is the new component positioned correctly relative to existing elements?
   - **Behavior** — Does the feature work as described in the acceptance criteria?
   - **Responsiveness** — Does the layout adapt correctly at mobile (375px), tablet (768px), and desktop (1280px) viewports?
   - **Accessibility** — Are labels, focus states, ARIA attributes, and contrast ratios correct?
4. Report findings with specific, actionable feedback.

**Important:** After receiving the UI/UX review feedback, implement all fixes for critical and accessibility issues. Re-run the build after fixes.

## Step 8 — Code Quality Review

Invoke the `/code-quality-review` skill to review all changed files. This should check for:

- Deprecated patterns or anti-patterns
- Adherence to project coding standards in @CLAUDE.md
- Proper TypeScript usage
- RTK Query best practices
- Accessibility compliance
- Any code smells or unnecessary complexity

**Important:** After receiving the code quality feedback, implement all recommended corrections. Re-run `npm run build` and `npm run lint` after applying fixes.

## Step 9 — Final Verification

1. Run `npm run build` — must pass with zero errors.
2. Run `npm run lint` — must pass with zero errors.
3. Verify all acceptance criteria from the story are met by reviewing the implementation.

## Step 10 — Commit Changes

Stage and commit all changes with a descriptive commit message following conventional commits format:

```
feat(<story-key>): <short summary from story>
```

Do NOT push to remote — leave that decision to the user.

## Rules

- Follow the apsys architecture defined in @CLAUDE.md strictly
- Always use context7 to check docs before implementing with third-party libraries
- Do not skip the UI/UX review or code quality review steps
- Fix all critical issues found in reviews before committing
- Do not push to remote unless explicitly asked
