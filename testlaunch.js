const child_process = require('child_process');
const fs = require('fs');
const child_process_1 = require("child_process");
const path = require("path");

function getLeagueEnvVariables() {
    return new Promise((resolve,reject) => {
        child_process.exec("ps -ax | grep -v grep | grep wine | grep LeagueClient.exe", (err, stdout) => {
            if(err) {
                console.log("Could not find wine start process");
                reject();
                return;
            }
            try {
                const processId = /([0-9])+/.exec(stdout);
                if(processId) {
                    console.log(`Reading /proc/${processId[0]}/environ`);
                    const envVariables = fs.readFileSync(`/proc/${processId[0]}/environ`).toString('utf8').split('\0').map(value => {
                        const indexOf = value.indexOf('=');
                        return [value.slice(0,indexOf), value.slice(indexOf + 1)];
                    });
                    const leagueEnv = {};
                    envVariables.forEach(value => {
                        if(value[0].length > 0) {
                            leagueEnv[value[0]] = value[1];
                        }
                    });
                    resolve(leagueEnv);
                    return;
                } else {
                    console.log("Could not find wine start process");
                }
                reject();
            } catch(e) {
                reject();
            }
        });
    });
}
const INJECTION_CONNECTOR_NAME = "injection-connector.exe";
INJECTION_CONNECTOR_EXE = path.join("/home/sekwah/.config/mobalytics-desktop/moba-extra-resources/overlay-injector/0.0.1-beta.135/win/", INJECTION_CONNECTOR_NAME);

if(fs.existsSync(INJECTION_CONNECTOR_EXE)) fs.rmSync(INJECTION_CONNECTOR_EXE);
fs.copyFileSync(path.join(__dirname, "app", INJECTION_CONNECTOR_NAME), INJECTION_CONNECTOR_EXE);

(async () => {
    const leagueVariables = await getLeagueEnvVariables();
    //console.log(leagueVariables);

    const command = `${leagueVariables.WINE} /home/sekwah/.config/mobalytics-desktop/moba-extra-resources/overlay-injector/0.0.1-beta.135/win/injection-connector.exe`;
    console.log(command)
    const info = child_process_1.spawn(command, {
        shell: true,
        stdio: ['inherit', 'inherit', 'inherit'],
        env: {
            ...leagueVariables,
            NODE_SKIP_PLATFORM_CHECK: "1"
        }
    });
    info.on('close', (code, signal) => {
        console.log(`was closed, code: ${code}, signal: ${signal}`);
    });
    info.on('error', (err) => {
        console.log(`error: ${err}`);
    });
    info.on('exit', (code, signal) => {
        console.log(`exit, code: ${code}, signal: ${signal}`);
    });
    info.on('message', (message) => {
        console.log(`exit, message: ${message}`);
    });
    info.on('spawn', (message) => {
        console.log(`overlay injector spawned`, {message});
    });

})();
