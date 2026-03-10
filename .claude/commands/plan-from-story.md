---
description: Read a Jira story from the CHL board and generate an implementation plan
argument-hint: <story-key> (e.g., CHL-1)
---

## Step 1 — Read the Jira Story

Use the Atlassian MCP to fetch the story **$ARGUMENTS** from the **apsys-dev** cloud instance (cloud ID: `c2bc3e1f-7de4-45c6-a72b-55c7cd584aa8`).

1. Call `searchJiraIssuesUsingJql` with:
   - `cloudId`: `c2bc3e1f-7de4-45c6-a72b-55c7cd584aa8`
   - `jql`: `key = $ARGUMENTS`
   - `fields`: `["summary", "description", "status", "issuetype", "priority", "assignee"]`
2. Extract and present:
   - **Summary** — the title of the story
   - **Description** — the full user story
   - **Acceptance Criteria** — listed as a checklist

## Step 2 — Analyze the Project

1. Read `CLAUDE.md` to understand the project architecture and conventions.
2. Explore the existing codebase under `src/` to identify:
   - Existing features in `src/features/` and their structure
   - Shared components in `src/shared/components/`
   - The Redux store configuration in `src/store/store.ts`
   - Any existing patterns (RTK Query slices, table components, form components) that can be reused or extended
3. Identify which existing files will need to be modified and which new files must be created.

## Step 3 — Look Up Documentation with context7

Use the **context7 MCP** to look up the latest documentation for any libraries that will be involved in the implementation. For example:

- If the story involves table changes: look up **TanStack Table** docs
- If the story involves forms: look up **React Hook Form** and **Zod** docs
- If the story involves state/data fetching: look up **Redux Toolkit / RTK Query** docs
- If the story involves styling: look up **Tailwind CSS** docs

Only look up libraries that are directly relevant to the story requirements.

## Step 4 — Generate the Implementation Plan

Based on the story details, project analysis, and library docs, produce a structured implementation plan with the following format:

### Plan Output Format

```
# Implementation Plan for [STORY-KEY]: [Summary]

## Overview
Brief description of what will be implemented and why.

## Affected Files
- **New files:** list each file to create with a one-line description
- **Modified files:** list each existing file to modify with what changes are needed

## Implementation Steps
Numbered steps in order of implementation. Each step should include:
1. What to do
2. Which file(s) are involved
3. Key implementation details or patterns to follow

## Acceptance Criteria Mapping
Map each acceptance criterion to the specific step(s) that satisfy it.

## Technical Notes
Any important considerations: edge cases, performance, accessibility, etc.
```

## Rules

- Follow the apsys architecture defined in @CLAUDE.md strictly
- Do NOT implement the feature — only produce the plan
- Do NOT create or modify any files in `src/`
- Prefer extending existing components over creating new ones when possible
- Always consider accessibility and responsive design in the plan
- If the story is ambiguous, list assumptions explicitly
