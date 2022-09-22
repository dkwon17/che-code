/**********************************************************************
 * Copyright (c) 2022 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ***********************************************************************/

export type TelemetryService = { submitTelemetryEvent: (id: string, ownerId: string, ip: string, agent: string, resolution: string, properties: [string, string][]) => Promise<void> };
/**
 *
 */
export class TelemetryEventService {
	private telemetryService: TelemetryService;

	constructor(telemetryService: TelemetryService) {
		this.telemetryService = telemetryService;
	}

	/**
	 * 
	 */
	async sendEvent(id: string, ownerId: string, properties: [string, string][]): Promise<void> {
		this.telemetryService.submitTelemetryEvent(id, ownerId, 'ip', 'agent', 'resolution', properties);
	}
}
