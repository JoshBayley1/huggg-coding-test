import React from "react"
import {useState, useEffect} from 'react';
import { Map, Marker } from "pigeon-maps"

async function getPinData(mapData, stores) {
  return new Promise((resolve, reject) => {
    let arr = [];
    if (stores.length > 0) {
      stores.forEach((store) => {
        const pinData = mapData.find(x => x.id === store);
        if (pinData !== undefined) {
          const data = {
            "x": parseFloat(pinData.latitiude),
            "y": parseFloat(pinData.longitude),
          }
          arr.push(data)
        }
      })
      if (arr.length === 0) {
        reject(-1)
      }
      else {
        resolve(arr)
      }
    }
    else {
      reject(-1)
    }
  })
}

const StoreMap = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getPinData(props.mapData, props.stores)
      .then(setData)
      .catch(setData)
  }, []);
  if (data) {
    if (data !== -1) {
      return (
        <Map height={300} defaultCenter={[51.51149934513848, -0.11371816389126495]} defaultZoom={12}>
          {
            data.map((pin, index) =>
              <Marker key={index} width={50} anchor={[data[index].x, data[index].y]} />
            )  
          }
          <Marker width={50} anchor={[data[0].x, data[0].y]} />
        </Map>
      )
    }
  }
  return (
      <Map height={300} defaultCenter={[51.51149934513848, -0.11371816389126495]} defaultZoom={12}>
        <Marker width={50} anchor={[50.879, 4.6997]} />
      </Map>
  )
}

export default StoreMap;