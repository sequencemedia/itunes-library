#!/usr/bin/env node

require('@babel/register')

require('dotenv/config')

const {
  readFile
} = require('sacred-fs')

const debug = require('debug')

const psList = require('ps-list')

const {
  library,
  library: {
    tracks,
    playlists
  }
} = require('./src')

const commander = require('commander')

const NAME = 'il.App'
process.title = NAME

const app = async () => {
  let PACKAGE
  try {
    const s = await readFile('./package.json', 'utf8')
    PACKAGE = JSON.parse(s)
  } catch (e) {
    const error = debug('itunes-library:error')

    error(e)
  }

  const {
    name
  } = PACKAGE

  /**
   *  Permit only one instance of the application
   */
  try {
    const a = (await psList()).filter(({ name }) => name === NAME)
    if (a.length > 1) {
      const {
        pid: PID
      } = process

      const {
        pid
      } = a.find(({ pid }) => pid !== PID)

      const log = debug('itunes-library:process:log')

      log(`Killing application "${name}" in process ${pid}.`)

      process.kill(pid)
    }
  } catch ({ message }) {
    const error = debug('itunes-library:process:error')

    error(message)
    return
  }

  const log = debug('itunes-library:log')

  const {
    pid,
    argv,
    env: {
      JAR,
      XML,
      DESTINATION
    }
  } = process

  log(`Starting application "${name}" in process ${pid}.`)

  const {
    version
  } = PACKAGE

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
