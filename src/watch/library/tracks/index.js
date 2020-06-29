import chokidar from 'chokidar'

import debug from 'debug'

import * as itunesLibraryParser from '@sequencemedia/itunes-library-parser'

import normalise from '~/common/normalise'

const {
  library: {
    tracks: {
      toM3U: parseToM3U
    }
  }
} = itunesLibraryParser

const error = debug('itunes-library:error')

export function toM3U (jar, xml, destination) {
  const j = jar
    ? normalise(jar)
    : jar

  const x = xml
    ? normalise(xml)
    : xml

  const d = destination
    ? normalise(destination)
    : destination

  return (
    chokidar.watch(x)
      .on('ready', () => parseToM3U(j, x, d))
      .on('change', () => parseToM3U(j, x, d))
      .on('error', ({ message }) => {
        error(`Error in watcher: "${message}"`)
      })
  )
}

export * as transform from './transform'
