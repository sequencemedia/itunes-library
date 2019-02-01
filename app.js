#!/usr/bin/env node

require('@babel/register')

require('dotenv/config')

const debug = require('debug')

const {
  readFile
} = require('sacred-fs')

const {
  library,
  library: {
    tracks,
    playlists
  }
} = require('./src')

const commander = require('commander')

const app = async () => {
  const error = debug('itunes-library:error')

  const {
    argv,
    env: {
      JAR,
      XML,
      DESTINATION
    }
  } = process

  try {
    const {
      version
    } = JSON.parse(await readFile('./package.json', 'utf8'))

    commander
      .version(version)
      .option('-j, --jar [jar]', 'Path to Saxon PE/EE JAR')
      .option('-x, --xml [xml]', 'Path to iTunes Library XML')
      .option('-d, --destination [destination]', 'Destination path for M3Us')
      .option('-t, --tracks', 'Parse all tracks')
      .option('-p, --playlists', 'Parse all playlists')
      .parse(argv)
  } catch (e) {
    error(e)
  }

  const {
    jar = JAR,
    xml = XML,
    destination = DESTINATION,
    tracks: t = false,
    playlists: p = false
  } = commander

  const l = (
    (t && p) || (!t && !p)
  )

  if (l) {
    try {
      await library.toM3U(jar, xml, destination)
    } catch (e) {
      const error = debug('itunes-library:to-m3u:error')

      error(e)
    }
  } else {
    if (t) {
      try {
        await tracks.toM3U(jar, xml, destination)
      } catch (e) {
        const error = debug('itunes-library:to-m3u:error')

        error(e)
      }
    }

    if (p) {
      try {
        await playlists.toM3U(jar, xml, destination)
      } catch (e) {
        const error = debug('itunes-library:to-m3u:error')

        error(e)
      }
    }
  }
}

module.exports = app()
