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
import { TelemetryEventService } from "./telemetry-event-service";

const express = require('express');
let telemetryEventService: TelemetryEventService;

export async function activate(context: vscode.ExtensionContext) {
    const telemetryService = await getTelemetryService();
    telemetryEventService = new TelemetryEventService(telemetryService);

    telemetryEventService.sendEvent(
        "WORKSPACE_OPENED",
        context.extensionPath,
        []
    );

    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(
            (e: vscode.TextDocumentChangeEvent) => {
                if (e.document.uri.scheme !== "output") {
                    telemetryEventService.sendEvent(
                        "EDITOR_USED",
                        context.extensionPath,
                        [["programming language", e.document.languageId]]
                    );
                }
            }
        )
    );

    startServer();
}

async function getTelemetryService(): Promise<any> {
    const CHE_API = "eclipse-che.api";
    const extensionApi = vscode.extensions.getExtension(CHE_API);
    if (!extensionApi) {
        throw Error(
            `Failed to get workspace service. Extension ${CHE_API} is not installed.`
        );
    }

    try {
        await extensionApi.activate();
        const cheApi: any = extensionApi?.exports;
        return cheApi.getTelemetryService();
    } catch {
        throw Error(
            `Failed to get telemetry service. Could not activate and retrieve exports from extension ${CHE_API}.`
        );
    }
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
