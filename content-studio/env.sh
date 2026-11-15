# Source from Bash before running content tools: . path/to/content-studio/env.sh
# Resolve this file so the checkout can live at any path.
CONTENT_STUDIO_ROOT="$(CDPATH= cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
export CONTENT_STUDIO_ROOT
export LEMO_OPUSCAR_HOME="$CONTENT_STUDIO_ROOT/libraries/lemo-opuscar"
export PLAYWRIGHT_BROWSERS_PATH="$CONTENT_STUDIO_ROOT/.cache/ms-playwright"
export npm_config_cache="$CONTENT_STUDIO_ROOT/.cache/npm"
export PIP_CACHE_DIR="$CONTENT_STUDIO_ROOT/.cache/pip"
export UV_CACHE_DIR="$CONTENT_STUDIO_ROOT/.cache/uv"
export PATH="$CONTENT_STUDIO_ROOT/node_modules/.bin:$PATH"
