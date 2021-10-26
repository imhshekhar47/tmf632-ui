#!/bin/bash

echo "Starting mock server"
cp resources.json db.json \
    && json-server --watch ./resources.json --routes ./routes.json --port 8089