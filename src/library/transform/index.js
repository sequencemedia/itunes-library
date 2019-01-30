import {
  stat,
  watch
} from 'sacred-fs'

import debug from 'debug'

import * as itunesLibraryParser from '@sequencemedia/itunes-library-parser'

import {
  hasChanges,
  putChanges
} from '~'

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

function listenerFactory ({ xml, statsMap, jar, transform = () => {}, func = () => {} }) {
  return async (eventType) => {
    if (eventType === 'change') {
      try {
        const stats = await stat(xml)
        if (hasChanges(stats, statsMap)) {
          putChanges(stats, statsMap)

          func(
            await transform(jar, xml)
          )
        }
      } catch (e) {
        error(e)
      }
    }
  }
}

export async function toJSON (jar, xml, func = () => {}) {
  let watcher
  try {
    const stats = await stat(xml)
    const statsMap = new Map()

    putChanges(stats, statsMap)

    const s = await transformToJSON(jar, xml)
    const listener = listenerFactory({ jar, xml, statsMap, transform: transformToJSON, func })

    watcher = await watch(xml, { encoding: 'utf8' }, listener)

    return s
  } catch (e) {
    if (watcher) watcher.close()

    error(e)
  }
}

export async function toJS (jar, xml, func = () => {}) {
  let watcher
  try {
    const stats = await stat(xml)
    const statsMap = new Map()

    putChanges(stats, statsMap)

    const o = await transformToJS(jar, xml)
    const listener = listenerFactory({ jar, xml, statsMap, transform: transformToJS, func })

    watcher = await watch(xml, { encoding: 'utf8' }, listener)

    return o
  } catch (e) {
    if (watcher) watcher.close()

    error(e)
  }
}

export async function toES (jar, xml, func = () => {}) {
  let watcher
  try {
    const stats = await stat(xml)
    const statsMap = new Map()

    putChanges(stats, statsMap)

    const m = await transformToES(jar, xml)
    const listener = listenerFactory({ jar, xml, statsMap, transform: transformToES, func })

    watcher = await watch(xml, { encoding: 'utf8' }, listener)

    return m
  } catch (e) {
    if (watcher) watcher.close()

    error(e)
  }
}
