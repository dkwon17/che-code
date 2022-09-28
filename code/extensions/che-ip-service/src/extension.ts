/**********************************************************************
 * Copyright (c) 2022 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ***********************************************************************/
import * as vscode from 'vscode';
const express = require('express');

export async function activate(_: vscode.ExtensionContext) {
    startServer();
}

async function startServer() {
    const app = express()
    const port = 2999

    app.get('/', (req: any, res: any) => {
        res.json({
            ip: req.get('x-forwarded-for') !== undefined ? req.get('x-forwarded-for') : req.connection.remoteAddress,
            port: req.get('x-forwarded-port') !== undefined ? req.get('x-forwarded-port') : req.connection.remotePort,
        });
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`)
    })
}

export function deactivate() {}
