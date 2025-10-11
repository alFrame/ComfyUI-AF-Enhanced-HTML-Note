"""
@author: Alex Furer
@title: AF - Enhanced HTML Note
@nickname: AF - Enhanced HTML Note
@description: A ComfyUI custom node that allows you to create a note node with HTML support.
"""

import os
from .AF_Enhanced_HTML_Note import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS

__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS', 'WEB_DIRECTORY']

# Tell ComfyUI about our web files
WEB_DIRECTORY = "./web"

__version__ = "0.0.06"
__author__ = "Alex Furer"
__title__ = "AF - Enhanced HTML Note"
__description__ = " ComfyUI custom node that allows you to create a note node with HTML support."
__license__ = "MIT"
__changelog__ = [
    "v0.0.06 - Removed all Java Script functionality for links and updated README",
    "v0.0.05 - Made edit mode less intrusive and keep ComfyUI canvas navigation (panning, zooming [space bar] and [H] now work to pan around the canvas)",
    "v0.0.04 - Fixed node selection and resizing by removing OUTPUT_NODE and using proper widget approach. Double clicking is now used to edit the html Mouse interaction is now persistent to ComfyUI behavior. Except middle mouse button for panning.",
    "v0.0.03 - Fixed node resizing issues on save/reload. Improved selection and edit mode behavior to match ComfyUI core notes. Fixed middle mouse button panning over the node. Improved HTML indentation in default content",
    "v0.0.02 - Fixed naming consistency to HTML_Note Implemented single-window toggle behavior",
    "v0.0.01 - Initial Version"
]

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