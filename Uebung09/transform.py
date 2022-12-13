import uvicorn
from fastapi import FastAPI
from pyproj import Transformer

transformer1 = Transformer.from_crs("epsg:4326", "epsg:2056")
transformer2 = Transformer.from_crs("epsg:2056", "epsg:4326")

app = FastAPI()

@app.get("/transform/wgs84lv95")
async def transform1(lng: float, lat: float):
    r0 = transformer1.transform(lng, lat)
    return {"lng in LV95":r0[0], "lat in LV95":r0[1]}

@app.get("/transform/lv95wgs84")
async def transform2(lng: float, lat: float):
    r1 = transformer2.transform(lng, lat)
    return {"lng in WGS84":r1[0], "lat in WGS84":r1[1]}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)