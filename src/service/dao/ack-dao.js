import BaseDao from "./base-dao";

class AckDao extends BaseDao{
  get url(){
    return 'device-ack-vs' 
  }
}

export {AckDao}