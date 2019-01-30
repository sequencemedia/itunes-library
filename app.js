#!/usr/bin/env node

require('@babel/register')({
  ignore: [
    /node_modules\/(?!@sequencemedia)/
  ]
})

require('dotenv/config')

const debug = require('debug')

const { readFile } = require('sacred-fs')

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

  try {
    const {
      argv,
      env: {
        JAR,
        XML,
        DESTINATION
      }
    } = process

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

    const {
      jar = JAR,
      xml = XML,
      destination = DESTINATION,
      tracks: t = false,
      playlists: p = false
    } = commander

    const error = debug('itunes-library:to-m3u:error')

    const l = (
      (t && p) || (!t && !p)
    )

    try {
      if (l) {
        return await library.toM3U(jar, xml, destination)
      }

      if (t) {
        return await tracks.toM3U(jar, xml, destination)
      }

      if (p) {
        return await playlists.toM3U(jar, xml, destination)
      }
    } catch (e) {
      error(e)
    }
  } catch (e) {
    error(e)
  }
}

module.exports = app()
