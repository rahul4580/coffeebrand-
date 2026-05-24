# Hydration Error Fix Plan - BLACKBOXAI

## Status: In Progress

### Step 1: Create this TODO.md [✅ DONE]

### Step 2: Add suppressHydrationWarning to dynamic elements in Client Components [✅ DONE]

**Fixed components:**
- ✅ ScrollScaleVideo.tsx
- ✅ GlideSection.tsx  
- ✅ CursorSection.tsx
- ✅ ProgressSection.tsx
- ✅ JasmineHero.tsx (already had suppressHydrationWarning)

### Step 3: Test [IN PROGRESS]
Run `cd my-app && npm run dev`
Check console - hydration errors should be gone.

### Step 4: Final [READY]

### Step 3: Test after each edit
- Run `cd my-app && npm run dev`
- Check browser console for hydration errors
- Mark step [✅] when no errors

### Step 4: Additional fixes if needed
- [ ] Read/fix RevealOnScroll.tsx if errors persist
- [ ] Check commented components (SequenceSection etc.)

### Step 5: Final verification
- [ ] Complete task with attempt_completion
- [ ] Provide run command: `cd my-app && npm run dev`

**Next Action:** Proceed with batch edits to Client Components.

