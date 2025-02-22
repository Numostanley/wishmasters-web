#!/bin/bash
set -e

TEMPLATE="/etc/nginx/conf.d/default.conf.template"
CONFIG="/etc/nginx/conf.d/default.conf"

# Check if the template exists
if [ -f "$TEMPLATE" ]; then
    envsubst '$DOMAIN_NAME' < "$TEMPLATE" > "$CONFIG"
else
    echo "Error: $TEMPLATE not found. Ensure it's correctly mapped in docker-compose."
    exit 1
fi

# Start Nginx
nginx -g "daemon off;"
