import os from 'os'
import path from 'path'

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
    toM3U: parseToM3U
  }
} = itunesLibraryParser

const error = debug('itunes-library:error')

function listenerFactory ({ xml, statsMap, parse = () => {}, jar, destination }) {
  return async (eventType) => {
    if (eventType === 'change') {
      try {
        const stats = await stat(xml)
        if (hasChanges(stats, statsMap)) {
          putChanges(stats, statsMap)

          await parse(jar, xml, destination)
        }
      } catch (e) {
        error(e)
      }
    }
  }
}

export async function toM3U (jar, xml, destination = '') {
  let watcher
  try {
    const stats = await stat(xml)
    const statsMap = new Map()

    putChanges(stats, statsMap)

    const destinationForM3Us = destination
      ? path.resolve(destination.replace('~', os.homedir))
      : destination

    await parseToM3U(jar, xml, destinationForM3Us)

    const listener = listenerFactory({ jar, xml, statsMap, parse: parseToM3U, destination: destinationForM3Us })

    watcher = await watch(xml, { encoding: 'utf8' }, listener)
  } catch (e) {
    if (watcher) watcher.close()

    error(e)
  }
}

export * as tracks from './tracks'
export * as playlists from './playlists'
export * as transform from './transform'
