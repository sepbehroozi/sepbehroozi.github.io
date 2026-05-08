#!/usr/bin/env bash
# Verifies that legacy URLs return 200 with the expected content type.
# Usage:
#   scripts/smoke-test-urls.sh                 # default base http://localhost:4321
#   scripts/smoke-test-urls.sh https://sepbehroozi.github.io
set -u

BASE="${1:-http://localhost:4321}"
fail=0

# path|expected_content_type_substring
checks=(
  "/altstore/alt_source.json|application/json"
  "/sepool/privacy_policy|text/html"
  "/sepool/privacy_policy.html|text/html"
  "/sepool/terms_of_service|text/html"
  "/sepool/terms_of_service.html|text/html"
  "/tmforwarder/privacy_policy|text/html"
  "/tmforwarder/privacy_policy.html|text/html"
  "/tmforwarder/terms_of_service|text/html"
  "/tmforwarder/terms_of_service.html|text/html"
  "/tmforwarder/power-optimization-settings|text/html"
  "/tmforwarder/power-optimization-settings.html|text/html"
  "/|text/html"
)

printf "Smoke testing against %s\n\n" "$BASE"

for entry in "${checks[@]}"; do
  path="${entry%%|*}"
  expected_ct="${entry##*|}"
  url="${BASE}${path}"

  # -L follows redirects; -s silent; -o /dev/null discards body; -w prints fields
  read -r status content_type < <(curl -sL -o /dev/null -w "%{http_code} %{content_type}\n" --max-time 10 "$url")

  if [[ "$status" != "200" ]]; then
    printf "FAIL  %s  (status=%s, expected 200)\n" "$url" "$status"
    fail=1
  elif [[ "$content_type" != *"$expected_ct"* ]]; then
    printf "FAIL  %s  (content-type=%s, expected to contain %s)\n" "$url" "$content_type" "$expected_ct"
    fail=1
  else
    printf "OK    %s  [%s]\n" "$url" "$content_type"
  fi
done

# Verify Treffen IPA presence: the AltStore source file references IPAs by URL,
# so any IPA listed in alt_source.json must resolve. Resolve dynamically.
ipa_paths=$(curl -sL --max-time 10 "${BASE}/altstore/alt_source.json" \
  | grep -oE '"downloadURL"\s*:\s*"[^"]+"' \
  | sed -E 's/.*"downloadURL"\s*:\s*"([^"]+)".*/\1/' || true)

if [[ -n "${ipa_paths}" ]]; then
  printf "\nVerifying IPA URLs referenced in alt_source.json:\n"
  while IFS= read -r ipa_url; do
    [[ -z "$ipa_url" ]] && continue
    # Strip the host so we test against the configured BASE
    relative=$(echo "$ipa_url" | sed -E 's#^https?://[^/]+##')
    test_url="${BASE}${relative}"
    status=$(curl -sLI -o /dev/null -w "%{http_code}" --max-time 30 "$test_url")
    if [[ "$status" == "200" ]]; then
      printf "OK    %s\n" "$test_url"
    else
      printf "FAIL  %s  (status=%s)\n" "$test_url" "$status"
      fail=1
    fi
  done <<< "$ipa_paths"
fi

if (( fail )); then
  printf "\nSmoke test FAILED.\n"
  exit 1
fi
printf "\nSmoke test PASSED.\n"
