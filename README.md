# GatherTown Automate

## Preparation
Generate an API key from
https://app.gather.town/apikeys

## Usage
### Instantiate MapMaker object
```js
const maker = new MapMaker({
  key: "Your API key",
});
```


### Get map data
```js
const spaceId = "iq7NOe92y0G1FlPX\\TestOffice";
const mapId = "F73RnUb56F-bsIBABl4fR";
const map = await maker.getMap(spaceId, mapId);
```

### Modify map data
```js
// Space
map.spaces.push({
  x: 2,
  y: 3,
  spaceId: 'space-1',
});

// Collision
maker.setCollision(map, 0, 0, true);

// Private area
map.nooks['area-1'] = {
  name: 'area-1',
  nookCoords: {
    coords: [
      { x: 2, y: 3 }, 
      { x: 2, y: 4 }
    ],
  }
}

// Image
const imageData = await fs.promises.readFile('path/to/sample.png');
const url = await maker.uploadImage(spaceId, imageData);
map.objects['object-1'] = {
  id: 'object-1',
  type: OBJECT_TYPE.NON_INTERACTIVE,
  zIndex: 0,
  normal: url,
  x: 2,
  y: 3,
  width: 1,
  height: 1,
};

// Iframe
map.objects['object-2'] = {
  id: "object-2",
  type: OBJECT_TYPE.IFRAME,
  normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FoGZyxj4TlWXAdOZO?alt=media&token=54d741d1-9f89-4f46-bcc8-9622e4719a5a",
  x: 0,
  y: 2,
  width: 1,
  height: 1,
  zIndex: 10,
  properties: {
    url: "https://www.youtube.com/embed/zbllvQZRyh0"
  }
};
```

### Set map data
```js
const res = await maker.setMap(spaceId, mapId, map);
```

## Reference
https://www.notion.so/Gather-HTTP-API-3bbf6c59325f40aca7ef5ce14c677444

https://gathertown.notion.site/

Gather-Websocket-API-bf2d5d4526db412590c3579c36141063#d15f608469674bf0ac6b85808df01a8c
https://gathertown.notion.site/WIP-Gather-object-data-format-c24e9c491fbd40db83649591339614a1