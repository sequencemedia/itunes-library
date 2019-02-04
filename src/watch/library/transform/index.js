import os from 'os'
import path from 'path'

import chokidar from 'chokidar'

import debug from 'debug'

import * as itunesLibraryParser from '@sequencemedia/itunes-library-parser'

const {
  library: {
    transform: {
      toJSON: transformToJSON,
      toJS: transformToJS,
      toES: transformToES
    }
  }
} = itunesLibraryParser

const error = debug('itunes-library:transform:error')

export function toJSON (jar, xml, func = () => {}) {
  const j = jar
    ? path.resolve(jar.replace('~', os.homedir))
    : jar

  const x = xml
    ? path.resolve(xml.replace('~', os.homedir))
    : xml

  return (
    chokidar.watch(x)
      .on('ready', async () => {
        func(
          await transformToJSON(j, x)
        )
      })
      .on('change', async () => {
        func(
          await transformToJSON(j, x)
        )
      })
      .on('error', ({ message }) => {
        error('Error in watcher', message)
      })
  )
}

export function toJS (jar, xml, func = () => {}) {
  const j = jar
    ? path.resolve(jar.replace('~', os.homedir))
    : jar

  const x = xml
    ? path.resolve(xml.replace('~', os.homedir))
    : xml

  return (

    chokidar.watch(x)
      .on('ready', async () => {
        func(
          await transformToJS(j, x)
        )
      })
      .on('change', async () => {
        func(
          await transformToJS(j, x)
        )
      })
      .on('error', ({ message }) => {
        error('Error in watcher', message)
      })
  )
}

export function toES (jar, xml, func = () => {}) {
  const j = jar
    ? path.resolve(jar.replace('~', os.homedir))
    : jar

  const x = xml
    ? path.resolve(xml.replace('~', os.homedir))
    : xml

  return (
    chokidar.watch(x)
      .on('ready', async () => {
        func(
          await transformToES(j, x)
        )
      })
      .on('change', async () => {
        func(
          await transformToES(j, x)
        )
      })
      .on('error', ({ message }) => {
        error('Error in watcher', message)
      })
  )
}
