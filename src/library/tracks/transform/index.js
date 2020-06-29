import debug from 'debug'

import * as itunesLibraryParser from '@sequencemedia/itunes-library-parser'

import normalise from '~/common/normalise'

const {
  library: {
    tracks: {
      transform: {
        toJSON: transformToJSON,
        toJS: transformToJS,
        toES: transformToES
      }
    }
  }
} = itunesLibraryParser

const error = debug('itunes-library:transform:error')

export async function toJSON (jar, xml) {
  try {
    const j = jar
      ? normalise(jar)
      : jar

    const x = xml
      ? normalise(xml)
      : xml

    return await transformToJSON(j, x)
  } catch ({ message }) {
    error(message)
  }
}

export async function toJS (jar, xml) {
  try {
    const j = jar
      ? normalise(jar)
      : jar

    const x = xml
      ? normalise(xml)
      : xml

    return await transformToJS(j, x)
  } catch ({ message }) {
    error(message)
  }
}

export async function toES (jar, xml) {
  try {
    const j = jar
      ? normalise(jar)
      : jar

    const x = xml
      ? normalise(xml)
      : xml

    return await transformToES(j, x)
  } catch ({ message }) {
    error(message)
  }
}
