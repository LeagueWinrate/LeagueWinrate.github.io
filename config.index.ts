const fs = require('fs');

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
   production: true,
   riot_api: '${process.env['riot_api']}'
};
`;

fs.writeFile(targetPath, envConfigFile, 'utf8', (err: any) => {
  if (err) {
    return console.log(err);
  }
});