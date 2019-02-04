import os from 'os'
import path from 'path'

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
  try {
    const j = jar
      ? path.resolve(jar.replace('~', os.homedir))
      : jar

    const x = xml
      ? path.resolve(xml.replace('~', os.homedir))
      : xml

    const d = destination
      ? path.resolve(destination.replace('~', os.homedir))
      : destination

    return await parseToM3U(j, x, d)
  } catch ({ message }) {
    error(message)
  }
}

export * as transform from './transform'
