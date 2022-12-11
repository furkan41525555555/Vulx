/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

const readdir = require('fs').readdirSync;
const fs = require('fs');
const Logger = require("./Logger");
const encrypt = require('./cryptHelper');
const SystemMessageHelper = require("./SystemMessageHelper");
const path = require('path');

const vulxScriptsPathProd = `${homedir()}/AppData/Local/Vulx/scripts/`;
const vulxScriptsPathDev = `${process.cwd()}/scripts/`;

const vulxScriptsDirectory = process.pkg ? vulxScriptsPathProd : vulxScriptsPathDev;

class Script {
	constructor() { }

	async loadScript (scriptFolder, scriptName) {
		try {
			const props = require(`${vulxScriptsDirectory}/${scriptFolder}/${scriptName}`);
            if (props.config.enabled === false || !props.config.enabled) return false;

			// const hash = encrypt.computeScriptSHA512(__dirname + `/../scripts/${scriptFolder}`);
			// const isValid = encrypt.checkScriptIntegrity(__dirname + `/../scripts/${scriptFolder}`, hash);
			// if(!isValid) {
			//     Logger.error(`Unable to load script ${scriptFolder}/${scriptName}: File has been modified or is unsafe.`)
			//     return;
			// } 
			props.execute();
			Logger.info(`
				\n Loaded Script: ${scriptName} in folder ${scriptFolder} 
				\n Name: ${props.cfg.name} 
				\n Description: ${props.cfg.description} 
				\n Author: ${props.cfg.author}
				\n Url: ${props.cfg.url}
				\n Version: ${props.cfg.version}
			`);

			await SystemMessageHelper.sendSystemMessage(`♡ Loaded ${scriptFolder}/${scriptName}`);
		}
		catch (e) {
			Logger.error(`Unable to load script ${scriptName}: ${e}`);
		}
	};

    async load() {
        try {
            await readdir(vulxScriptsDirectory);
        } catch (e) {
            Logger.error(`Scripts folder is missing missing. Attemping to create folder. \n${e}`);
            try {
                Logger.debug(`Creating scripts folder.`);
                await fs.mkdirSync(vulxScriptsDirectory);
            } catch (e) {
                Logger.error(`Unable to create scripts folder. \n${e}`);
            }
        }

        const scriptFolders = await readdir(vulxScriptsDirectory);
        Logger.info(`Loading a total of ${scriptFolders.length} scripts.`);
        scriptFolders.forEach(async (f) => {
            const scriptFiles = await readdir(`${vulxScriptsDirectory}/${f}/`);
            scriptFiles.forEach(async (j) => {
                if (!j.endsWith('.js')) return;
                const response = await this.loadScript(f, j);
                if (response) console.log(response);
            });
        });
    }
}

module.exports = new Script();