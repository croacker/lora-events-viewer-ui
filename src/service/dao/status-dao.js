import BaseDao from "./base-dao";

class StatusDao extends BaseDao{
  get url(){
    return 'device-status-vs' 
  }
}

export {StatusDao}