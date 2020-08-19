import { isNullOrUndefined } from "util";
import { AccountHandler } from './AccountHandler';
import { TransactionHandler } from "./TransactionHandler";



export const GenericResponseHandler = function (response) {
  console.log('New response received:', response)
  
  // TODO handle this is a more scalable way using id's (This should work for now though)
  if (response.result.account_data !== undefined ) {
    AccountHandler(response);
  } 

  if (response.result.transactions !== undefined ) {
    TransactionHandler(response);
  }

}
