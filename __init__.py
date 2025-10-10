# AF - Enhanced HTML-Note Node for ComfyUI
# File: __init__.py

import os
from .AF_Enhanced_HTML_Note import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS

# Tell ComfyUI about our web files
WEB_DIRECTORY = "./web"

__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS', 'WEB_DIRECTORY']
__version__ = "0.0.05"
__author__ = "Alex Furer"

print("*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *")
print(r"""
   ___   ____        _____           ___     __  ______  _  __       __      
  / _ | / __/ ____  / ___/__  __ _  / _/_ __/ / / /  _/ / |/ /__ ___/ /__ ___
 / __ |/ _/  /___/ / /__/ _ \/  ' \/ _/ // / /_/ // /  /    / _ Y _  / -_|_-<
/_/ |_/_/          \___/\___/_/_/_/_/ \_, /\____/___/ /_/|_/\___|_,_/\__/___/
                                     /___/
                                     
              📋 AF - Enhanced HTML Note Loaded !
                 
""")
print("*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *")