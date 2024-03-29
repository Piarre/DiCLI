import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import execa from 'execa';
import Listr from 'listr';
import chalk from 'chalk';
import { promisify } from 'util';
import { projectInstall } from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);
 
/**
 * @author Piarre
 * @version 1.1.1
 * @license MIT license <http://www.opensource.org/licenses/MIT>
 */
async function copyTemplateFiles(options) {
 return copy(options.templateDirectory, options.targetDirectory, {
   clobber: false,
 });
}

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize Git repository.'));
  }
  return;
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname.substring(new URL(currentFileUrl).pathname.indexOf('/')+1),
    '../../templates',
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: 'Copy project file',
      task: () => copyTemplateFiles(options)
    },
    {
      title: 'Initialize Git',
      task: () => initGit(options),
      enabled: () => options.git
    },
    {
      title: 'Install dependencies',
      task: () => projectInstall({
        cwd: options.targetDirectory,
      }),
      skip: () => !options.runInstall ? 'Pass --install to automatically install dependencies'
      : undefined,
    }
  ])

  await tasks.run();

  console.log('%s Project ready', chalk.green.bold('DONE'));
  console.log('%s Open "instruction.txt" and follow instruction !', chalk.bgBlue.bold('ENJOY'));
  return true;
}