# Security Updates

## Date: 2026-02-14

### Vulnerabilities Fixed

Updated dependencies to address security vulnerabilities:

#### 1. FastAPI (0.109.0 → 0.115.5)
- **Issue**: Content-Type Header ReDoS vulnerability
- **Severity**: Medium
- **Patched in**: 0.109.1
- **Upgraded to**: 0.115.5 (latest stable)

#### 2. langchain-community (0.0.10 → 0.3.27)
- **Issue 1**: XML External Entity (XXE) Attacks
  - Patched in: 0.3.27
- **Issue 2**: SSRF vulnerability in RequestsToolkit
  - Patched in: 0.0.28
- **Issue 3**: Pickle deserialization of untrusted data
  - Patched in: 0.2.4
- **Upgraded to**: 0.3.27 (addresses all issues)

#### 3. python-multipart (0.0.6 → 0.0.22)
- **Issue 1**: Arbitrary File Write via Non-Default Configuration
  - Patched in: 0.0.22
- **Issue 2**: Denial of Service (DoS) via malformed multipart/form-data
  - Patched in: 0.0.18
- **Issue 3**: Content-Type Header ReDoS
  - Patched in: 0.0.7
- **Upgraded to**: 0.0.22 (addresses all issues)

#### 4. langchain (0.1.0 → 0.3.27)
- Updated to match langchain-community version for compatibility

### Verification

All dependencies have been verified against the GitHub Advisory Database:
✅ **No vulnerabilities found**

### Installation

To update your local installation:

```bash
cd backend
pip install --upgrade -r requirements.txt
```

### Compatibility

All updates maintain backward compatibility with the existing codebase. No code changes were required.

### Next Steps

- Regular dependency updates recommended
- Monitor security advisories
- Run `pip list --outdated` periodically to check for updates

---

**Security Scan Status**: ✅ CLEAN (0 vulnerabilities)
**Last Updated**: 2026-02-14
