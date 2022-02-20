import arg from 'arg';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { createProject } from './main';


function parseArgumentsIntoOptions(rawArgs) {
 const args = arg(
   {
     '--install': Boolean,
     '--help': Boolean,
     '--git': Boolean,
     '--yes': Boolean,
     '-i': '--install',
     '-h': '--help',
     '-g': '--git',
     '-y': '--yes'
   },
   {
     argv: rawArgs.slice(2),
   }
 );
 return {
   skipPrompts: args['--yes'] || false,
   git: args['--git'] || false,
   template: args._[0],
   runInstall: args['--install'] || false,
   helpUser: args['--help'] || false
 };
}

async function promptForMissingOptions(options) {

  if (options.helpUser) {
    console.log("")
    process.exit(1);
  }

  

  const defaultTemplate = 'JavaScript';
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }
 
  const questions = [];
  if (!options.template) {
    console.log('Welcome to the Discord Bot CLI :');
    // console.log('Only %s work with slash commands !', chalk.redBright.bold('TypeScript'));
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use :',
      choices: ['JavaScript', 'Python', 'Java'],
      default: defaultTemplate,
    });
  }
 
  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository ?',
      default: false,
    });
  }
 
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    overwrite: answers.overwrite || answers.overwrite,
  };
 }
 
 
 export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
  console.log('Made by %s !', chalk.yellow.bold('Piarre#0636'));
 }