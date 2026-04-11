import * as loc from 'algeria-locations';
import fs from 'fs';
fs.writeFileSync('loc-test.json', JSON.stringify({
  wilaya: loc.getWilayas()[0],
  communes: loc.getCommunesByWilayaId(loc.getWilayas()[0].id)
}, null, 2));
