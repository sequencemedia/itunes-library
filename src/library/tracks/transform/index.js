import os from 'os'
import path from 'path'

import debug from 'debug'

import * as itunesLibraryParser from '@sequencemedia/itunes-library-parser'

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

export async function toJSON (jar, xml, func = () => {}) {
  try {
    const j = jar
      ? path.resolve(jar.replace('~', os.homedir))
      : jar

    const x = xml
      ? path.resolve(xml.replace('~', os.homedir))
      : xml

    return await transformToJSON(j, x)
  } catch ({ message }) {
    error(message)
  }
}

export async function toJS (jar, xml, func = () => {}) {
  try {
    const j = jar
      ? path.resolve(jar.replace('~', os.homedir))
      : jar

    const x = xml
      ? path.resolve(xml.replace('~', os.homedir))
      : xml

    return await transformToJS(j, x)
  } catch ({ message }) {
    error(message)
  }
}

export async function toES (jar, xml, func = () => {}) {
  try {
    const j = jar
      ? path.resolve(jar.replace('~', os.homedir))
      : jar

    const x = xml
      ? path.resolve(xml.replace('~', os.homedir))
      : xml

    return await transformToES(j, x)
  } catch ({ message }) {
    error(message)
  }
}
