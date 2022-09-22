# Eclipse Che Telemetry Extension for Visual Studio Code

**Notice:** This extension is bundled with Visual Studio Code. It can be disabled but not uninstalled.

## Features
This extension detects and sends the following events to a backend telemetry plugin listening on `http://localhost:${DEVWORKSPACE_TELEMETRY_BACKEND_PORT}`

| Event           | ID               |
|-----------------|------------------|
| Start workspace | WORKSPACE_OPENED |
