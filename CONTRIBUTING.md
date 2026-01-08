# Contributing to CivicTrust

Thank you for your interest in contributing to CivicTrust! This document provides guidelines and instructions for contributing.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Testing](#testing)
6. [Pull Request Process](#pull-request-process)
7. [Issue Guidelines](#issue-guidelines)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Publishing others' private information
- Other unprofessional conduct

---

## Getting Started

### Prerequisites

- Rust 1.70+
- Node.js 18+
- Git
- Casper CLI
- Basic understanding of blockchain concepts

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   git clone https://github.com/[your-username]/civictrust.git
   cd civictrust
   ```

2. **Install dependencies**
   ```bash
   # Contracts
   cd contracts
   cargo build
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## Development Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates

Examples:
- `feature/multi-sig-approval`
- `fix/voting-deadline-bug`
- `docs/update-deployment-guide`

### Commit Messages

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code restructuring
- `test` - Tests
- `chore` - Maintenance

Examples:
```
feat(escrow): add multi-signature approval

Implements multi-sig functionality for large projects.
Requires N of M signatures to approve milestones.

Closes #123
```

```
fix(voting): correct deadline validation

Fixed bug where voting deadline was not properly enforced.
```

---

## Coding Standards

### Rust (Smart Contracts)

**Style**
```rust
// Use rustfmt
cargo fmt

// Use clippy
cargo clippy
```

**Naming**
- `snake_case` for functions and variables
- `PascalCase` for types and structs
- `SCREAMING_SNAKE_CASE` for constants

**Documentation**
```rust
/// Creates a new project with milestone-based funding.
///
/// # Arguments
/// * `name` - Project name
/// * `beneficiary` - Address to receive funds
/// * `milestones` - List of milestone descriptions
///
/// # Returns
/// Project ID
pub fn create_project(
    &mut self,
    name: String,
    beneficiary: Address,
    milestones: Vec<String>,
) -> u64 {
    // Implementation
}
```

**Error Handling**
```rust
// Use require! for validation
require!(amount > U512::zero(), "Amount must be positive");

// Use Result for fallible operations
pub fn get_project(&self, id: u64) -> Result<Project, Error> {
    self.projects.get(&id).ok_or(Error::ProjectNotFound)
}
```

### TypeScript (Frontend)

**Style**
```bash
# Use ESLint
npm run lint

# Use Prettier
npm run format
```

**Naming**
- `camelCase` for variables and functions
- `PascalCase` for components and types
- `UPPER_CASE` for constants

**Components**
```typescript
// Functional components with TypeScript
interface ProjectCardProps {
  project: Project
  onSelect: (id: number) => void
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <div onClick={() => onSelect(project.id)}>
      {project.name}
    </div>
  )
}
```

**Hooks**
```typescript
// Custom hooks start with 'use'
function useProject(projectId: number) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    loadProject(projectId).then(setProject).finally(() => setLoading(false))
  }, [projectId])
  
  return { project, loading }
}
```

---

## Testing

### Smart Contract Tests

**Unit Tests**
```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_project() {
        // Arrange
        let env = odra_test::env();
        let mut contract = CivicTrustEscrowHostRef::deploy(&env, 3u32);
        
        // Act
        contract.create_project(/* ... */);
        
        // Assert
        let project = contract.get_project(1).unwrap();
        assert_eq!(project.name, "Test Project");
    }
}
```

**Run Tests**
```bash
cd contracts
cargo test
cargo odra test
```

### Frontend Tests

**Component Tests**
```typescript
import { render, screen } from '@testing-library/react'
import ProjectCard from './ProjectCard'

test('renders project name', () => {
  const project = { id: 1, name: 'Test Project', /* ... */ }
  render(<ProjectCard project={project} onSelect={() => {}} />)
  expect(screen.getByText('Test Project')).toBeInTheDocument()
})
```

**Run Tests**
```bash
cd frontend
npm test
```

---

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests**
   ```bash
   # Contracts
   cd contracts
   cargo test
   cargo clippy
   
   # Frontend
   cd frontend
   npm test
   npm run lint
   ```

3. **Update documentation**
   - Update README if needed
   - Add/update code comments
   - Update CHANGELOG

### Submitting PR

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill in template

3. **PR Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - [ ] Unit tests pass
   - [ ] Integration tests pass
   - [ ] Manual testing completed
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   - [ ] No new warnings
   
   ## Related Issues
   Closes #123
   ```

### Review Process

1. **Automated Checks**
   - CI/CD pipeline runs
   - Tests must pass
   - Linting must pass

2. **Code Review**
   - At least 1 approval required
   - Address all comments
   - Make requested changes

3. **Merge**
   - Squash and merge
   - Delete branch after merge

---

## Issue Guidelines

### Creating Issues

**Bug Report Template**
```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 0.1.0]

## Screenshots
If applicable
```

**Feature Request Template**
```markdown
## Feature Description
Clear description of the feature

## Problem It Solves
What problem does this address?

## Proposed Solution
How should it work?

## Alternatives Considered
Other approaches you've thought about

## Additional Context
Any other information
```

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `priority: high` - High priority
- `priority: low` - Low priority

---

## Development Tips

### Smart Contracts

1. **Gas Optimization**
   - Minimize storage operations
   - Use efficient data structures
   - Batch operations when possible

2. **Security**
   - Validate all inputs
   - Check access control
   - Prevent reentrancy
   - Test edge cases

3. **Testing**
   - Test happy path
   - Test error cases
   - Test edge cases
   - Test gas usage

### Frontend

1. **Performance**
   - Lazy load components
   - Optimize images
   - Minimize bundle size
   - Use React.memo for expensive components

2. **UX**
   - Show loading states
   - Handle errors gracefully
   - Provide feedback
   - Make it accessible

3. **Wallet Integration**
   - Handle disconnections
   - Verify transactions
   - Show clear errors
   - Test on testnet first

---

## Resources

### Documentation
- [Casper Docs](https://docs.casper.network)
- [Odra Framework](https://odra.dev/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)

### Tools
- [Casper Explorer](https://testnet.cspr.live)
- [CSPR.click](https://cspr.click)
- [Rust Playground](https://play.rust-lang.org)
- [TypeScript Playground](https://www.typescriptlang.org/play)

### Community
- [Casper Discord](https://discord.gg/casperblockchain)
- [GitHub Discussions](https://github.com/[repo]/discussions)

---

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

Top contributors may be invited to:
- Join core team
- Speak at events
- Write blog posts

---

## Questions?

- Open a [GitHub Discussion](https://github.com/[repo]/discussions)
- Join our [Discord](https://discord.gg/[server])
- Email us at [email]

---

**Thank you for contributing to CivicTrust! Together we're building the future of transparent funding.**
