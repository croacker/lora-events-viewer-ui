import BaseDao from "./base-dao";

class ErrorDao extends BaseDao{
  get url(){
    return 'device-error-vs' 
  }
}

export {ErrorDao}