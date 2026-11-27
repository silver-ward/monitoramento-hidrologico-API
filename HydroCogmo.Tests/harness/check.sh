#!/usr/bin/env bash
# Versão Linux/macOS do check.ps1 (requer curl e jq).
# Uso: ./check.sh [URL_BASE]
#   ./check.sh                                  -> http://localhost:3000/api
#   ./check.sh https://sua-api.onrender.com/api -> API publicada
set -euo pipefail

BASE="${1:-${API_BASE:-http://localhost:3000/api}}"

fail() { echo "ERRO: $1" >&2; exit 1; }

command -v curl >/dev/null 2>&1 || fail "curl não encontrado."
command -v jq >/dev/null 2>&1 || fail "jq não encontrado (ex.: sudo apt install jq)."

get() { curl -fsS "$BASE$1" || fail "Falha ao chamar $1"; }

echo "Conferindo API em $BASE"

health=$(get /health)
[ "$(jq -r '.status' <<<"$health")" = "ok" ] || fail "Health check inesperado."

stations=$(get /stations)
[ "$(jq -r '.data_mode' <<<"$stations")" = "simulation" ] \
  || fail "A API precisa identificar os dados como simulados."
[ "$(jq '.stations | length' <<<"$stations")" -ge 1 ] \
  || fail "Nenhuma estação retornada. Rode npm run seed."

id=$(jq -r '.stations[0].id' <<<"$stations")

summary=$(get "/stations/$id/summary")
jq -e '.station and .latest' <<<"$summary" >/dev/null || fail "Resumo incompleto."

series=$(get "/stations/$id/series?metric=level&hours=24")
{ [ "$(jq -r '.metric' <<<"$series")" = "level" ] \
  && [ "$(jq -r '.unit' <<<"$series")" = "m" ]; } \
  || fail "Contrato de nível inesperado."
[ "$(jq '.points | length' <<<"$series")" -ge 1 ] \
  || fail "Sem pontos na janela. Rode npm run seed."

rain=$(get "/stations/$id/series?metric=rain&hours=24")
{ [ "$(jq -r '.metric' <<<"$rain")" = "rain" ] \
  && [ "$(jq -r '.unit' <<<"$rain")" = "mm/h" ]; } \
  || fail "Contrato de chuva inesperado."

echo "OK: saúde, lista, resumo, nível e chuva."
echo "Valores e locais são amostras sintéticas."