#!/usr/bin/env bash

echo "Preparing VitePress source..."

# Filesystem
mkdir -p ./dist/vitepress-src
cp -r ./.vitepress/public ./dist/vitepress-src/public
mkdir -p ./dist/vitepress-src/reference

# SassDoc
cp -r ./dist/sassdoc/* ./dist/vitepress-src/reference

# Docs
cp -r ./.vitepress/docs/* ./dist/vitepress-src
