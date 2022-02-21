#!/usr/bin/env node

require('dotenv/config')

const debug = require('debug')

const psList = require('ps-list')

const {
  library,
  library: {
    tracks,
    playlists
  } = {}
} = require('./lib/watch')

const {
  Command
} = require('commander')

const PACKAGE = require('./package')

const commander = new Command()

const NAME = 'il.App'
process.title = NAME

async function app () {
  const {
    name
  } = PACKAGE

  /**
   *  Permit only one instance of the application
   */
  try {
    const a = (await psList())
      .filter(({ name }) => name === NAME)

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
  } = commander.opts()

  const l = (
    (t && p) || (!t && !p)
  )

  if (l) {
    log(`Application "${name}" in process ${pid} watching Library.`)

    log({ jar, xml, destination })

    return (
      library
        .toM3U(jar, xml, destination)
    )
  } else {
    if (t) {
      log(`Application "${name}" in process ${pid} watching Tracks.`)

      return (
        tracks
          .toM3U(jar, xml, destination)
      )
    }

    if (p) {
      log(`Application "${name}" in process ${pid} watching Playlists.`)

      return (
        playlists
          .toM3U(jar, xml, destination)
      )
    }
  }
}

module.exports = app()
