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
    playlists: {
      toM3U: parseToM3U
    }
  }
} = itunesLibraryParser

const error = debug('itunes-library:error')

function listenerFactory ({ xml, statsMap, parse = () => {}, jar, destination }) {
  return async function (eventType) {
    if (eventType === 'change') {
      try {
        const stats = await stat(xml)
        if (hasChanges(stats, statsMap)) {
          putChanges(stats, statsMap)

          await parse(jar, xml, destination)
        }
      } catch ({ message }) {
        error(message)
      }
    }
  }
}

export async function toM3U (jar, xml, destination) {
  let watcher
  try {
    const stats = await stat(xml)
    const statsMap = new Map()

    putChanges(stats, statsMap)

    const destinationForM3Us = destination
      ? path.resolve(destination.replace('~', os.homedir))
      : destination

    await parseToM3U(jar, xml, destinationForM3Us)

    const listener = listenerFactory({ jar, xml, parse: parseToM3U, statsMap, destination: destinationForM3Us })

    watcher = await watch(xml, { encoding: 'utf8' }, listener)

    watcher
      .on('error', ({ message }) => {
        error('Error in watcher', message)
      })
  } catch ({ message }) {
    if (watcher) watcher.close()

    error(message)
  }
}

export * as transform from './transform'
