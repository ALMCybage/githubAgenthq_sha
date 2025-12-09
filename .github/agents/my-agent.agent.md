# GitHub Copilot Custom Agent: Automated Python Test Writer

## Purpose

This custom Copilot agent automatically generates `pytest` unit tests whenever Python functions are added or modified in your repository. The agent analyzes code changes, creates meaningful test cases, and adds/updates test files so your codebase maintains high coverage and quality.

---

## Scenario Example

- **Repository Type:** Python
- **Trigger:** Pull request opened or updated with `.py` file changes
- **Action:** Generate or update test files in the `tests/` directory for new/modified functions

---

## Sample Agent Manifest (YAML)

```yaml
name: AutomatedTestWriter
description: |
  Custom Copilot agent to write or update pytest-based unit tests for every new or modified Python function on PRs.
trigger:
  type: on-pr-update
  filters:
    files:
      - "*.py"
agent_prompt: |
  You are an expert Python test author. For every new or updated function found in pull request diffs, generate clear, comprehensive pytest-style tests covering normal operation, edge cases, and error handling. Write/import necessary objects, but do not generate example data or code unrelated to the changed functions. Place all tests in the tests/ directory, matching the filename convention test_<target_module>.py. Comment and document tests clearly.
outputs:
  - type: file
    pattern: "tests/test_*.py"
permissions:
  - code:read
  - code:write
  - pr:comment
  - metadata:read
  - pr:write
```

---

## How it Works

1. **Pull Request Trigger:**  
   The agent activates when a PR affecting `.py` files is opened or updated.
2. **Identifies Changed Functions:**  
   It reads the diff, scans for new/modified functions, and analyzes their docstrings and logic.
3. **Test Generation:**  
   - For each changed function, generates suitable pytest-style test functions.
   - Handles positive, negative, and edge test cases.
   - Writes to `tests/test_<module>.py` (creates or updates the file if it exists).
4. **Automatic PR Updates:**  
   Commits/updates the test files to the same PR, optionally commenting on the changes made.

---

## Example

Given a new function in `string_utils.py`:
```python
def reverse_string(s: str) -> str:
    """Return the reversed string. Raise ValueError for empty string."""
    if not s:
        raise ValueError("Input must not be empty")
    return s[::-1]
```

**The agent would generate/add this to `tests/test_string_utils.py`:**
```python
import pytest
from string_utils import reverse_string

def test_reverse_string_normal():
    assert reverse_string("hello") == "olleh"

def test_reverse_string_empty():
    with pytest.raises(ValueError):
        reverse_string("")
```

---

## Usage

1. **Copy and save** the agent manifest YAML above.
2. Go to your [Copilot Agent Management](https://github.com/copilot/agents) page or your organization's Copilot admin panel.
3. Use "Create agent" or similar UI and upload or paste the YAML file.
4. Assign the agent to the desired repositories.
5. Save and activate the agent.
6. That's it! The agent will automatically generate tests on new PRs.

---

## References & More Information

- [Custom Copilot Agents – GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents)
- [Manage Copilot Agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/manage-agents)
- [pytest Documentation](https://docs.pytest.org/)

---

**Adapt the manifest and prompt for JavaScript, Go, or your team’s specific requirements as needed!**
