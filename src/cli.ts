#!/usr/bin/env node

import mdBlogify from './'
import { Command } from 'commander'

const program = new Command()
program
    .arguments('<inputDir> <outputDir>')
    .option('--pattern <pattern>', 'target article pattern', '**/*.md')
    .option(
        '--previewLength <previewLength>',
        'set preview length',
        value => parseInt(value),
        null
    )
    .option('--summaryPath <summaryPath>', 'set summary path', null)
    .action(async (inputDir, outputDir) => {
        mdBlogify(inputDir, outputDir, [program.pattern], {
            previewLength: program.previewLength,
            summaryPath: program.summaryPath,
        })
    })

program.parse(process.argv)
