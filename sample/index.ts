import { OBJECT_TYPE, MapMaker } from "./../src";
import * as fs from 'fs';

async function main() {

  const maker = new MapMaker({
    key: "Replace your Key",
  });

  const spaceId = "Set your spaceId";
  const mapId = "Set your mapId";


  const map = await maker.getMap(spaceId, mapId);
  console.log(JSON.stringify(map, null, 2));

  const imageData = await fs.promises.readFile('./koala.png');
  const img = await maker.uploadImage(spaceId, imageData);

  // Private area
  map.nooks = {
    'area-1': {
      name: 'hoge',
      nookCoords: {
        coords: [{ x: 2, y: 3 }, { x: 3, y: 4 }],
      }
    }
  };

  // Collision
  maker.setCollision(map, 0, 0, true);
  maker.setCollision(map, 2, 3, true);
  maker.setCollision(map, 2, 3, false);
  maker.setCollision(map, 4, 5, false);
  maker.setCollision(map, 3, 5, true);
  maker.setCollision(map, 5, 2, true);

  // Objects
  map.objects = {
    "a": {
      normal: img,
      x: 3,
      y: 2,
      width: 1,
      height: 1,
      id: "???",
      type: OBJECT_TYPE.NON_INTERACTIVE,
      zIndex: 0,
    },
    "b": {
      id: "b",
      normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FoGZyxj4TlWXAdOZO?alt=media&token=54d741d1-9f89-4f46-bcc8-9622e4719a5a",
      x: 0,
      y: 2,
      width: 1,
      height: 1,
      zIndex: 10,
      type: OBJECT_TYPE.IFRAME,
      properties: {
        url: "https://www.youtube.com/embed/zbllvQZRyh0"
      }
    }
  };

  console.log(JSON.stringify(map, null, 2))
  const res2 = await maker.setMap(spaceId, mapId, map);
}

main();