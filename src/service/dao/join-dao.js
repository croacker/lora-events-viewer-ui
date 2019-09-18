import BaseDao from "./base-dao";

class JoinDao extends BaseDao{
  get url(){
    return 'device-join-vs' 
  }
}

export {JoinDao}