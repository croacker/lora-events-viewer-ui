import BaseDao from "./base-dao";

export default class UplinkDao extends BaseDao{
  get url(){
    return 'device-ups' 
  }
}