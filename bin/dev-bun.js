#!/usr/bin/env bun

import {execute} from '@oclif/core'

await execute({development: true, dir: import.meta.url})
