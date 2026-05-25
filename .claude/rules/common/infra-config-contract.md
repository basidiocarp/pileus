# Infra Config Contract

Use the repo's runtime config boundaries consistently. Do not invent new SSM path families or mix app and infrastructure config.

## SSM Boundaries

- App-owned config lives under `/config/{app}/...`
- Infrastructure-owned cache config lives under `/cache/{app}/...`
- Infrastructure-owned database config lives under `/rds/{app}/admin/...`
- Infrastructure-owned broker config lives under `/mq/{app}/...`

For TPM Forge today, `{app}` is typically `tf`.

## Expected Mappings

- App config:
  - `/config/{app}/debug-mode`
  - `/config/{app}/env-mode`
  - grouped provider paths such as `/config/{app}/entra/...`, `/config/{app}/footprint/...`, `/config/{app}/nfusion/...`
- Cache config:
  - `/cache/{app}/hostname`
  - `/cache/{app}/port`
  - `/cache/{app}/number`
  - `/cache/{app}/user`
  - `/cache/{app}/password`
- Database config:
  - `/rds/{app}/admin/hostname`
  - `/rds/{app}/admin/name`
  - `/rds/{app}/admin/port`
  - `/rds/{app}/admin/user`
  - `/rds/{app}/admin/password`
- Broker config:
  - `/mq/{app}/hostname`
  - `/mq/{app}/port`
  - `/mq/{app}/vhost`
  - `/mq/{app}/application/username`
  - `/mq/{app}/application/password`

## Working Rules

- Do not put infrastructure wiring under `/config/{app}/...`.
- Do not add fallback defaults that silently point ECS services at `localhost` in production paths.
- When adding new runtime config, document which side owns it: app or infrastructure.
- When changing SSM path contracts, update code, tests, and deployment docs in the same change.
- Prefer explicit runtime guards for restart-bound infra config like database and broker wiring.

## Verification

When changing config wiring, verify the smallest relevant path:

- Python API config: `cd services/python/api && pdm run python -m pytest tests/test_config_refresh.py`
- Python lint: `cd services/python/api && pdm run ruff check app/core/config tests`
- Workflow wiring: inspect `.github/workflows/` plus any deploy/task templates affected
