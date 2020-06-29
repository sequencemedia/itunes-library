import chokidar from 'chokidar'

import debug from 'debug'

import * as itunesLibraryParser from '@sequencemedia/itunes-library-parser'

import normalise from '~/common/normalise'

const {
  library: {
    playlists: {
      transform: {
        toJSON: transformToJSON,
        toJS: transformToJS,
        toES: transformToES
      }
    }
  }
} = itunesLibraryParser

const error = debug('itunes-library:transform:error')

export function toJSON (jar, xml, func = () => {}) {
  const j = jar
    ? normalise(jar)
    : jar

  const x = xml
    ? normalise(xml)
    : xml

  return (
    chokidar.watch(x)
      .on('ready', async function ready () {
        func(
          await transformToJSON(j, x)
        )
      })
      .on('change', async function change () {
        func(
          await transformToJSON(j, x)
        )
      })
      .on('error', ({ message }) => {
        error(`Error in watcher: "${message}"`)
      })
  )
}

export function toJS (jar, xml, func = () => {}) {
  const j = jar
    ? normalise(jar)
    : jar

  const x = xml
    ? normalise(xml)
    : xml

  return (
    chokidar.watch(x)
      .on('ready', async function ready () {
        func(
          await transformToJS(j, x)
        )
      })
      .on('change', async function change () {
        func(
          await transformToJS(j, x)
        )
      })
      .on('error', ({ message }) => {
        error(`Error in watcher: "${message}"`)
      })
  )
}

export function toES (jar, xml, func = () => {}) {
  const j = jar
    ? normalise(jar)
    : jar

  const x = xml
    ? normalise(xml)
    : xml

  return (
    chokidar.watch(x)
      .on('ready', async function ready () {
        func(
          await transformToES(j, x)
        )
      })
      .on('change', async function change () {
        func(
          await transformToES(j, x)
        )
      })
      .on('error', ({ message }) => {
        error(`Error in watcher: "${message}"`)
      })
  )
}
