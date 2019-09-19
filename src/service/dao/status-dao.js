import BaseDao from "./base-dao";

class StatusDao extends BaseDao{
  get url(){
    return 'device-statuse-vs' 
  }
}

export {StatusDao}