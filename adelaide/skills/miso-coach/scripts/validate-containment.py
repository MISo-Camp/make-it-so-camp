#!/usr/bin/env python3
"""Validate one session path without following symlinked components."""

import os
import sys


def reject(reason: str) -> int:
    print(f"CONTAINMENT REJECT: {reason}")
    return 1


def is_beneath(root: str, candidate: str) -> bool:
    try:
        return os.path.commonpath((root, candidate)) == root
    except ValueError:
        return False


def main(argv) -> int:
    if len(argv) != 3:
        print(f"usage: {argv[0]} ROOT CANDIDATE", file=sys.stderr)
        return 2

    root = os.path.abspath(argv[1])
    candidate = os.path.abspath(argv[2])

    # Reject traversal before resolving anything; a session must be named under
    # the intended root, not merely happen to resolve there.
    if not is_beneath(root, candidate):
        return reject("candidate is not lexically beneath root")

    # Check only root and descendants. System-level ancestors may legitimately
    # be symlinked (for example /var on macOS), but no session component may be.
    relative = os.path.relpath(candidate, root)
    current = root
    if os.path.lexists(current) and os.path.islink(current):
        return reject("root is a symlink")
    if relative != ".":
        for component in relative.split(os.sep):
            current = os.path.join(current, component)
            if os.path.lexists(current) and os.path.islink(current):
                return reject("candidate contains a symlinked component")

    resolved_root = os.path.realpath(root)
    resolved_candidate = os.path.realpath(candidate)
    if not is_beneath(resolved_root, resolved_candidate):
        return reject("resolved candidate is outside root")

    print("CONTAINMENT PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
