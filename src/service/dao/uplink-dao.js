import BaseDao from "./base-dao";

class UplinkDao extends BaseDao{
  get url(){
    return 'device-up-vs' 
  }
}

export {UplinkDao}