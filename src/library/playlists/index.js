import debug from 'debug'

import * as itunesLibraryParser from '@sequencemedia/itunes-library-parser'

import normalise from '~/common/normalise'

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
      ? normalise(jar)
      : jar

    const x = xml
      ? normalise(xml)
      : xml

    const d = destination
      ? normalise(destination)
      : destination

    return await parseToM3U(j, x, d)
  } catch ({ message }) {
    error(message)
  }
}

export * as transform from './transform'
