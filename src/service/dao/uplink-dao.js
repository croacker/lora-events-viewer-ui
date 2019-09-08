import BaseDao from "./base-dao";

class UplinkDao extends BaseDao{
  get url(){
    return 'device-ups' 
  }
}

export {UplinkDao}