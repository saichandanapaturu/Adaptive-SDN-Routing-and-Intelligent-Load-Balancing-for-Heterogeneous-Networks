"""Launch the AIFE controller and telemetry API.

OS-Ken 4 no longer ships ``osken-manager`` or ``os_ken.cmd``; this does what
that launcher did for this app. From the project root::

    PYTHONPATH=. python3 -m server.controller.run_controller

OpenFlow 1.3 switches connect on TCP 6633/6653; telemetry is served on
http://127.0.0.1:8765.
"""

from os_ken.lib import hub

# Like osken-manager: patch blocking I/O for eventlet before anything else.
hub.patch(thread=False)

import logging  # noqa: E402
import sys  # noqa: E402
from typing import List, Optional  # noqa: E402

from os_ken import cfg  # noqa: E402
from os_ken.base.app_manager import AppManager  # noqa: E402

APP = "server.controller.osken_controller"


def main(argv: Optional[List[str]] = None) -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )
    manager = AppManager.get_instance()
    # Loading imports the app and its required OS-Ken apps, which register
    # their options; the configuration can only be parsed afterwards.
    manager.load_apps([APP])
    cfg.CONF(args=sys.argv[1:] if argv is None else argv, project="os_ken")
    services = manager.instantiate_apps(**manager.create_contexts())
    try:
        hub.joinall(services)
    finally:
        manager.close()
        for service in services:
            service.kill()
        hub.joinall(services)


if __name__ == "__main__":
    main()
