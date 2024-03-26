This project aims to provide a web-based tool for visualizing and exploring Merc area files (.are) used in Merc-based MUDs (Multi-User Dungeons).

Table of Contents

    Introduction
    Technologies Used
    Usage
    Area File Format

Introduction

Merc area files (.are) define the world of a Merc-based MUD, including mobiles, objects, rooms, resets, shops, and special procedures. This visualizer allows you to easily view and navigate through the contents of .are files, providing a user-friendly interface to explore and understand the structure and elements of a Merc MUD world.
Features

    View and navigate through Merc area files (.are)
    Display detailed information about mobiles, objects, rooms, resets, shops, and special procedures
    Intuitive and user-friendly interface
    Cross-platform compatibility (web-based)
Technologies Used

    Node.js
    React
    Django
    HTML/CSS
Usage

    Upload or select a Merc area file (.are) using the provided interface.
    Navigate through the different sections of the area file, such as mobiles, objects, rooms, resets, shops, and special procedures.
    Click on individual elements to view their detailed information and properties.
    Use the search and filtering options to quickly find specific elements within the area file.
Area File Format

Merc area files (.are) follow a specific format that defines the various elements of a MUD world. The visualizer supports the standard Merc area file format, which includes the following sections:

    #AREA: Defines the area name and level range.
    #HELPS: Contains help texts for the area.
    #MOBILES: Defines the mobiles (NPCs) in the area.
    #OBJECTS: Defines the objects in the area.
    #ROOMS: Defines the rooms in the area.
    #RESETS: Specifies the reset behavior for the area.
    #SHOPS: Defines shopkeepers and their inventories.
    #SPECIALS: Assigns special procedures to mobiles.
    #$: Marks the end of the area file.
