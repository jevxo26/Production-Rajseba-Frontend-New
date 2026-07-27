const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all files
const filesOutput = execSync('grep -rl "useRole\\|useAuth" src/').toString();
const files = filesOutput.split('\n').filter(Boolean);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');

  // Skip the contexts themselves
  if (file.includes('RoleContext.tsx') || file.includes('AuthContext.tsx')) continue;

  let modified = false;

  if (content.includes('useRole')) {
    // Replace imports
    content = content.replace(/import\s+{\s*([^}]*useRole[^}]*)\s*}\s*from\s*["']@\/context\/RoleContext["'];?/, (match, p1) => {
      // Check if UserRole is imported
      if (p1.includes('UserRole')) {
        return `import { useAppSelector, useAppDispatch } from "@/redux/hooks";\nimport { UserRole, setRole as setAuthRole, getRoleName } from "@/redux/features/auth/authSlice";`;
      } else {
        return `import { useAppSelector } from "@/redux/hooks";\nimport { getRoleName } from "@/redux/features/auth/authSlice";`;
      }
    });

    // Replace usages
    content = content.replace(/const\s*{\s*role\s*,\s*roleName\s*}\s*=\s*useRole\(\);?/g, 'const role = useAppSelector((state) => state.auth.role) || "superadmin";\n  const roleName = getRoleName(role);');
    content = content.replace(/const\s*{\s*role\s*}\s*=\s*useRole\(\);?/g, 'const role = useAppSelector((state) => state.auth.role) || "superadmin";');
    content = content.replace(/const\s*{\s*role\s*,\s*setRole\s*,\s*roleName\s*}\s*=\s*useRole\(\);?/g, 'const role = useAppSelector((state) => state.auth.role) || "superadmin";\n  const dispatch = useAppDispatch();\n  const setRole = (r: UserRole) => dispatch(setAuthRole(r));\n  const roleName = getRoleName(role);');

    modified = true;
  }

  if (content.includes('useAuth')) {
    content = content.replace(/import\s+{\s*useAuth\s*}\s*from\s*["']@\/context\/AuthContext["'];?/, `import { logout as authLogout } from "@/redux/features/auth/authSlice";\n// Note: useAppSelector and useAppDispatch should be imported from @/redux/hooks`);
    content = content.replace(/const\s*{\s*logout\s*}\s*=\s*useAuth\(\);?/g, 'const dispatch = useAppDispatch();\n  const logout = () => dispatch(authLogout());');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, content);
  }
}

console.log('Migration complete');
