import os from 'os'
import path from 'path'

import chokidar from 'chokidar'

import debug from 'debug'

import * as itunesLibraryParser from '@sequencemedia/itunes-library-parser'

const {
  library: {
    playlists: {
      toM3U: parseToM3U
    }
  }
} = itunesLibraryParser

const error = debug('itunes-library:error')

export function toM3U (jar, xml, destination) {
  const j = jar
    ? path.resolve(jar.replace('~', os.homedir))
    : jar

  const x = xml
    ? path.resolve(xml.replace('~', os.homedir))
    : xml

  const d = destination
    ? path.resolve(destination.replace('~', os.homedir))
    : destination

  return (
    chokidar.watch(x)
      .on('ready', () => parseToM3U(j, x, d))
      .on('change', () => parseToM3U(j, x, d))
      .on('error', ({ message }) => {
        error('Error in watcher', message)
      })
  )
}

export * as transform from './transform'
