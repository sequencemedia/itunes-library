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

export async function toM3U (jar, xml, destination) {
  let watcher
  try {
    const x = xml
      ? path.resolve(xml.replace('~', os.homedir))
      : xml

    const d = destination
      ? path.resolve(destination.replace('~', os.homedir))
      : destination

    watcher = chokidar.watch(x)

    watcher
      .on('ready', async () => parseToM3U(jar, x, d))
      .on('change', async () => parseToM3U(jar, x, d))
      .on('error', ({ message }) => {
        error('Error in watcher', message)
      })
  } catch ({ message }) {
    if (watcher) watcher.close()

    error(message)
  }
}

export * as transform from './transform'
