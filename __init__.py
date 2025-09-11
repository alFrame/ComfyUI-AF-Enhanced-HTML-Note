# AF - Enhanced HTML-Note Node for ComfyUI
# File: __init__.py

import os
from .AF_Enhanced_HTML_Note import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS

# Tell ComfyUI about our web files
WEB_DIRECTORY = "./web"

__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS', 'WEB_DIRECTORY']