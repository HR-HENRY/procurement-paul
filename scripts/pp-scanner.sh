#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# Procurement Paul — Nightly Opportunity Scanner
# Run this on your VPS to scan tender portals every night at 11pm
#
# SETUP:
#   1. Upload this file to your VPS: /home/ubuntu/pp-scanner.sh
#   2. Make executable: chmod +x /home/ubuntu/pp-scanner.sh
#   3. Add to crontab: crontab -e
#      Then add this line:
#      0 23 * * * /home/ubuntu/pp-scanner.sh >> /var/log/pp-scanner.log 2>&1
# ─────────────────────────────────────────────────────────────────────────────

APP_URL="https://procurement-paul.vercel.app"
LOG_DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$LOG_DATE] Starting Procurement Paul opportunity scan..."

# Keywords to scan for — edit these as needed
KEYWORDS='["heating", "gas boiler", "boiler servicing", "boiler installation", "central heating", "gas maintenance"]'

# Hit the scanner API
RESPONSE=$(curl -s -X POST \
  "${APP_URL}/api/scanner" \
  -H "Content-Type: application/json" \
  -d "{\"keywords\": ${KEYWORDS}}" \
  --max-time 60)

# Check if successful
if echo "$RESPONSE" | grep -q '"success":true'; then
  TOTAL=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('totalFound', 0))" 2>/dev/null || echo "?")
  echo "[$LOG_DATE] Scan complete — $TOTAL opportunities found"
else
  echo "[$LOG_DATE] Scan failed or returned error:"
  echo "$RESPONSE" | head -200
fi

echo "[$LOG_DATE] Done."
