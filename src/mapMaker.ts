import fetch, { Response } from 'node-fetch';
import { TownMap } from './object/map';
export type Credential = {
  key: string;
};

export class MapMaker {
  constructor(private credential: Credential) {

  }

  private async handleError(res: Response) {
    let content = "";
    if (res.headers.get("content-type")?.match(/^application\/json/)) {
      content = JSON.stringify(await res.json());
    } else if (res.headers.get("content-type")?.match(/^text/)) {
      content = await res.text();
    }
    throw new Error(`${res.status} ${res.url} ${res.statusText} ${content}`);
  }

  async getMap(spaceId: string, mapId: string): Promise<TownMap> {
    const res = await fetch(`https://gather.town/api/getMap?spaceId=${spaceId}&mapId=${mapId}&apiKey=${this.credential.key}`)
    if (!res.ok) {
      await this.handleError(res);
    }

    return await res.json();
  }

  async setMap(spaceId: string, mapId: string, map: TownMap): Promise<void> {
    const res = await fetch(`https://gather.town/api/setMap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: this.credential.key,
        spaceId: spaceId,
        mapId: mapId,
        mapContent: map
      }),
    });

    if (!res.ok) {
      await this.handleError(res);
    }
  }

  async uploadImage(spaceId: string, image: Buffer): Promise<string> {
    const data = Array.from(image.values());
    const res = await fetch(`https://api.gather.town/api/uploadImage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        spaceId: spaceId,
        bytes: {
          type: "Buffer",
          data,
        }
      }),
    });

    if (!res.ok) {
      await this.handleError(res);
    }


    return await res.text();
  }

  setCollision(map: TownMap, x: number, y: number, value: boolean) {
    // decode base64 string to buffer
    const collisionBufer = Buffer.from(map.collisions, 'base64');

    // set value
    const pos = x + y * map.dimensions[0];
    collisionBufer.fill(value ? 1 : 0, pos, pos + 1);

    // encode buffer to base64 string
    map.collisions = collisionBufer.toString('base64');
  }

  getCollision(map: TownMap, x: number, y: number) {
    // decode base64 string to buffer
    const collisionBufer = Buffer.from(map.collisions, 'base64');

    // get value
    const pos = x + y * map.dimensions[0];
    return collisionBufer.readInt8(pos) === 1;
  }

}
