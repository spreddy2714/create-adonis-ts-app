/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { RcFile } from '@adonisjs/sink'
import { TaskFn } from '../src/contracts'
import { logCreateFile } from '../src/logger'

/**
 * Creates the `.adonisrc.json` file in the project root
 */
const task: TaskFn = (absPath, application) => {
  const rcFile = new RcFile(absPath)

  rcFile.setExceptionHandler('App/Exceptions/Handler')
  rcFile.setAutoload('App', 'app')
  rcFile.setAutoload('Contracts', 'contracts')

  application.directoriesMap.forEach((value, key) => {
    rcFile.setDirectory(key, value)
  })

  rcFile.setPreload('start/routes')
  rcFile.setPreload('start/kernel')

  rcFile.addCopyToBuildFile('.env')
  rcFile.addCopyToBuildFile('.adonisrc.json')
  rcFile.addCopyToBuildFile('.gitignore')

  rcFile.commit()
  logCreateFile('.adonisrc.json')
}

export default task
