/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { Request, Response } from 'express';
import { IntrospectResponse } from '../models/introspectResponseModel';
import dataController from './dataController';


class IntrospectController {
  public async postIntrospect(req: Request, res: Response) {
    var tx: any;

    // TODO : 1. verify that caller is the right resource server.
    
    // 2. fetch permission info
    try {
      var access_token = req.body.access_token;
      var transaction = await dataController.getTransactionByAccessToken(
        access_token
      );
      if (!transaction) {
        return res.status(400).send('Invalid access token');
      }

      tx = transaction;
    } catch (err) {
      return res.status(500).send(err);
    }

    tx.active = "active";

    let txResp = new IntrospectResponse(tx);
    
    return res.json(txResp);
  }
}


export default new IntrospectController();
