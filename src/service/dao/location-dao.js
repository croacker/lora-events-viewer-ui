import BaseDao from "./base-dao";

class LocationDao extends BaseDao{
  get url(){
    return 'device-location-vs' 
  }
}

export {LocationDao}