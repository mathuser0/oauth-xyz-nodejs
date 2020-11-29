/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { Request, Response } from 'express';
import transactionController from '../controllers/transactionController';
import interactionController from '../controllers/interactionController';
import introspectController from '../controllers/introspectController';

export class Routes {
  public routes(app): void {
    app.route('/').get((req: Request, res: Response) => {
      res.status(418).send({
        message: "I'm a teapot."
      });
    });
    app.route('/transaction').post(transactionController.postTransaction);

    app.route('/interact').get(interactionController.getInteract);

    app
      .route('/interact/approve')
      .post(interactionController.postInteractApprove);

    app
      .route('/interact/device')
      .get(interactionController.getInteractDevice)
      .post(interactionController.postInteractDevice);

    app.route('/interact/:id').get(interactionController.getInteractId);

    app.route('/testing').get(interactionController.getTesting);

    app.route('/testing/clear').get(interactionController.getTestingClear);

    app.route('/introspect').post(introspectController.postIntrospect);
  }
}
