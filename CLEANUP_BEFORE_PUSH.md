# 🧹 Cleanup Before Pushing to GitHub

## Files to DELETE (Redundant Documentation)

These files are redundant and can be safely deleted:

```bash
# Delete these files:
rm COMPLETE_ANSWERS.md
rm CREATE_YOUR_ART.md
rm ORGANIZE_YOUR_IMAGES.md
rm PROJECT_OVERVIEW.md
rm YOUR_ACTION_PLAN.md
rm YOUR_CHECKLIST.md
rm VIEW_NFT_IN_METAMASK.md
```

## Files to KEEP

Essential documentation:
- ✅ `README.md` - Main documentation
- ✅ `QUICK_START.md` - Quick start guide
- ✅ `DEPLOYMENT_GUIDE.md` - Deployment instructions
- ✅ `BLOCKCHAIN_GUIDE.md` - Blockchain explanation
- ✅ `SETUP_YOUR_ENV.md` - Environment setup
- ✅ `DEPLOYMENT_CHECKLIST.md` - Pre-deployment checklist

## Verify .gitignore

Make sure these are in `.gitignore`:

```
# Sensitive data
.env
.env.local
.env.*.local
minted-nfts.json
art-generator/uploaded.json

# Private keys
*.key
*.pem
private-key.txt

# Dependencies
node_modules/

# Build outputs
dist/
build/
```

## Security Check Commands

Run these to verify no secrets are committed:

```bash
# Check for private keys
grep -r "PRIVATE_KEY" . --exclude-dir=node_modules --exclude="*.md" --exclude="*.example"

# Check for API keys
grep -r "API_KEY" . --exclude-dir=node_modules --exclude="*.md" --exclude="*.example"

# Check .env files are ignored
git status | grep ".env"
# Should return nothing (if .env exists but is ignored)
```

## Final Checklist Before Push

- [ ] Deleted redundant markdown files
- [ ] Verified `.gitignore` is correct
- [ ] No `.env` files in git
- [ ] No `minted-nfts.json` in git
- [ ] No `uploaded.json` in git
- [ ] No private keys anywhere
- [ ] All `.env.example` files have placeholder values only
- [ ] README.md is updated and professional
- [ ] All dependencies are in `package.json`

## Clean Git History (Optional)

If you accidentally committed secrets before:

```bash
# WARNING: This rewrites history!
# Only do this if you haven't shared the repo yet

# Remove sensitive file from all history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/sensitive/file" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (only if repo is private and you're the only user)
git push origin --force --all
```

## Recommended: Use GitHub Secrets Scanner

GitHub will automatically scan for exposed secrets. If it finds any:
1. Immediately rotate those keys/secrets
2. Remove them from git history
3. Update your `.gitignore`

---

**After cleanup, you're ready to push!**
