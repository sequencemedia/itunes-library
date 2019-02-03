import os from 'os'
import path from 'path'

import chokidar from 'chokidar'

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
  let watcher
  try {
    const x = xml
      ? path.resolve(xml.replace('~', os.homedir))
      : xml

    const v = await transformToJSON(jar, x)

    watcher = chokidar.watch(x)

    watcher
      .on('ready', async () => {
        func(
          await transformToJSON(jar, x)
        )
      })
      .on('change', async () => {
        func(
          await transformToJSON(jar, x)
        )
      })
      .on('error', ({ message }) => {
        error('Error in watcher', message)
      })

    return v
  } catch ({ message }) {
    if (watcher) watcher.close()

    error(message)
  }
}

export async function toJS (jar, xml, func = () => {}) {
  let watcher
  try {
    const x = xml
      ? path.resolve(xml.replace('~', os.homedir))
      : xml

    const v = await transformToJS(jar, x)

    watcher = chokidar.watch(x)

    watcher
      .on('ready', async () => {
        func(
          await transformToJS(jar, x)
        )
      })
      .on('change', async () => {
        func(
          await transformToJS(jar, x)
        )
      })
      .on('error', ({ message }) => {
        error('Error in watcher', message)
      })

    return v
  } catch ({ message }) {
    if (watcher) watcher.close()

    error(message)
  }
}

export async function toES (jar, xml, func = () => {}) {
  let watcher
  try {
    const x = xml
      ? path.resolve(xml.replace('~', os.homedir))
      : xml

    const v = await transformToES(jar, x)

    watcher = chokidar.watch(x)

    watcher
      .on('ready', async () => {
        func(
          await transformToES(jar, x)
        )
      })
      .on('change', async () => {
        func(
          await transformToES(jar, x)
        )
      })
      .on('error', ({ message }) => {
        error('Error in watcher', message)
      })

    return v
  } catch ({ message }) {
    if (watcher) watcher.close()

    error(message)
  }
}
